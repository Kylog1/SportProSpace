/**
 * Simple in-memory rate limiter per IP address.
 *
 * NOTE: This is per-serverless-instance. On Vercel, different function instances
 * have separate memory, so the effective limit is per-instance. For a hard
 * cross-instance limit, replace with Upstash Redis (@upstash/ratelimit).
 * For a contact form this level of protection is sufficient.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

// Periodically clean up expired entries to avoid memory leaks
// (runs on every check, cheap O(1) amortised because most entries are recent)
function pruneExpired(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the limit resets (only set when ok === false) */
  retryAfter: number;
}

/**
 * @param ip        Client IP address (use x-forwarded-for on Vercel)
 * @param limit     Max requests allowed within the window
 * @param windowMs  Window duration in milliseconds
 */
export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  pruneExpired(now);

  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** Extract the real client IP from a Next.js Request */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
