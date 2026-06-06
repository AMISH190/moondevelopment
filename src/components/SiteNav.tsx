import { Link } from "@tanstack/react-router";

const links = [
  { label: "Discover", href: "/#discover" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Community", href: "/#community" },
];

export function SiteNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-nav border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between text-[13px] text-nav-foreground">
        <Link to="/" className="font-display font-semibold tracking-tight text-base">
          ◉ kuro<span className="text-primary">.dev</span>
        </Link>
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="opacity-80 hover:opacity-100 transition-opacity">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#community"
          className="rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-medium hover:bg-white/90 transition"
        >
          Join Discord
        </a>
      </nav>
    </header>
  );
}
