import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclude /admin/auth routes from authentication
  if (pathname.startsWith("/admin/auth")) {
    return NextResponse.next();
  }

  // Check for cookie
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/admin/auth/sign-in", request.url));
  }

  // Validate the JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log(payload); // If needed, handle payload or add user context
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/admin/auth/sign-in", request.url));
  }
}

// Configuration for matching paths, excluding /admin/auth routes
export const config = {
  matcher: ["/admin/:path*"],
  // This matcher ensures middleware runs for /admin routes except /admin/auth
};
