'use client'

import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyEmail() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.emailVerified) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Vérifiez votre email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Un email de vérification a été envoyé à votre adresse email.
            Veuillez cliquer sur le lien dans l'email pour activer votre compte.
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">
            Une fois votre email vérifié, vous pourrez vous connecter à votre compte.
          </p>
        </div>
      </div>
    </main>
  )
}
