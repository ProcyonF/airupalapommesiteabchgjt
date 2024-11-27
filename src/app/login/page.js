'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setError('')
      setLoading(true)
      console.log('Tentative de connexion avec:', { email })
      await login(email, password)
      console.log('Connexion réussie')
      router.push('/')
    } catch (err) {
      console.error('Erreur détaillée:', {
        code: err.code,
        message: err.message,
        fullError: err
      })
      
      switch (err.code) {
        case 'auth/wrong-password':
          setError('Mot de passe incorrect.')
          break
        case 'auth/user-not-found':
          setError('Aucun compte trouvé avec cet email.')
          break
        case 'auth/invalid-email':
          setError('Format d\'email invalide.')
          break
        case 'auth/too-many-requests':
          setError('Trop de tentatives de connexion. Veuillez réessayer plus tard.')
          break
        case 'auth/network-request-failed':
          setError('Problème de connexion au serveur. Vérifiez votre connexion Internet.')
          break
        default:
          setError(`Une erreur est survenue: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-black/60 to-black/30 dark:from-black/80 dark:to-black/60">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Connexion
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Ou{' '}
          <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
            créez un compte
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white/10 dark:bg-gray-800/50 text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white/10 dark:bg-gray-800/50 text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
