import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/index'],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    console.log(process.env.ADMIN);
    if (
      user === process.env.NEXT_PUBLIC_ADMIN &&
      pwd === process.env.NEXT_PUBLIC_PWD
    ) {
      return NextResponse.next();
    }
  }
  url.pathname = '/api/auth';

  return NextResponse.rewrite(url);
}
