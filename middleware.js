import { NextResponse } from 'next/server'

export async function middleware(request) {
  const response = NextResponse.next()

  // Ne pas tracker les requêtes API ou les ressources statiques
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return response
  }

  try {
    // Générer un ID unique pour le visiteur s'il n'en a pas
    let visitorId = request.cookies.get('visitor_id')?.value
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 15)
      response.cookies.set('visitor_id', visitorId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365 // 1 an
      })
    }

    // Enregistrer la visite
    await fetch(`${request.nextUrl.origin}/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: visitorId,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Error tracking visit:', error)
  }

  // Add CSP headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://embed.tawk.to https://vercel.live https://*.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.vercel.app https://vercel.live https://www.googletagmanager.com https://analytics.google.com;
    frame-src 'self' https://vercel.live;
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

export const config = {
  matcher: '/:path*',
}
