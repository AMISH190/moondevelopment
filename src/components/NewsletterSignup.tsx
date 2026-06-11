import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { subscribeNewsletter } from "@/lib/newsletter.functions";

const schema = z.object({ email: z.string().trim().email().max(255) });

type Status = "idle" | "sending" | "sent" | "error";

export function NewsletterSignup({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const renderedAt = useRef<number>(Date.now());
  const subscribe = useServerFn(subscribeNewsletter);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({ email: fd.get("email") });
    if (!parsed.success) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      await subscribe({
        data: {
          email: parsed.data.email,
          website: (fd.get("website") as string) || "",
          renderedAt: renderedAt.current,
        },
      });
      setStatus("sent");
      setMessage("Check your inbox to confirm your subscription.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const wrapperClass =
    variant === "card"
      ? "rounded-3xl bg-card border border-white/5 p-8"
      : "";

  return (
    <div className={wrapperClass}>
      {variant === "card" && (
        <>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Newsletter</p>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Stay in the loop.</h3>
          <p className="text-muted-foreground text-sm mb-5">
            Occasional updates on new bots, launches, and projects. No spam, unsubscribe anytime.
          </p>
        </>
      )}
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Honeypot — hidden from humans, harvested by bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            width: 1,
            height: 1,
            opacity: 0,
          }}
        />
        <input
          name="email"
          type="email"
          required
          maxLength={255}
          placeholder="you@example.com"
          className="flex-1 rounded-full bg-background border border-white/10 px-5 py-3 text-sm focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition disabled:opacity-60"
        >
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
