import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Moon Development" },
      { name: "description", content: "Get in touch with Moon Development — support, project inquiries, or just to say hi." },
      { property: "og:title", content: "Contact Moon Development" },
      { property: "og:description", content: "Support, inquiries, or just to say hi." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Required").max(150),
  message: z.string().trim().min(1, "Required").max(2000),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    // Open mail client as a no-backend fallback
    const { name, email, subject, message } = parsed.data;
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:support@moondev.app?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus("sent");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PageHeader
        eyebrow="Contact"
        title="Say hi."
        description="Bug reports, project inquiries, feature ideas — we read everything."
      />

      <section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-5">
        {[
          { label: "Support", value: "support@moondev.app", href: "mailto:support@moondev.app" },
          { label: "Business", value: "hello@moondev.app", href: "mailto:hello@moondev.app" },
          { label: "Discord", value: "Join the server", href: "https://discord.gg/" },
        ].map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            className="rounded-3xl bg-card p-6 border border-white/5 hover:border-white/15 transition block">
            <p className="text-xs uppercase tracking-wider text-primary mb-2">{c.label}</p>
            <p className="font-medium">{c.value}</p>
          </a>
        ))}
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24">
        <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-white/5 p-8 space-y-5">
          {(["name", "email", "subject"] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 capitalize">{field}</label>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                maxLength={field === "message" ? 2000 : field === "email" ? 255 : field === "subject" ? 150 : 100}
                className="w-full rounded-xl bg-background border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
              {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</label>
            <textarea
              name="message"
              rows={6}
              maxLength={2000}
              className="w-full rounded-xl bg-background border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
            />
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>
          <button type="submit"
            className="w-full rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition">
            Send message
          </button>
          {status === "sent" && (
            <p className="text-center text-sm text-muted-foreground">Your email client should open now. Thanks!</p>
          )}
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
