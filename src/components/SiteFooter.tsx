export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Moon Development. Built with caffeine and curiosity.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Discord</a>
          <a href="#" className="hover:text-foreground">GitHub</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
