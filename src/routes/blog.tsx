import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Changelog — Moon Development" },
      { name: "description", content: "Updates, changelogs, and AI experiments from Moon Development." },
      { property: "og:title", content: "Moon Development Blog" },
      { property: "og:description", content: "Updates, changelogs, and AI experiments." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    tag: "Changelog",
    date: "June 2026",
    title: "Nami 2.4 — Spotify playlists, smarter queue",
    excerpt: "Full Spotify playlist import, queue persistence across restarts, and 30% lower memory usage.",
  },
  {
    tag: "Changelog",
    date: "May 2026",
    title: "Moon Client 1.8 — Modrinth in the sidebar",
    excerpt: "Browse and install mods without leaving the launcher. Plus faster cold starts.",
  },
  {
    tag: "AI Experiment",
    date: "April 2026",
    title: "We built a Discord agent that remembers your server",
    excerpt: "A small RAG project that gives Discord bots long-term context per guild. Lessons learned.",
  },
  {
    tag: "News",
    date: "March 2026",
    title: "Hello, world.",
    excerpt: "Moon Development is now an actual brand, not just a Discord call. Here's what's next.",
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PageHeader
        eyebrow="Blog & Changelog"
        title="Updates, releases, and experiments."
        description="What we're shipping and what we're playing with."
      />

      <section className="max-w-4xl mx-auto px-6 py-10 space-y-4">
        {posts.map((p) => (
          <article key={p.title} className="rounded-3xl bg-card p-7 border border-white/5 hover:border-white/15 transition">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="text-primary uppercase tracking-wider">{p.tag}</span>
              <span>·</span>
              <span>{p.date}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">{p.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.excerpt}</p>
          </article>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
