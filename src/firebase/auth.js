import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from './config'

export const auth = getAuth(app)

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export const useAuth = (callback) => {
  onAuthStateChanged(auth, callback)
}
