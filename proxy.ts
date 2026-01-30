import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  try {
    const { data } = await userService.getSession();

    if (data && data.user) {
      isAuthenticated = true;
      userRole = data.user.role;
    }
  } catch (err) {
    console.error("Session fetch error:", err);
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userRole === Roles.student) {
    if (
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (userRole === Roles.tutor) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  if (userRole === Roles.admin) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
