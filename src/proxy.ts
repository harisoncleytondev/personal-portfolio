import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/download/cv") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  const denyAccess = () => {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  };

  if (!token) {
    return denyAccess();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return denyAccess();
  }
}

export const config = {
  // pega tds as rotas menos estaticas.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
