import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({ children }) {
  return (
    <html lang={metadata.language} suppressHydrationWarning className="dark:bg-gray-900">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
