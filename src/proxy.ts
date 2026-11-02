import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie");

    if (!cookie) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/auth/me`,
      {
        headers: {
          Cookie: cookie,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const data = await response.json();

    if (!data.authenticated || !data.user) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy authentication error:", error);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/events/create/:path*"],
};