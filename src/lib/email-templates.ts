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

// ─── Shared email layout wrapper ───
function emailLayout(title: string, body: string, opts?: { footer?: string; preheader?: string }) {
  const gradient = "background: linear-gradient(135deg, #7c6bff 0%, #a855f7 50%, #6366f1 100%);";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <style>
    @media only screen and (max-width: 520px) {
      .container { width: 100% !important; padding: 24px 16px !important; }
      .card { border-radius: 20px !important; }
      .btn { width: 100% !important; display: block !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#05050a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;color:#e5e5e7;">
  ${opts?.preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(opts.preheader)}</div>` : ""}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" class="container" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;">
          <!-- Brand Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-block;width:40px;height:40px;border-radius:12px;${gradient}text-align:center;line-height:40px;font-size:20px;margin-bottom:12px;">🌙</div>
              <div style="font-size:14px;font-weight:600;letter-spacing:0.12em;color:#fff;text-transform:uppercase;">Moon Development</div>
            </td>
          </tr>
          <!-- Main Card -->
          <tr>
            <td class="card" style="background:#0f0f16;border:1px solid rgba(255,255,255,0.07);border-radius:24px;padding:40px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          ${opts?.footer ? `<tr><td style="padding-top:28px;text-align:center;font-size:12px;color:#6b6b7b;line-height:1.6;">${opts.footer}</td></tr>` : ""}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function pillBtn(label: string, href: string, primary = true) {
  const bg = primary
    ? "background: linear-gradient(135deg, #7c6bff 0%, #a855f7 50%, #6366f1 100%);"
    : "background: rgba(255,255,255,0.06);";
  const color = primary ? "color:#fff;" : "color:#b4b4c7;";
  return `<a href="${esc(href)}" class="btn" style="display:inline-block;${bg}${color}padding:14px 32px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:-0.01em;border:1px solid rgba(255,255,255,${primary ? "0.12" : "0.08"});transition:opacity 0.2s;">${esc(label)}</a>`;
}

// ─── Contact templates ───

export const CONTACT_TEMPLATES = {
  adminTo: ["moonxdevs@gmail.com"],
  adminSubject: "📨 New message: {{subject}}",
  adminHtml: (v: {
    name: string;
    email: string;
    subject: string;
    message: string;
    ip: string;
    userAgent: string;
    referer: string;
    timestamp: string;
  }) => emailLayout(
    "New contact message",
    `
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;">New Contact Submission</p>
      <h1 style="margin:0 0 24px;font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1.2;">${esc(v.subject)}</h1>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
        <tr><td style="padding:16px;background:rgba(255,255,255,0.03);border-radius:14px;border:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0 0 4px;font-size:12px;color:#8b8b9a;text-transform:uppercase;letter-spacing:0.08em;">From</p>
          <p style="margin:0;font-size:15px;font-weight:500;color:#fff;">${esc(v.name)} <span style="color:#6b6b7b;font-weight:400;">&lt;${esc(v.email)}&gt;</span></p>
        </td></tr>
      </table>

      <p style="margin:0 0 8px;font-size:12px;color:#8b8b9a;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <div style="padding:20px;background:rgba(255,255,255,0.03);border-radius:14px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
        <p style="margin:0;font-size:15px;line-height:1.65;color:#d4d4dc;white-space:pre-wrap;">${esc(v.message)}</p>
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
        <tr><td>
          <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#6b6b7b;">Debug Info</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="font-size:12px;color:#7a7a8a;line-height:1.8;">
            <tr><td style="padding-right:16px;color:#5a5a6a;">Time</td><td>${esc(v.timestamp)}</td></tr>
            <tr><td style="padding-right:16px;color:#5a5a6a;">IP</td><td>${esc(v.ip)}</td></tr>
            <tr><td style="padding-right:16px;color:#5a5a6a;">User-Agent</td><td style="word-break:break-all;">${esc(v.userAgent)}</td></tr>
            <tr><td style="padding-right:16px;color:#5a5a6a;">Referer</td><td>${esc(v.referer)}</td></tr>
          </table>
        </td></tr>
      </table>
    `,
    { preheader: `New message from ${esc(v.name)} — ${esc(v.subject)}` }
  ),

  autoReplyEnabled: true,
  autoReplySubject: "We received your message ✨",
  autoReplyHtml: (v: { name: string; subject: string; message: string }) => emailLayout(
    "Message received",
    `
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;">Moon Development</p>
      <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1.2;">Thanks, ${esc(v.name)}</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#b4b4c7;">We got your message and will get back to you as soon as we can. In the meantime, here's what you sent us:</p>

      <div style="padding:20px;background:rgba(255,255,255,0.03);border-radius:14px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
        <p style="margin:0 0 6px;font-size:12px;color:#8b8b9a;text-transform:uppercase;letter-spacing:0.08em;">${esc(v.subject)}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#a0a0b0;white-space:pre-wrap;">${esc(v.message)}</p>
      </div>

      <p style="margin:0;font-size:14px;color:#6b6b7b;">— The Moon Development team</p>
    `,
    {
      preheader: "We've received your message and will be in touch soon.",
      footer: `You're receiving this because you contacted us at <a href="${esc(EMAIL_CONFIG.defaultBaseUrl)}" style="color:#8b8b9a;text-decoration:none;">Moon Development</a>.`,
    }
  ),
};

// ─── Newsletter templates ───

export const NEWSLETTER_TEMPLATES = {
  confirmSubject: "Confirm your subscription 🌙",
  confirmHtml: (v: { confirmUrl: string }) => emailLayout(
    "Confirm your subscription",
    `
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;">Newsletter</p>
      <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1.2;">One more step</h1>
      <p style="margin:0 0 32px;font-size:15px;line-height:1.65;color:#b4b4c7;">Click below to confirm your subscription to the Moon Development newsletter. No spam, just occasional updates on what we're building.</p>

      <div style="text-align:center;margin-bottom:28px;">
        ${pillBtn("Confirm subscription", v.confirmUrl)}
      </div>

      <p style="margin:0;font-size:13px;color:#6b6b7b;text-align:center;">Didn't sign up? You can safely ignore this email.</p>
    `,
    {
      preheader: "Click to confirm your subscription to the Moon Development newsletter.",
      footer: `If the button doesn't work, copy and paste this link:<br/><span style="color:#8b8b9a;word-break:break-all;">${esc(v.confirmUrl)}</span>`,
    }
  ),

  welcomeSubject: "You're in 🌙",
  welcomeHtml: (v: { unsubscribeUrl: string }) => emailLayout(
    "Welcome to Moon Development",
    `
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;">Newsletter</p>
      <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1.2;">You're in</h1>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#b4b4c7;">Welcome to the Moon Development newsletter. We'll send you occasional updates on new releases, Discord bots, and projects we're working on.</p>

      <div style="padding:20px;background:rgba(124,107,255,0.06);border-radius:14px;border:1px solid rgba(124,107,255,0.12);margin-bottom:24px;text-align:center;">
        <p style="margin:0 0 4px;font-size:22px;">🌙</p>
        <p style="margin:0;font-size:13px;color:#a78bfa;font-weight:500;">Thanks for joining the crew</p>
      </div>
    `,
    {
      preheader: "Welcome to the Moon Development newsletter.",
      footer: `Changed your mind? <a href="${esc(v.unsubscribeUrl)}" style="color:#8b8b9a;text-decoration:underline;">Unsubscribe</a> anytime.`,
    }
  ),

  unsubscribeFooter: (unsubscribeUrl: string) => `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
      <tr><td style="text-align:center;font-size:12px;color:#6b6b7b;line-height:1.6;">
        Don't want these emails? <a href="${esc(unsubscribeUrl)}" style="color:#8b8b9a;text-decoration:underline;">Unsubscribe</a>
      </td></tr>
    </table>
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

