import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/protect-data/private", "/protect-data/private-data-protected"];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  // 既存のprivateRoutes保護
  const isPrivateRoute = privateRoutes.includes(pathname);
  if (isPrivateRoute && !sessionCookie) {
    const redirectUrl = new URL("/protect-data/public", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 管理画面の保護（/admin/login は除外）
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminRoute && !sessionCookie) {
    const redirectUrl = new URL("/admin/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  // API ルート、静的ファイル(static)、Next.jsの内部ファイル(_next)、および拡張子を含むパス（例: .png, .jpg, .css など）を除外し、全てのページルートにプロキシを適用します。
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
