import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import moonBanner from "@/assets/moonbanner.png.asset.json";
import amixh from "@/assets/amixh.png.asset.json";
import zack from "@/assets/zack.png.asset.json";
import snik from "@/assets/snik.png.asset.json";
import latency from "@/assets/latency.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Moon Development" },
      { name: "description", content: "Moon Development is a small team of friends building Discord bots, game clients, and AI tools." },
      { property: "og:title", content: "About Moon Development" },
      { property: "og:description", content: "Our team, our roles, and our mission." },
      { property: "og:image", content: moonBanner.url },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Amixhh", role: "Founder · Web Dev", body: "Founder of Moon Development. Builds the web, ships the products, and keeps the lights on.", avatar: amixh.url },
  { name: "Zack", role: "Co-founder · Discord Bots", body: "Co-founder. Lives in Discord bot land — commands, systems, and integrations.", avatar: zack.url },
  { name: "snik.dev", role: "Developer · Full-stack", body: "Generalist developer — web, bots, whatever the project needs.", avatar: snik.url },
  { name: "Latency", role: "AI Tooling", body: "Owns the AI side of Moon — models, agents, and the tooling that wires them into our products.", avatar: latency.url },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SiteNav />
      <PageHeader
        eyebrow="About"
        title="A small team. Big ideas. Built in public."
      />

      <section className="max-w-6xl mx-auto px-6">
        <img src={moonBanner.url} alt="Moon Development banner" className="w-full rounded-3xl" />
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Mission</p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-5">
          Make great software for the communities we're part of.
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Moon Development is two friends shipping the tools we wished existed.
          Free, polished, honest. We talk to the people who use what we build,
          and we ship the things they ask for. No investors, no roadmap politics —
          just craft.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">The team</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {team.map((m) => (
            <div key={m.name} className="rounded-3xl bg-card p-8 border border-white/5 flex items-center gap-5">
              <img src={m.avatar} alt={m.name} className="h-20 w-20 rounded-2xl object-cover shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-primary mb-1">{m.role}</p>
                <h3 className="text-2xl font-semibold mb-1">{m.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">What we do</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { tag: "Web", body: "Marketing sites, dashboards, full-stack apps." },
            { tag: "Bots", body: "Discord bots from music to moderation." },
            { tag: "AI", body: "LLM apps, agents, and integrations." },
          ].map((s) => (
            <div key={s.tag} className="rounded-3xl bg-card p-7 border border-white/5">
              <p className="text-xs uppercase tracking-wider text-primary mb-2">{s.tag}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
