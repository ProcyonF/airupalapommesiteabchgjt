'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-gray-600 mb-6">
          Nous nous excusons pour ce désagrément. Vous pouvez essayer de recharger la page.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
