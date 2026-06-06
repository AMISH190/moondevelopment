import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import namiHero from "@/assets/nami-hero.jpg";

export const Route = createFileRoute("/nami")({
  head: () => ({
    meta: [
      { title: "Nami — Discord Music Bot | Moon Development" },
      { name: "description", content: "Nami is a Discord music bot with crystal-clear audio, smart queues, and zero fuss. Free to invite." },
      { property: "og:title", content: "Nami — Discord Music Bot" },
      { property: "og:description", content: "Crystal-clear audio, smart queues, zero fuss." },
    ],
  }),
  component: NamiPage,
});

const features = [
  { title: "Hi-fi audio", body: "Opus 96kbps streaming with no transcoding artifacts. Sounds the way it should." },
  { title: "Smart queues", body: "Loop, shuffle, jump, save — every queue action you actually use, none you don't." },
  { title: "Multi-source", body: "YouTube, Spotify, SoundCloud, direct links — paste anything and it just plays." },
  { title: "Slash commands", body: "Modern Discord-native UI. Autocomplete, ephemeral messages, buttons." },
  { title: "24/7 mode", body: "Optional always-on voice presence for community lounges and study rooms." },
  { title: "Free forever", body: "No paywalls, no premium tier. Built for our friends and yours." },
];

function NamiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PageHeader
        eyebrow="Nami"
        title="Music, your server, perfectly in tune."
        description="A Discord music bot we built for our own server, then opened up to everyone."
      />
      <section className="max-w-6xl mx-auto px-6">
        <img src={namiHero} alt="Nami music bot" className="w-full rounded-3xl" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap gap-3 justify-center">
        <a href="https://discord.com/oauth2/authorize" target="_blank" rel="noreferrer"
          className="rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition">
          Invite Nami to your server
        </a>
        <Link to="/docs"
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition">
          Read the docs
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
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Quick start</h2>
        <ol className="space-y-4 text-muted-foreground max-w-2xl">
          <li><span className="text-foreground font-medium">1.</span> Click "Invite Nami" and pick your server.</li>
          <li><span className="text-foreground font-medium">2.</span> Run <code className="px-2 py-0.5 rounded bg-card text-foreground">/play</code> followed by a song name or link.</li>
          <li><span className="text-foreground font-medium">3.</span> Use the inline buttons to skip, pause, loop, or save the track.</li>
        </ol>
      </section>

      <SiteFooter />
    </div>
  );
}
