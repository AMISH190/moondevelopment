import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import moonHero from "@/assets/moon-hero.jpg";

export const Route = createFileRoute("/moon-client")({
  head: () => ({
    meta: [
      { title: "Moon Client — Minecraft Launcher | Moon Development" },
      { name: "description", content: "Moon Client is a fast, modern Minecraft launcher with smart mod profiles and a UI that gets out of your way." },
      { property: "og:title", content: "Moon Client — Minecraft Launcher" },
      { property: "og:description", content: "Fast launches, smart mod profiles, no clutter." },
    ],
  }),
  component: MoonPage,
});

const features = [
  { title: "Instant launches", body: "Cold start to in-world in under 6 seconds on most hardware." },
  { title: "Profile manager", body: "Switch versions, mod loaders, and resource packs in one click." },
  { title: "Modrinth built-in", body: "Browse and install mods without leaving the launcher." },
  { title: "Auto updates", body: "Java, Forge, Fabric — Moon keeps everything current automatically." },
  { title: "Skin & cape", body: "Edit your skin, preview in 3D, and apply without alt-tabbing." },
  { title: "Privacy-first", body: "No telemetry, no accounts beyond Microsoft auth." },
];

function MoonPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SiteNav />
      <PageHeader
        eyebrow="Moon Client"
        title="A Minecraft launcher that feels like home."
        description="Built because every other launcher annoyed us. Lightweight, focused, beautiful."
      />
      <section className="max-w-6xl mx-auto px-6">
        <img src={moonHero} alt="Moon Client launcher" className="w-full rounded-3xl" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap gap-3 justify-center">
        <a href="#" className="rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition">
          Download for Windows
        </a>
        <a href="#" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition">
          Download for macOS
        </a>
        <Link to="/blog" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition">
          Changelog
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">Features</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-3xl bg-card p-7 border border-white/5">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Setup</h2>
        <ol className="space-y-4 text-muted-foreground max-w-2xl">
          <li><span className="text-foreground font-medium">1.</span> Download the installer for your platform above.</li>
          <li><span className="text-foreground font-medium">2.</span> Sign in with your Microsoft account.</li>
          <li><span className="text-foreground font-medium">3.</span> Create a profile, pick a version, hit Play.</li>
        </ol>
      </section>

      <SiteFooter />
    </div>
  );
}
