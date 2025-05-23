import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('access_token'); // or your cookie name

//   const protectedPaths = ['/dashboard', '/profile'];

//   const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

//   if (isProtected && !token) {
//     const loginUrl = new URL('/login', req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }
