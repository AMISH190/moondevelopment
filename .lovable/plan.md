
## What we'll build

### 1. Newsletter signup with double opt-in
- New `Newsletter` component (email input + submit) embedded on the home page and footer.
- Database table `newsletter_subscribers` (email, status: `pending`/`confirmed`/`unsubscribed`, confirm_token, unsubscribe_token, timestamps, ip, user_agent). RLS locked down — writes only via server functions.
- Server fn `subscribeNewsletter`: validates email, inserts pending row, sends **confirmation email** with `/api/public/newsletter/confirm?token=...` link via Resend.
- Public route `/api/public/newsletter/confirm`: marks subscriber confirmed, sends **welcome email**, redirects to a `/newsletter/confirmed` thank-you page.
- Public route `/api/public/newsletter/unsubscribe`: one-click unsubscribe link included in every email footer.

### 2. Admin notifications for contact form
- Extend existing `sendContactEmail` server fn to capture request metadata via `getRequestIP`, `getRequestHeader('user-agent')`, and `getRequestHeader('referer')`.
- Admin email (sent to `moonxdevs@gmail.com`) includes: name, email, subject, message, IP, user agent, referer, timestamp. Reply-To stays the visitor's address.
- Optional auto-reply to the visitor confirming receipt (toggleable via template config below).

### 3. Configurable email templates
- New file `src/lib/email-templates.ts` exporting a typed config object:
  ```
  contact: {
    adminTo, adminSubject, adminHtml(vars), autoReplyEnabled,
    autoReplySubject, autoReplyHtml(vars),
  }
  newsletter: {
    fromName, confirmSubject, confirmHtml(vars),
    welcomeSubject, welcomeHtml(vars),
  }
  ```
- Subjects support `{{name}}`, `{{subject}}` style placeholders; HTML bodies are plain template functions for full control. Editing one file changes all outgoing mail — no code changes elsewhere.

### 4. Spam protection (honeypot + ad-hoc rate limit)
- **Honeypot**: hidden `website` field on contact + newsletter forms; if filled, server fn returns `{ ok: true }` silently without sending.
- **Time-trap**: form records render timestamp; submissions under 2s rejected as bot.
- **Rate limit**: ad-hoc per-IP limiter backed by a `rate_limits` table (key, count, window_start). 5 contact submissions / 10 min / IP; 3 newsletter signups / hour / IP. Returns 429-style error in UI.
  - Note: the platform has no built-in rate-limit primitive. This table-based limiter is best-effort and won't survive sophisticated abuse (rotating IPs, etc.). Confirm you accept that tradeoff before we ship it.

## Technical details

**Files added**
- `src/lib/email-templates.ts` — central template config.
- `src/lib/newsletter.functions.ts` — `subscribeNewsletter` server fn.
- `src/lib/spam-protection.ts` — honeypot + rate-limit helpers (server-side).
- `src/components/NewsletterSignup.tsx` — UI component.
- `src/routes/api/public/newsletter/confirm.ts` — confirmation handler.
- `src/routes/api/public/newsletter/unsubscribe.ts` — unsubscribe handler.
- `src/routes/newsletter.confirmed.tsx` — thank-you page.

**Files edited**
- `src/lib/email.functions.ts` — pull subjects/bodies from templates, add metadata, integrate spam checks.
- `src/routes/contact.tsx` — add honeypot field, render timestamp.
- `src/routes/index.tsx` + `src/components/SiteFooter.tsx` — embed `NewsletterSignup`.

**Database (Lovable Cloud migration)**
```sql
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  status text not null default 'pending',
  confirm_token uuid not null default gen_random_uuid(),
  unsubscribe_token uuid not null default gen_random_uuid(),
  ip text, user_agent text,
  created_at timestamptz default now(),
  confirmed_at timestamptz
);
create table public.rate_limits (
  key text primary key,
  count int not null default 0,
  window_start timestamptz not null default now()
);
-- GRANTs to service_role only; RLS enabled; no public policies (server-only access).
```

**Resend**
- All mail continues to flow through the connector gateway with `from: Moon Development <onboarding@resend.dev>`. Verifying a custom domain in Resend later is a one-line change in `email-templates.ts`.

## Open question
- Confirm you're OK with the table-based rate limiter caveat above (no platform-native primitive). If you'd rather skip it and ship only honeypot + time-trap, say so and I'll drop the `rate_limits` table.
