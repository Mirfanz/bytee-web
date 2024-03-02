import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get("JWT_TOKEN");
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/account/verify", "/account/delete"];

  const getSession = async () => {
    return await fetch(new URL("/api/auth/session", request.url), {
      method: "post",
      body: JSON.stringify({ authToken: token?.value }),
    })
      .then((data) => data.json())
      .catch(() => null);
  };

  if ((pathname === "/login" || pathname === "/register") && token?.value) {
    const sessionData = await getSession();
    if (sessionData)
      return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  if (pathname.startsWith("/dashboard") || protectedPaths.includes(pathname)) {
    if (!token?.value)
      return NextResponse.redirect(new URL("/login", request.url));

    const sessionData = await getSession();
    if (!sessionData?.user)
      return NextResponse.redirect(new URL("/login", request.url));
    else if (!sessionData?.user.verified && pathname != "/account/verify")
      return NextResponse.redirect(new URL("/account/verify", request.url));
  }

  return response;
}

export const config = {
  mather: ["/dashboard/:path*", "/account/:path*"],
};
