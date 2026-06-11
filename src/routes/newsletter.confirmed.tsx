import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/newsletter/confirmed")({
  head: () => ({
    meta: [
      { title: "Subscription confirmed — Moon Development" },
      { name: "description", content: "You're subscribed to the Moon Development newsletter." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmedPage,
});

function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SiteNav />
      <section className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">Newsletter</p>
        <h1 className="font-display font-semibold text-5xl md:text-6xl mb-5">You're in 🌙</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Your subscription is confirmed. Watch your inbox — we just sent a welcome email.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
        >
          ← Back home
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
