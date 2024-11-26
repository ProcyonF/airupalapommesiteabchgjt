import { db } from './firebase'
import { 
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore'

const PROJECTS_COLLECTION = 'projects'

// Récupérer tous les projets
export const getProjects = async () => {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION)
    const q = query(projectsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    throw error
  }
}

// Ajouter un nouveau projet
export const addProject = async (projectData) => {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION)
    const newProject = {
      ...projectData,
      createdAt: new Date().toISOString()
    }
    
    const docRef = await addDoc(projectsRef, newProject)
    return {
      id: docRef.id,
      ...newProject
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet:', error)
    throw error
  }
}

// Supprimer un projet
export const deleteProject = async (projectId) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId)
    await deleteDoc(projectRef)
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    throw error
  }
}import { db } from './config'
import { 
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore'

const PROJECTS_COLLECTION = 'projects'

// Récupérer tous les projets
export const getProjects = async () => {
    try {
        const projectsRef = collection(db, PROJECTS_COLLECTION)
        const q = query(projectsRef, orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error)
        throw error
    }
}

// Ajouter un nouveau projet
export const addProject = async (projectData) => {
    try {
        const projectsRef = collection(db, PROJECTS_COLLECTION)
        const newProject = {
            ...projectData,
            createdAt: new Date().toISOString()
        }
        
        const docRef = await addDoc(projectsRef, newProject)
        return {
            id: docRef.id,
            ...newProject
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout du projet:', error)
        throw error
    }
}

// Supprimer un projet
export const deleteProject = async (projectId) => {
    try {
        const projectRef = doc(db, PROJECTS_COLLECTION, projectId)
        await deleteDoc(projectRef)
    } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error)
        throw error
    }
}