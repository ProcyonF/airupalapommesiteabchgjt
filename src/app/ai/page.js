'use client'

import React from 'react'
import Link from 'next/link'

export default function AIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/60 to-black/30 dark:from-black/80 dark:to-black/60">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-white dark:text-white">Intelligence Artificielle</h1>
        
        {/* Navigation retour */}
        <Link 
          href="/"
          className="inline-block mb-8 text-gray-200 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
        >
          ← Retour à l'accueil
        </Link>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Contenu de la page IA à venir */}
          <div className="p-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">Section IA</h2>
            <p className="text-gray-200 dark:text-gray-300">
              Contenu à venir...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
