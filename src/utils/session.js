import { cookies } from 'next/headers';
import { auth } from '../firebase/config';

export const sessionManager = {
  create: async (user) => {
    try {
      const token = await user.getIdToken();
      const expiresIn = 3600; // 1 heure
      
      cookies().set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: expiresIn
      });
      
      return token;
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
      throw error;
    }
  },
  
  verify: async (token) => {
    try {
      if (!token) return null;
      const decodedToken = await auth.verifyIdToken(token);
      return decodedToken;
    } catch {
      cookies().delete('auth-token');
      return null;
    }
  },
  
  destroy: () => {
    try {
      cookies().delete('auth-token');
    } catch (error) {
      console.error('Erreur lors de la destruction de la session:', error);
    }
  }
};
