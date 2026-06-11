import { createFileRoute } from "@tanstack/react-router";
import {
  EMAIL_CONFIG,
  NEWSLETTER_TEMPLATES,
} from "@/lib/email-templates";
import { sendEmail } from "@/lib/email.functions";

export const Route = createFileRoute("/api/public/newsletter/confirm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        if (!token || !/^[0-9a-f-]{36}$/i.test(token)) {
          return new Response("Invalid token", { status: 400 });
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db = supabaseAdmin as any;

        const { data: sub } = await db
          .from("newsletter_subscribers")
          .select("id,email,status,unsubscribe_token")
          .eq("confirm_token", token)
          .maybeSingle();

        if (!sub) return new Response("Token not found", { status: 404 });

        if (sub.status !== "confirmed") {
          await db
            .from("newsletter_subscribers")
            .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
            .eq("id", sub.id);

          const baseUrl =
            process.env.APP_URL ||
            process.env.VITE_APP_URL ||
            EMAIL_CONFIG.defaultBaseUrl;
          const unsubscribeUrl = `${baseUrl}/api/public/newsletter/unsubscribe?token=${sub.unsubscribe_token}`;

          try {
            await sendEmail({
              from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromAddress}>`,
              to: [sub.email],
              subject: NEWSLETTER_TEMPLATES.welcomeSubject,
              html:
                NEWSLETTER_TEMPLATES.welcomeHtml({ unsubscribeUrl }) +
                NEWSLETTER_TEMPLATES.unsubscribeFooter(unsubscribeUrl),
            });
          } catch (err) {
            console.error("welcome email failed", err);
          }
        }

        return new Response(null, {
          status: 302,
          headers: { Location: "/newsletter/confirmed" },
        });
      },
    },
  },
});
