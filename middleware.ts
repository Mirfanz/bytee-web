import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get("JWT_TOKEN");

  // Protected path
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token?.value)
      return NextResponse.redirect(new URL("/login", request.url));

    const session = await fetch(new URL("/api/auth/session", request.url), {
      method: "post",
      body: JSON.stringify({ authToken: token.value }),
    })
      .then((data) => data.json())
      .catch(() => null);

    if (!session?.user)
      return NextResponse.redirect(new URL("/login", request.url));
    else if (!session?.user.verified)
      return NextResponse.redirect(new URL("/account/verify", request.url));
  }

  return response;
}

export const config = {
  mather: ["/dashboard/:path*"],
};
