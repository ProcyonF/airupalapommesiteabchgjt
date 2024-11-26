'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { getProjects, addProject, deleteProject } from '../../firebase/projects'

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  })
  
  const ADMIN_ID = "Mpr84ccCpsZyfzZ5AApyZFcHN7W2"

  useEffect(() => {
    if (user?.uid !== ADMIN_ID) {
      router.push('/')
      return
    }

    const loadProjects = async () => {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error)
        setError('Erreur lors du chargement des projets')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [user, router])

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
    return <div className="p-4">Chargement...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleAddProject} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">URL de l'image</label>
          <input
            type="url"
            name="imageUrl"
            value={newProject.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Lien du projet</label>
          <input
            type="url"
            name="link"
            value={newProject.link}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter le projet
        </button>
      </form>

      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <div className="mt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Voir le projet
              </a>
            </div>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
