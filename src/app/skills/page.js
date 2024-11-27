'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../firebase/auth'

const skills = {
  frontend: [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3/SCSS', level: 85 },
    { name: 'JavaScript (ES6+)', level: 85 },
    { name: 'React.js', level: 80 },
    { name: 'Next.js', level: 75 },
    { name: 'Tailwind CSS', level: 85 },
  ],
  backend: [
    { name: 'Node.js', level: 75 },
    { name: 'Express.js', level: 70 },
    { name: 'Python', level: 80 },
    { name: 'Django', level: 70 },
    { name: 'Firebase', level: 75 },
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'VS Code', level: 90 },
    { name: 'Docker', level: 65 },
    { name: 'Figma', level: 70 },
  ],
}

export default function Skills() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    useAuth((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

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
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Accès Restreint
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Les compétences sont uniquement accessibles aux utilisateurs connectés.
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-primary-600 text-white dark:bg-primary-500 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-all"
            >
              Se connecter
            </a>
          </div>
        </div>
      </main>
    )
  }

  const SkillBar = ({ name, level }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">
          Mes Compétences
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Frontend
            </h2>
            {skills.frontend.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </div>

          {/* Backend Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Backend
            </h2>
            {skills.backend.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </div>

          {/* Tools & Others */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Outils & Autres
            </h2>
            {skills.tools.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
