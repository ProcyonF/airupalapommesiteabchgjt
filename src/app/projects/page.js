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
      <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-900 dark:text-gray-200">Chargement...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Accès Restreint</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Les projets sont uniquement accessibles aux utilisateurs connectés.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-primary-600 text-white dark:bg-primary-500 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-all"
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
      <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">Mes Projets</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Aucun projet n'a été trouvé.</p>
          ) : (
            projects.map((project) => (
              <article 
                key={project.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
              >
                {project.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden">
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
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Voir le projet
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
