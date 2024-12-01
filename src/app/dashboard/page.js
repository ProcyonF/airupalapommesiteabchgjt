'use client'

import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import { db } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { getProjects, addProject, deleteProject } from '../../firebase/projects'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  })
  
  const ADMIN_ID = "Mpr84ccCpsZyfzZ5AApyZFcHN7W2"

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)

      if (user?.uid === ADMIN_ID) {
        loadProjects()
        fetchAnalytics()
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const loadProjects = async () => {
    try {
      const projectsData = await getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
      setError('Erreur lors du chargement des projets')
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setAnalytics(data)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
      setError('Erreur lors du chargement des statistiques')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const newProjectData = await addProject(newProject)
      setProjects(prev => [newProjectData, ...prev])
      setNewProject({
        title: '',
        description: '',
        imageUrl: '',
        link: ''
      })
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet:', error)
      setError('Erreur lors de l\'ajout du projet')
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return
    }

    setError('')
    
    try {
      await deleteProject(projectId)
      setProjects(prev => prev.filter(project => project.id !== projectId))
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error)
      setError('Erreur lors de la suppression du projet')
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return <div className="p-4 text-white">Chargement...</div>
  }

  if (!currentUser || currentUser.uid !== ADMIN_ID) {
    return <div className="p-4 text-white">Accès non autorisé</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Dashboard</h1>
      
      {error && (
        <div className="bg-red-400/10 border border-red-400 text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Section Statistiques */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Statistiques de visibilité</h2>
        {analytics ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Aujourd'hui */}
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <h3 className="text-sm font-medium text-gray-400">Aujourd'hui</h3>
                <p className="text-2xl font-bold text-white">{analytics.today.totalVisits}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {analytics.today.uniqueVisitors} visiteurs uniques
                </p>
              </div>

              {/* Hier */}
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <h3 className="text-sm font-medium text-gray-400">Hier</h3>
                <p className="text-2xl font-bold text-white">{analytics.yesterday.totalVisits}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {analytics.yesterday.uniqueVisitors} visiteurs uniques
                </p>
              </div>

              {/* Cette semaine */}
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <h3 className="text-sm font-medium text-gray-400">Cette semaine</h3>
                <p className="text-2xl font-bold text-white">{analytics.weekly.totalVisits}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {analytics.weekly.uniqueVisitors} visiteurs uniques
                </p>
              </div>

              {/* Ce mois */}
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <h3 className="text-sm font-medium text-gray-400">Ce mois</h3>
                <p className="text-2xl font-bold text-white">{analytics.monthly.totalVisits}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {analytics.monthly.uniqueVisitors} visiteurs uniques
                </p>
              </div>
            </div>

            {/* Pages les plus visitées */}
            <div className="bg-white/5 border border-white/10 rounded p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Pages les plus visitées aujourd'hui</h3>
              <div className="space-y-2">
                {Object.entries(analytics.topPages).map(([page, views]) => (
                  <div key={page} className="flex justify-between items-center">
                    <span className="text-white">{page}</span>
                    <span className="text-gray-400">{views} vues</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Chargement des statistiques...</p>
        )}
      </div>

      {/* Section Projets */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Gestion des Projets</h2>
        
        {/* Formulaire d'ajout de projet */}
        <form onSubmit={handleAddProject} className="mb-8">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">URL de l'image</label>
              <input
                type="url"
                name="imageUrl"
                value={newProject.imageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Lien du projet</label>
              <input
                type="url"
                name="link"
                value={newProject.link}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Ajouter le projet
            </button>
          </div>
        </form>

        {/* Liste des projets */}
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{project.title}</h3>
                  <p className="text-gray-400 mt-1">{project.description}</p>
                  <div className="mt-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      Voir le projet
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={toggleDarkMode} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Toggle Dark Mode
      </button>
    </div>
  )
}
