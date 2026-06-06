import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <p className="font-display font-semibold mb-2">Moon Development</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Discord bots, game clients, websites and AI tools — built by friends.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Projects</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/nami" className="hover:text-foreground">Nami Music Bot</Link></li>
            <li><Link to="/moon-client" className="hover:text-foreground">Moon Client</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Resources</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/docs" className="hover:text-foreground">Documentation</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog & Changelog</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Get in touch</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground">Contact form</Link></li>
            <li><a href="mailto:support@moondev.app" className="hover:text-foreground">support@moondev.app</a></li>
            <li><a href="https://discord.gg/" target="_blank" rel="noreferrer" className="hover:text-foreground">Discord server</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Moon Development. Built with caffeine and curiosity.
        </p>
      </div>
    </footer>
  );
}
