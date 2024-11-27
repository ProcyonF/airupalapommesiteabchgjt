'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '../../firebase/projects'
import { useAuth } from '../../firebase/auth'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Vérifier l'état de l'authentification
    useAuth((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    // Charger les projets seulement si l'utilisateur est connecté
    const loadProjects = async () => {
      if (!user) return
      
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (err) {
        console.error('Erreur lors du chargement des projets:', err)
        setError('Impossible de charger les projets')
      }
    }

    loadProjects()
  }, [user])

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-white">Chargement...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center border border-white/20">
            <h1 className="text-3xl font-bold mb-4 text-white">Accès Restreint</h1>
            <p className="text-xl text-gray-300 mb-6">
              Les projets sont uniquement accessibles aux utilisateurs connectés.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-red-400">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Mes Projets</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <p className="text-white">Aucun projet n'a été trouvé.</p>
          ) : (
            projects.map((project) => (
              <article key={project.id} className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-200 border border-white/20">
                {project.imageUrl && (
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-white text-primary-600 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Voir le projet
                  </Link>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
