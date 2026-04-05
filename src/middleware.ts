import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('funifay_token')?.value

  // 1. Redirección si NO está logueado y va al dashboard
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    loginUrl.search = '' // Limpiar parámetros previos para evitar bucles
    return NextResponse.redirect(loginUrl)
  }

  // 2. Redirección si YA está logueado y va a login/register
  const isAuthPage = request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register'
  if (token && isAuthPage) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/auth/login',
    '/auth/register'
  ],
}

