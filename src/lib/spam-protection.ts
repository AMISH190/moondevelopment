// Server-only spam protection helpers.
// IMPORTANT: only import from .functions.ts handler bodies or server routes.

const MIN_RENDER_AGE_MS = 2_000;

export function checkHoneypotAndTimer(input: {
  honeypot?: string | null;
  renderedAt?: number | null;
}): { isSpam: boolean; reason?: string } {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { isSpam: true, reason: "honeypot" };
  }
  if (input.renderedAt && Date.now() - input.renderedAt < MIN_RENDER_AGE_MS) {
    return { isSpam: true, reason: "too_fast" };
  }
  return { isSpam: false };
}

/**
 * Best-effort per-key rate limit backed by the `rate_limits` table.
 * Returns `{ allowed: false, retryAfterSec }` when over the limit.
 * Caveat: this is ad-hoc — sophisticated abuse (rotating IPs) can defeat it.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; retryAfterSec: number }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date();

  const { data: existing } = await supabaseAdmin
    .from("rate_limits" as never)
    .select("key,count,window_start")
    .eq("key", key)
    .maybeSingle<{ key: string; count: number; window_start: string }>();

  const windowStart = existing ? new Date(existing.window_start) : null;
  const windowAgeSec = windowStart
    ? Math.floor((now.getTime() - windowStart.getTime()) / 1000)
    : Infinity;

  if (!existing || windowAgeSec >= windowSeconds) {
    // Reset window
    await supabaseAdmin
      .from("rate_limits" as never)
      .upsert({ key, count: 1, window_start: now.toISOString() }, { onConflict: "key" });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= limit) {
    return { allowed: false, retryAfterSec: windowSeconds - windowAgeSec };
  }

  await supabaseAdmin
    .from("rate_limits" as never)
    .update({ count: existing.count + 1 })
    .eq("key", key);

  return { allowed: true, retryAfterSec: 0 };
}
