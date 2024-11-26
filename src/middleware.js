import { NextResponse } from 'next/server'

export function middleware(request) {
  const authToken = request.cookies.get('auth-token')

  // Liste des chemins protégés qui nécessitent une authentification
  const protectedPaths = ['/dashboard']

  // Vérifier si l'URL actuelle est une route protégée
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Si c'est une route protégée et qu'il n'y a pas de token
  if (isProtectedPath && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  if (authToken && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}
