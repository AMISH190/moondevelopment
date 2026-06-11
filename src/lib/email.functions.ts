import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  CONTACT_TEMPLATES,
  EMAIL_CONFIG,
  fillTemplate,
} from "./email-templates";
import { checkHoneypotAndTimer, checkRateLimit } from "./spam-protection";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
  // Spam guards
  website: z.string().max(255).optional(), // honeypot
  renderedAt: z.number().optional(),
});

type ResendPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
};

async function sendViaResend(payload: ResendPayload) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Resend send failed (${res.status}): ${JSON.stringify(body)}`);
  }
  return body as { id?: string };
}

export async function sendEmail(payload: ResendPayload) {
  return sendViaResend(payload);
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Honeypot + time-trap
    const spam = checkHoneypotAndTimer({
      honeypot: data.website ?? null,
      renderedAt: data.renderedAt ?? null,
    });
    if (spam.isSpam) {
      // Silent success: bots get no signal.
      return { ok: true as const, id: null };
    }

    // 2. Rate limit per IP
    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const userAgent = getRequestHeader("user-agent") ?? "unknown";
    const referer = getRequestHeader("referer") ?? "direct";

    const rl = await checkRateLimit(`contact:${ip}`, 5, 600);
    if (!rl.allowed) {
      throw new Error(
        `Too many messages from your network. Please try again in ${Math.ceil(rl.retryAfterSec / 60)} min.`,
      );
    }

    // 3. Admin notification
    const from = `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromAddress}>`;
    const timestamp = new Date().toISOString();

    const adminSubject = fillTemplate(CONTACT_TEMPLATES.adminSubject, {
      subject: data.subject,
      name: data.name,
    });

    const result = await sendViaResend({
      from,
      to: CONTACT_TEMPLATES.adminTo,
      reply_to: data.email,
      subject: adminSubject,
      html: CONTACT_TEMPLATES.adminHtml({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        ip,
        userAgent,
        referer,
        timestamp,
      }),
    });

    // 4. Optional auto-reply to visitor
    if (CONTACT_TEMPLATES.autoReplyEnabled) {
      const autoSubject = fillTemplate(CONTACT_TEMPLATES.autoReplySubject, {
        name: data.name,
        subject: data.subject,
      });
      try {
        await sendViaResend({
          from,
          to: [data.email],
          subject: autoSubject,
          html: CONTACT_TEMPLATES.autoReplyHtml({
            name: data.name,
            subject: data.subject,
            message: data.message,
          }),
        });
      } catch (err) {
        // Don't fail the whole submission if the auto-reply bounces.
        console.error("auto-reply failed", err);
      }
    }

    return { ok: true as const, id: result.id ?? null };
  });
