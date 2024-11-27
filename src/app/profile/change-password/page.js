'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../context/AuthContext'

export default function ChangePassword() {
  const router = useRouter()
  const { user, updatePassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      return setError('Les nouveaux mots de passe ne correspondent pas')
    }

    if (newPassword.length < 6) {
      return setError('Le nouveau mot de passe doit contenir au moins 6 caractères')
    }

    try {
      setError('')
      setSuccess('')
      setLoading(true)
      
      await updatePassword(currentPassword, newPassword)
      
      setSuccess('Mot de passe modifié avec succès')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      console.error(err)
      setError('Erreur lors de la modification du mot de passe. Vérifiez votre mot de passe actuel.')
    }
    
    setLoading(false)
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Modifier le mot de passe
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/20">
          {error && (
            <div className="mb-4 bg-red-400/10 border border-red-400 text-red-400 rounded-md p-3 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-400/10 border border-green-400 text-green-400 rounded-md p-3 text-sm">
              {success}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-white">
                Mot de passe actuel
              </label>
              <div className="mt-1">
                <input
                  id="current-password"
                  name="current-password"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-white">
                Nouveau mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-white">
                Confirmer le nouveau mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                {loading ? 'Modification...' : 'Modifier le mot de passe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
