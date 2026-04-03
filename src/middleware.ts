import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('funifay_token')?.value

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login/', request.url))
  }

  // Si ya tienen sesion abierta y van a login/register, los rebotamos al dashboard
  // Pero permitimos que se queden en callback o complete-profile
  const isAuthPage = request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register' || request.nextUrl.pathname === '/auth/login/' || request.nextUrl.pathname === '/auth/register/'
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
