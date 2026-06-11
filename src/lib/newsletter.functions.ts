import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  EMAIL_CONFIG,
  NEWSLETTER_TEMPLATES,
} from "./email-templates";
import { checkHoneypotAndTimer, checkRateLimit } from "./spam-protection";
import { sendEmail } from "./email.functions";

const schema = z.object({
  email: z.string().trim().email().max(255),
  website: z.string().max(255).optional(), // honeypot
  renderedAt: z.number().optional(),
});

function baseUrl() {
  return (
    process.env.APP_URL ||
    process.env.VITE_APP_URL ||
    EMAIL_CONFIG.defaultBaseUrl
  );
}

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const spam = checkHoneypotAndTimer({
      honeypot: data.website ?? null,
      renderedAt: data.renderedAt ?? null,
    });
    if (spam.isSpam) return { ok: true as const };

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const userAgent = getRequestHeader("user-agent") ?? "unknown";

    const rl = await checkRateLimit(`newsletter:${ip}`, 3, 3600);
    if (!rl.allowed) {
      throw new Error(
        `Too many signups from your network. Please try again in ${Math.ceil(rl.retryAfterSec / 60)} min.`,
      );
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Upsert pending subscriber; reuse existing tokens if record exists.
    const { data: existing } = await supabaseAdmin
      .from("newsletter_subscribers" as never)
      .select("id,status,confirm_token,unsubscribe_token")
      .eq("email", data.email)
      .maybeSingle<{
        id: string;
        status: string;
        confirm_token: string;
        unsubscribe_token: string;
      }>();

    let confirmToken: string;
    let unsubscribeToken: string;

    if (existing) {
      if (existing.status === "confirmed") {
        return { ok: true as const, alreadyConfirmed: true };
      }
      confirmToken = existing.confirm_token;
      unsubscribeToken = existing.unsubscribe_token;
      // Reset to pending in case they previously unsubscribed
      await supabaseAdmin
        .from("newsletter_subscribers" as never)
        .update({ status: "pending", ip, user_agent: userAgent })
        .eq("id", existing.id);
    } else {
      const { data: inserted, error } = await supabaseAdmin
        .from("newsletter_subscribers" as never)
        .insert({ email: data.email, ip, user_agent: userAgent })
        .select("confirm_token,unsubscribe_token")
        .single<{ confirm_token: string; unsubscribe_token: string }>();
      if (error || !inserted) {
        throw new Error("Could not save subscription. Please try again.");
      }
      confirmToken = inserted.confirm_token;
      unsubscribeToken = inserted.unsubscribe_token;
    }

    const confirmUrl = `${baseUrl()}/api/public/newsletter/confirm?token=${confirmToken}`;
    const unsubscribeUrl = `${baseUrl()}/api/public/newsletter/unsubscribe?token=${unsubscribeToken}`;

    await sendEmail({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromAddress}>`,
      to: [data.email],
      subject: NEWSLETTER_TEMPLATES.confirmSubject,
      html:
        NEWSLETTER_TEMPLATES.confirmHtml({ confirmUrl }) +
        NEWSLETTER_TEMPLATES.unsubscribeFooter(unsubscribeUrl),
    });

    return { ok: true as const };
  });
