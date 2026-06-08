import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductTile } from "@/components/ProductTile";
import namiHero from "@/assets/nami-hero.jpg";
import moonHero from "@/assets/moon-hero.jpg";
import mainHero from "@/assets/main-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moon Development — Building Discord bots, launchers & AI" },
      { name: "description", content: "A small collective of developers shipping Nami, Moon Client, and bespoke web, bot, and AI projects." },
      { property: "og:title", content: "Moon Development — Developer Collective" },
      { property: "og:description", content: "Nami music bot. Moon Client launcher. Web, bots, and AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative pt-12 overflow-hidden">
        <div className="relative px-6 pt-24 pb-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">Moon Development</p>
          <h1 className="font-display font-semibold tracking-tight text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl mx-auto">
            Built by friends.
            <br />
            <span className="bg-gradient-to-r from-[oklch(0.75_0.2_265)] via-[oklch(0.7_0.22_295)] to-[oklch(0.78_0.15_240)] bg-clip-text text-transparent">
              Designed for everyone.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We're a duo making Discord bots, game clients, websites, and AI tools.
            Two friends. One server. A growing library of projects.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm">
            <a href="#projects" className="rounded-full bg-white text-black px-5 py-2.5 font-medium hover:bg-white/90 transition">
              Explore projects
            </a>
            <a href="#community" className="rounded-full border border-white/20 px-5 py-2.5 font-medium hover:bg-white/5 transition">
              Join our Discord ›
            </a>
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <img
            src={mainHero}
            alt="Abstract gradient backdrop"
            width={1920}
            height={1080}
            className="w-full rounded-3xl"
          />
        </div>
      </section>

      {/* DISCOVER STRIP */}
      <section id="discover" className="px-6 pt-24 pb-6 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Discover</p>
        <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl">
          The tools we ship — crafted with care, free to use, made for our community.
        </h2>
      </section>

      {/* PRODUCTS */}
      <section id="projects" className="px-6 py-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
        <ProductTile
          eyebrow="Nami"
          title="Music, your server, perfectly in tune."
          tagline="A Discord music bot with crystal-clear audio, queue magic, and zero fuss."
          ctaPrimary="Invite Nami"
          ctaSecondary="Read the docs"
          image={namiHero}
          imageAlt="Nami music bot waveform"
          theme="purple"
        />
        <ProductTile
          eyebrow="Moon Client"
          title="A Minecraft launcher that feels like home."
          tagline="Fast launches, smart mod profiles, and a UI that disappears so you can play."
          ctaPrimary="Download"
          ctaSecondary="Changelog"
          image={moonHero}
          imageAlt="Moon Client launcher"
          theme="blue"
        />
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-24 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">What we do</p>
        <h2 className="text-4xl md:text-5xl font-semibold max-w-3xl mb-12">
          Three crafts. One small team.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              tag: "Web",
              title: "Web Development",
              body: "Marketing sites, dashboards, full-stack apps — modern stacks, sharp design.",
            },
            {
              tag: "Bots",
              title: "Discord Bots",
              body: "From music to moderation, custom commands to full server systems.",
            },
            {
              tag: "AI",
              title: "AI Tooling",
              body: "LLM apps, agents, and integrations that solve real workflow problems.",
            },
          ].map((s) => (
            <div key={s.tag} className="rounded-3xl bg-card p-8 border border-white/5 hover:border-white/15 transition">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">{s.tag}</p>
              <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="px-6 py-16 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.18_0.04_265)] to-[oklch(0.1_0.02_260)] p-10 md:p-16 border border-white/10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">The team</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 max-w-2xl">
            A small crew who like building things.
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            We started in a Discord call and never really left. Everything here is built
            in our spare time, shared with the community, and shaped by feedback from
            people we actually talk to.
          </p>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="px-6 py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Come hang out.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          Get early access, request features, report bugs, or just vibe.
          Our Discord is where everything happens.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
        >
          Join the Discord →
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
