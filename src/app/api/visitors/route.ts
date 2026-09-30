import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

/**
 * Total visitors, counted as unique browsers in a Redis HyperLogLog (a fixed ~12 KB, and it
 * never stores the IDs themselves). Credentials come from the Upstash integration on Vercel.
 * Without them the counter reports `null` and the UI hides itself. Previews and local dev
 * share the production database, so they count on their own key.
 */
const KEY = process.env.VERCEL_ENV === 'production' ? 'stats:visitors' : `stats:visitors:${process.env.VERCEL_ENV ?? 'development'}`;
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime|monitor/i;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const redis = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN ? Redis.fromEnv() : null;

const json = (visitors: number | null, status = 200, headers?: Record<string, string>) =>
  Response.json({ visitors }, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

// Polled by every open tab, so Vercel's CDN answers most reads and Redis sees about one per
// minute per region. Browsers never cache it, so each poll gets the CDN's latest copy.
const CDN_CACHE = { 'Vercel-CDN-Cache-Control': 'max-age=60, stale-while-revalidate=300' };

export async function GET() {
  if (!redis) return json(null);
  try {
    return json(await redis.pfcount(KEY), 200, CDN_CACHE);
  } catch {
    return json(null, 503);
  }
}

export async function POST(request: Request) {
  if (!redis) return json(null);
  const { id } = ((await request.json().catch(() => null)) ?? {}) as { id?: unknown };
  if (typeof id !== 'string' || !UUID.test(id)) return json(null, 400);
  try {
    if (BOT.test(request.headers.get('user-agent') ?? '')) return json(await redis.pfcount(KEY));
    const [, visitors] = await redis.pipeline().pfadd(KEY, id).pfcount(KEY).exec<[number, number]>();
    return json(visitors);
  } catch {
    return json(null, 503);
  }
}
