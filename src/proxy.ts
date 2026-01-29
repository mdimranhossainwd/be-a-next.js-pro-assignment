import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  // Get user session
  try {
    const { data } = await userService.getSession();

    if (data && data.user) {
      isAuthenticated = true;
      userRole = data.user.role; // "STUDENT", "TUTOR", "ADMIN"
    }
  } catch (err) {
    console.error("Session fetch error:", err);
  }

  // User not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based dashboard redirects
  if (userRole === Roles.student) {
    // Prevent student from visiting tutor or admin dashboards
    if (
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (userRole === Roles.tutor) {
    // Prevent tutor from visiting student or admin dashboards
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  if (userRole === Roles.admin) {
    // Prevent admin from visiting student or tutor dashboards
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  // All other routes are allowed
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
