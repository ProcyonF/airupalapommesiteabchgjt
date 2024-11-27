import { NextResponse } from 'next/server'
import { auth } from './firebase/config'

export async function middleware(request) {
  const authToken = request.cookies.get('auth-token')?.value

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  if (authToken && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Ajouter le token aux headers pour l'utiliser dans l'API
  const requestHeaders = new Headers(request.headers)
  if (authToken) {
    requestHeaders.set('Authorization', `Bearer ${authToken}`)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/login']
}
