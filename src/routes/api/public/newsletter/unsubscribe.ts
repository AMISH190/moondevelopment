import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/newsletter/unsubscribe")({
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

        const { data: sub } = await supabaseAdmin
          .from("newsletter_subscribers" as never)
          .select("id")
          .eq("unsubscribe_token", token)
          .maybeSingle<{ id: string }>();

        if (!sub) return new Response("Token not found", { status: 404 });

        await supabaseAdmin
          .from("newsletter_subscribers" as never)
          .update({
            status: "unsubscribed",
            unsubscribed_at: new Date().toISOString(),
          })
          .eq("id", sub.id);

        return new Response(
          `<!doctype html><html><body style="font-family:system-ui;padding:48px;text-align:center;background:#0a0a0a;color:#fff">
            <h1>You've been unsubscribed</h1>
            <p style="color:#aaa">Sorry to see you go. You won't receive any more newsletter emails from Moon Development.</p>
            <p><a href="/" style="color:#9af">Back to the site</a></p>
          </body></html>`,
          { status: 200, headers: { "Content-Type": "text/html" } },
        );
      },
    },
  },
});
