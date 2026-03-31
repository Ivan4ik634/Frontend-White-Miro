import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl.pathname;
  const isAuthUrl =
    request.nextUrl.pathname.startsWith('/app/login') ||
    request.nextUrl.pathname.startsWith('/app/register');

  const isAuth = request.cookies.get('isAuth') ? 'true' : 'false';
  console.log(request.cookies.getAll(), isAuth);
  if (isAuthUrl && isAuth === 'true') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!isAuthUrl && isAuth === 'false') {
    return NextResponse.redirect(new URL(`/app/login?redirect_url=${redirectUrl}`, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/app/activity:path*',
    '/app/board:path*',
    '/app/boards:path*',
    '/app/home:path*',
    '/app/settings:path*',
    '/app/tasks:path*',
    '/app/templates:path*',
    '/app/task:path*',
    '/app/login:path*',
    '/app/register:path*',
  ],
};
