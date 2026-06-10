import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — Moon Development" },
      { name: "description", content: "Guides for Nami music bot, Moon Client launcher, plus FAQs." },
      { property: "og:title", content: "Moon Development Docs" },
      { property: "og:description", content: "Setup guides, commands, and FAQs." },
    ],
  }),
  component: DocsPage,
});

const guides = [
  {
    project: "Nami",
    items: [
      { title: "Inviting Nami", body: "Click Invite, pick a server you manage, and grant the requested permissions." },
      { title: "Playing music", body: "Join a voice channel, then run /play <song or link>. Nami will join and start playing." },
      { title: "Managing the queue", body: "/queue shows the current list. Use /skip, /loop, /shuffle, or the inline buttons." },
      { title: "Permissions & roles", body: "By default everyone can play. Set a DJ role with /settings dj @role to restrict skips." },
    ],
  },
  {
    project: "Moon Client",
    items: [
      { title: "Installing the launcher", body: "Download the installer, run it, and sign in with your Microsoft account." },
      { title: "Creating a profile", body: "Click New Profile, pick a Minecraft version and mod loader (Vanilla, Fabric, Forge)." },
      { title: "Installing mods", body: "Open the Mods tab on a profile, browse Modrinth, click Install. Restart the profile." },
      { title: "Troubleshooting crashes", body: "Open Profile → Logs. Share the latest log in our Discord #support channel." },
    ],
  },
];

const faqs = [
  { q: "Is everything really free?", a: "Yes. We don't sell anything. Hosting is covered by us and a few generous Discord boosters." },
  { q: "Can I self-host Nami?", a: "Not currently — the source is private while we stabilize, but it's on the roadmap." },
  { q: "Is Moon Client safe?", a: "Yes. It only talks to Mojang/Microsoft auth and Modrinth. No telemetry, no third-party tracking." },
  { q: "How do I report a bug?", a: "Use the contact form, email support@moondev.app, or ping us in #support on Discord." },
  { q: "Do you take feature requests?", a: "Always. The best place is the #ideas channel in our Discord." },
];

function DocsPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SiteNav />
      <PageHeader
        eyebrow="Documentation"
        title="Guides, commands, and answers."
        description="Everything you need to get the most out of Nami and Moon Client."
      />

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        {guides.map((g) => (
          <div key={g.project}>
            <h2 className="text-3xl font-semibold mb-6">{g.project}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {g.items.map((i) => (
                <div key={i.title} className="rounded-2xl bg-card p-6 border border-white/5">
                  <h3 className="font-semibold mb-2">{i.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl bg-card border border-white/5 p-5 group">
              <summary className="cursor-pointer font-medium flex justify-between items-center list-none">
                {f.q}
                <span className="text-muted-foreground group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Still stuck? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
