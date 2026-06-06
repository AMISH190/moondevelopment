type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="px-6 pt-32 pb-12 max-w-5xl mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{eyebrow}</p>
      <h1 className="font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05]">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </section>
  );
}
