import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const cookie = request.headers.get("cookie");

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: cookie,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await response.json();

    if (data.authenticated === true && data.user) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Proxy authentication error:", error);

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/events/create"],
};