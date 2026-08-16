import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/chat"];

export function proxy(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathName.startsWith(path)
  );

  // Protected route + no refresh token
  if (isProtected && !refreshToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathName);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/chat/:path*",
    "/dashboard/:path*",
  ],
};
