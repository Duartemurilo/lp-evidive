import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicAdminRoute = createRouteMatcher(["/admin/login(.*)"]);
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicAdminRoute(req)) {
    const { userId } = await auth();
    if (userId) {
      const dashboardUrl = new URL("/admin/viagens", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }
  if (isProtectedRoute(req)) {
    const loginUrl = new URL("/admin/login", req.url).toString();
    await auth.protect({
      unauthenticatedUrl: loginUrl,
      unauthorizedUrl: loginUrl,
    });
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin(.*)",
    "/api/admin(.*)",
    "/__clerk/(.*)",
  ],
};
