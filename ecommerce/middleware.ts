import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl

  // Các trang cần login
  const protectedRoutes = ["/checkout", "/profile"]
  // Các trang chỉ dành cho chưa login
  const authRoutes = ["/login", "/register"]

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Chưa login → chặn trang protected
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Đã login → không cho vào login/register nữa
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*", "/login", "/register"],
}