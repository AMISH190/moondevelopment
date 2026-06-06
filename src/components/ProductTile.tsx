type Props = {
  eyebrow: string;
  title: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  image: string;
  imageAlt: string;
  align?: "left" | "center";
  theme?: "purple" | "blue";
};

export function ProductTile({
  eyebrow,
  title,
  tagline,
  ctaPrimary,
  ctaSecondary,
  image,
  imageAlt,
  align = "center",
  theme = "purple",
}: Props) {
  const accent = theme === "purple" ? "text-[oklch(0.78_0.18_300)]" : "text-[oklch(0.78_0.15_240)]";
  return (
    <article className="relative overflow-hidden rounded-3xl bg-card min-h-[560px] flex flex-col">
      <div className={`relative z-10 pt-14 px-8 ${align === "center" ? "text-center" : "text-left"}`}>
        <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${accent}`}>{eyebrow}</p>
        <h3 className="text-4xl md:text-5xl font-semibold mb-3">{title}</h3>
        <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">{tagline}</p>
        <div className={`mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm ${align === "center" ? "justify-center" : ""}`}>
          <a href="#" className="text-primary hover:underline">{ctaPrimary} ›</a>
          {ctaSecondary && <a href="#" className="text-primary hover:underline">{ctaSecondary} ›</a>}
        </div>
      </div>
      <div className="mt-auto relative">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width={1280}
          height={800}
          className="w-full h-auto object-cover"
        />
      </div>
    </article>
  );
}
