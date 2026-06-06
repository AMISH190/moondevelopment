import { Link } from "@tanstack/react-router";
import moonLogo from "@/assets/moonlogo.png.asset.json";

const links = [
  { label: "Nami", to: "/nami" as const },
  { label: "Moon Client", to: "/moon-client" as const },
  { label: "Docs", to: "/docs" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-nav border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between text-[13px] text-nav-foreground">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold tracking-tight text-base">
          <img src={moonLogo.url} alt="Moon Development" className="h-6 w-6 rounded-md" />
          <span>Moon<span className="text-primary"> Development</span></span>
        </Link>
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="opacity-80 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="https://discord.gg/GzG7dH6tns"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-medium hover:bg-white/90 transition"
        >
          Join Discord
        </a>
      </nav>
    </header>
  );
}
