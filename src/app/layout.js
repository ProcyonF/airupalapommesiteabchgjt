import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import Navigation from '../components/Navigation'
import { AuthContextProvider } from '../context/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Airupalapomme - Développeur Web',
  description: 'Portfolio personnel de Airupalapomme, développeur web passionné par la création d\'expériences web modernes et innovantes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-secondary-50 text-secondary-900 antialiased">
        <AuthContextProvider>
          <div className="flex min-h-screen flex-col animated-background">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-white/10 backdrop-blur-md border-t border-white/20">
              <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-white text-sm">
                  {new Date().getFullYear()} Airupalapomme. Tous droits réservés.
                </p>
              </div>
            </footer>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
