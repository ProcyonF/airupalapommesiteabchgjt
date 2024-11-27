'use client'

import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { getProjects, addProject, deleteProject } from '../../firebase/projects'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)

      if (user?.uid === ADMIN_ID) {
        loadProjects()
      }
    })

    return () => unsubscribe()
  }, [])

  const loadProjects = async () => {
    try {
      const projectsData = await getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
      setError('Erreur lors du chargement des projets')
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

      <form onSubmit={handleAddProject} className="mb-8 space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Titre</label>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Description</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-white">URL de l'image</label>
          <input
            type="url"
            name="imageUrl"
            value={newProject.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Lien du projet</label>
          <input
            type="url"
            name="link"
            value={newProject.link}
            onChange={handleInputChange}
            className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-white text-primary-600 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
        >
          Ajouter le projet
        </button>
      </form>

      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <p className="text-gray-300">{project.description}</p>
            <div className="mt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-400 transition-colors"
              >
                Voir le projet
              </a>
            </div>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="mt-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
