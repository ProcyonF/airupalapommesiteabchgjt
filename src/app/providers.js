'use client'

import { AuthContextProvider } from '../context/AuthContext'
import { ThemeProvider } from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Analytics from '../components/Analytics'

export function Providers({ children }) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Navigation />
        <Analytics />
        <main className="pt-16">
          {children}
        </main>
      </ThemeProvider>
    </AuthContextProvider>
  )
}
