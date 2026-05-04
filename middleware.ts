import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/protect-data/private", "/protect-data/private-data-protected"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.includes(pathname);

  if (isPrivateRoute && !sessionCookie) {
    const redirectUrl = new URL("/protect-data/public", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  // API ルート、静的ファイル(static)、Next.jsの内部ファイル(_next)、および拡張子を含むパス（例: .png, .jpg, .css など）を除外し、全てのページルートにミドルウェアを適用します。
  // .*\\..* は「ドットを含む任意のファイル名（拡張子付きのファイル）」を意味します。
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
