/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://*.vercel.app https://vercel.live;
              style-src 'self' 'unsafe-inline' https://vercel.live https://fonts.googleapis.com;
              img-src 'self' blob: data: https: https://*.vercel-insights.com;
              font-src 'self' data: https://fonts.gstatic.com;
              connect-src 'self' 
                https://*.vercel-insights.com 
                https://vitals.vercel-insights.com 
                https://*.vercel.app 
                https://vercel.live 
                https://www.googletagmanager.com 
                https://analytics.google.com
                https://*.googleapis.com
                https://*.firebaseio.com
                https://*.cloudfunctions.net
                https://*.firebase.com
                https://firestore.googleapis.com
                wss://*.firebaseio.com
                https://*.pusher.com
                wss://*.pusher.com;
              frame-src 'self' https://vercel.live;
              media-src 'self';
              worker-src 'self' blob:;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'vercel.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
