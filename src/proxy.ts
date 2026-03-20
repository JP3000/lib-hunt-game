import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOTAL_LEVELS } from "@/lib/constants";

const LEVEL_PATH_REGEX = /^\/levels\/(\d+)\/?$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(LEVEL_PATH_REGEX);

  if (!match) {
    return NextResponse.next();
  }

  const rawLevel = match[1];
  const levelNumber = Number(rawLevel);

  if (!Number.isInteger(levelNumber) || levelNumber < 1 || levelNumber > TOTAL_LEVELS) {
    return NextResponse.next();
  }

  const canonicalLevel = String(levelNumber).padStart(2, "0");
  if (rawLevel === canonicalLevel) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/levels/${canonicalLevel}`;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: "/levels/:path*",
};
