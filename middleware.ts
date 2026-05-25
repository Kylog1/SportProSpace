import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "sportspacepro.pl";
const OLD_HOSTS = ["sportprospace.eu", "www.sportprospace.eu"];

/**
 * Redirect all traffic from old domains to the canonical domain.
 * 301 = permanent redirect — Google transfers link equity to the new domain.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (OLD_HOSTS.includes(host)) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 301 });
  }
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
