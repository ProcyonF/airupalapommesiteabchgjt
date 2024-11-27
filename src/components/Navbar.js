'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Airupalapomme
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/' ? 'border-blue-500' : 'border-transparent'
                } ${isActive('/')} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                Accueil
              </Link>
              <Link
                href="/projects"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/projects' ? 'border-blue-500' : 'border-transparent'
                } ${isActive('/projects')} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                Mes Projets
              </Link>
              <Link
                href="/ai"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/ai' ? 'border-blue-500' : 'border-transparent'
                } ${isActive('/ai')} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                Intelligence Artificielle
              </Link>
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/about' ? 'border-blue-500' : 'border-transparent'
                } ${isActive('/about')} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                À Propos
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/contact' ? 'border-blue-500' : 'border-transparent'
                } ${isActive('/contact')} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
