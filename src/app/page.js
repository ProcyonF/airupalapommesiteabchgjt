'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProjects } from '../firebase/projects'
import { useAuth } from '../firebase/auth'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Vérifier l'état de l'authentification
    useAuth((currentUser) => {
      setUser(currentUser)
    })
  }, [])

  useEffect(() => {
    const loadProjects = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (err) {
        console.error('Erreur lors du chargement des projets:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [user])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Airupalapomme
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto animate-fade-in">
            Développeur Web Passionné par la Création d'Expériences Numériques Innovantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <a 
                href="#projects" 
                className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Voir mes projets
              </a>
            ) : (
              <Link
                href="/login"
                className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Se connecter pour voir les projets
              </Link>
            )}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              À propos de moi
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-secondary-600">
                Passionné par le développement web, je me spécialise dans la création de sites web modernes et performants.
                Mon engagement dans une formation continue sur les technologies du web et de l'IA me permet d'offrir des solutions toujours plus innovantes.
              </p>
              <p className="text-lg text-secondary-600">
                Je travaille principalement avec React, Next.js et Node.js, mais j'aime explorer de nouvelles technologies
                pour toujours rester à la pointe de l'innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-secondary-50 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-primary-600">Frontend</h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="p-6 bg-secondary-50 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-primary-600">Backend</h3>
                <ul className="space-y-2 text-secondary-600">
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
        <section id="projects" className="py-20 content-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
                Mes Projets
              </h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            </div>

            {loading ? (
              <p className="text-center text-secondary-600">Chargement des projets...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200 border border-white/20">
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
                      <h3 className="font-bold text-xl mb-2 text-white">{project.title}</h3>
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section id="projects" className="py-20 content-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center border border-white/20">
              <h2 className="text-3xl font-bold mb-4 text-white">Accès Restreint</h2>
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
        </section>
      )}
    </div>
  )
}
