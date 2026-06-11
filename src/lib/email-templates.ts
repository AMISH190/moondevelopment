// Centralized, per-project configurable email templates.
// Edit anything here to change subject lines, sender names, or body HTML.
// All emails go through Resend via the connector gateway.

export const EMAIL_CONFIG = {
  fromName: "Moon Development",
  // Use a verified domain once you set one up in Resend, e.g. "hello@moondev.com"
  fromAddress: "onboarding@resend.dev",
  // Base URL for confirm/unsubscribe links. Falls back to env at runtime.
  // Server code reads APP_URL / VITE_APP_URL with a sensible default.
  defaultBaseUrl: "https://moondevelopment.lovable.app",
};

export const CONTACT_TEMPLATES = {
  adminTo: ["moonxdevs@gmail.com"],
  // {{subject}} placeholder
  adminSubject: "[Contact] {{subject}}",
  adminHtml: (v: {
    name: string;
    email: string;
    subject: string;
    message: string;
    ip: string;
    userAgent: string;
    referer: string;
    timestamp: string;
  }) => `
    <h2 style="font-family:system-ui">New contact message</h2>
    <p><strong>From:</strong> ${esc(v.name)} &lt;${esc(v.email)}&gt;</p>
    <p><strong>Subject:</strong> ${esc(v.subject)}</p>
    <p style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px">${esc(v.message)}</p>
    <hr/>
    <p style="font-size:12px;color:#666">
      <strong>Debug</strong><br/>
      Time: ${esc(v.timestamp)}<br/>
      IP: ${esc(v.ip)}<br/>
      User-Agent: ${esc(v.userAgent)}<br/>
      Referer: ${esc(v.referer)}
    </p>
  `,

  autoReplyEnabled: true,
  autoReplySubject: "We got your message, {{name}}",
  autoReplyHtml: (v: { name: string; subject: string; message: string }) => `
    <h2 style="font-family:system-ui">Thanks for reaching out, ${esc(v.name)}!</h2>
    <p>We received your message and will get back to you as soon as we can.</p>
    <p><strong>Your message:</strong></p>
    <p style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px;color:#555">${esc(v.message)}</p>
    <p style="color:#888;font-size:12px">— Moon Development</p>
  `,
};

export const NEWSLETTER_TEMPLATES = {
  confirmSubject: "Confirm your subscription to Moon Development",
  confirmHtml: (v: { confirmUrl: string }) => `
    <h2 style="font-family:system-ui">One more step</h2>
    <p>Click the button below to confirm your subscription to the Moon Development newsletter.</p>
    <p>
      <a href="${esc(v.confirmUrl)}" style="display:inline-block;background:#000;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-family:system-ui">
        Confirm subscription
      </a>
    </p>
    <p style="font-size:12px;color:#888">If you didn't sign up, you can ignore this email.</p>
  `,

  welcomeSubject: "Welcome to Moon Development",
  welcomeHtml: (v: { unsubscribeUrl: string }) => `
    <h2 style="font-family:system-ui">You're in 🌙</h2>
    <p>Thanks for joining the Moon Development newsletter — we'll send the occasional update on new releases, bots, and projects.</p>
    <p style="font-size:12px;color:#888">Not interested anymore? <a href="${esc(v.unsubscribeUrl)}">Unsubscribe</a>.</p>
  `,

  unsubscribeFooter: (unsubscribeUrl: string) => `
    <hr/>
    <p style="font-size:12px;color:#888">Don't want these emails? <a href="${esc(unsubscribeUrl)}">Unsubscribe</a>.</p>
  `,
};

export function fillTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
