'use client'

import { useEffect, useState } from 'react'
import { getProjects } from '../firebase/projects'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    async function loadProjects() {
      if (user) {
        try {
          const projectsData = await getProjects()
          setProjects(projectsData)
        } catch (error) {
          console.error('Error loading projects:', error)
        }
      }
      setLoading(false)
    }

    loadProjects()
  }, [user])

  return (
    <div className="min-h-screen dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 dark:bg-gradient-to-b dark:from-black/80 dark:to-black/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-white mb-6 animate-fadeIn">
            Airupalapomme
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-400 mb-8 animate-fadeIn">
            Développeur Web Passionné
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <a 
                href="#projects"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full font-semibold hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Voir mes projets
              </a>
            ) : (
              <Link
                href="/login"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full font-semibold hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Se connecter pour voir les projets
              </Link>
            )}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 content-section dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              À propos de moi
            </h2>
            <div className="w-20 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-secondary-600 dark:text-gray-300">
                Passionné par le développement web, je me spécialise dans la création de sites web modernes et performants.
                Mon engagement dans une formation continue sur les technologies du web et de l'IA me permet d'offrir des solutions toujours plus innovantes.
              </p>
              <p className="text-lg text-secondary-600 dark:text-gray-300">
                Je travaille principalement avec React, Next.js et Node.js, mais j'aime explorer de nouvelles technologies
                pour toujours rester à la pointe de l'innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-primary-600 dark:text-primary-400">Frontend</h3>
                <ul className="space-y-2 text-secondary-600 dark:text-gray-300">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              
              <div className="p-6 bg-secondary-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-primary-600 dark:text-primary-400">Backend</h3>
                <ul className="space-y-2 text-secondary-600 dark:text-gray-300">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>Firebase</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {user ? (
        <section id="projects" className="py-20 content-section dark:bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                Mes Projets
              </h2>
              <div className="w-20 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
            </div>

            {loading ? (
              <p className="text-center text-secondary-600 dark:text-gray-300">Chargement des projets...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200 border border-white/20 dark:border-gray-800/20">
                    {project.imageUrl && (
                      <div className="relative aspect-w-16 aspect-h-9">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-white dark:text-white">{project.title}</h3>
                      <p className="text-gray-300 dark:text-gray-400 mb-4">{project.description}</p>
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full font-semibold hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                        >
                          Voir le projet
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section id="projects" className="py-20 content-section dark:bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-lg p-8 text-center border border-white/20 dark:border-gray-800/20">
              <h2 className="text-3xl font-bold mb-4 text-white dark:text-white">Accès Restreint</h2>
              <p className="text-xl text-gray-300 dark:text-gray-400 mb-6">
                Les projets sont uniquement accessibles aux utilisateurs connectés.
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full font-semibold hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
