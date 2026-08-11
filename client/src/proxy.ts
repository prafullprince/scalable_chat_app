import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/chat"];
const AUTH_PATHS = ["/login", "/signup", "/", "verify-email"];

export function proxy(req:NextRequest) {
    const pathName = req.nextUrl.pathname;
    const refresh_token = req.cookies.get("refresh_token")?.value;

    const isProtected = PROTECTED_PATHS.some((p)=> pathName.startsWith(p));
    const isAuth = AUTH_PATHS.some((p)=>pathName.startsWith(p));

    // if user want to access protected route but didn't have refresh_token redirect to login
    if(isProtected && !refresh_token) {
        // redirect to login
        const loginUrl = new URL("/login", req.nextUrl);
        loginUrl.searchParams.set("redirect", pathName);
        return NextResponse.redirect(loginUrl);
    }

    // if user want to access auth route but have refresh_token redirect to chat
    if(isAuth && refresh_token) {
        NextResponse.redirect(new URL("/chat", req.nextUrl));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/chat/:path*", "/login", "/signup", "/verify-email", "/", "/dashboard/:path*"]
}
