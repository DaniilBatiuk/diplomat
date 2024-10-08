import { UserRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const adminPages = ["/createProduct", "/admin", "/updateProduct"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  if (adminPages.includes(url)) {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token || token.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/createProduct", "/admin", "/updateProduct"],
};
