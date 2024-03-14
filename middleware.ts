import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "./lib/utils/session";
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get("JWT_TOKEN")?.value;
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/account/verify", "/account/delete"];

  const sessionData = await getServerSession(token);

  if ((pathname === "/login" || pathname === "/register") && token) {
    if (sessionData.user)
      return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  if (pathname.startsWith("/dashboard") || protectedPaths.includes(pathname)) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    if (!sessionData?.user)
      return NextResponse.redirect(new URL("/login", request.url));
    else if (!sessionData?.user?.verified && pathname != "/account/verify")
      return NextResponse.redirect(new URL("/account/verify", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/account/:path*"],
};
