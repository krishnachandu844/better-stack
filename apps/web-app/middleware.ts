import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    if (req.nextUrl.pathname === "/signin") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if (
    req.nextUrl.pathname === "/signin" ||
    req.nextUrl.pathname === "/signup"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/website/:path", "/signin", "/signup"], // Keep /signin in matcher
};
