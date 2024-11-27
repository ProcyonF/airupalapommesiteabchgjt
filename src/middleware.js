import { NextResponse } from 'next/server';
import { csrf } from './utils/csrf';
import { auth, isAuthenticated } from './utils/auth'; // Importer la fonction auth

export async function middleware(request) {
  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = ['/profile'];
  const authRoutes = ['/login', '/signup'];
  const path = request.nextUrl.pathname;

  // Vérification CSRF pour les requêtes POST
  if (request.method === 'POST') {
    const csrfToken = request.headers.get('X-CSRF-Token');
    const isValid = await csrf.verifyToken(csrfToken);
    
    if (!isValid) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid CSRF token' }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Vérifier l'authentification pour les routes protégées
  if (protectedRoutes.some(route => path.startsWith(route))) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const user = auth.currentUser;
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Rediriger les utilisateurs connectés depuis les pages d'auth
  if (authRoutes.includes(path)) {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Ajouter les headers de sécurité
  const response = NextResponse.next();
  
  // Ajouter un nouveau token CSRF pour les requêtes GET
  if (request.method === 'GET') {
    const token = await csrf.generateToken();
    response.headers.set('X-CSRF-Token', token);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
