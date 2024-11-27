import { getAuth } from 'firebase/auth';
import { app } from '../firebase/config';

// Initialiser l'authentification Firebase
const auth = getAuth(app);

// Fonction pour vérifier si l'utilisateur est authentifié
export async function isAuthenticated(session) {
  try {
    const user = auth.currentUser;
    return user !== null;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error);
    return false;
  }
}

// Fonction pour obtenir le token d'authentification
export async function getAuthToken() {
  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération du token:", error);
    return null;
  }
}

export { auth };
