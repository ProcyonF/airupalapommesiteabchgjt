'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = async (email, password, username) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: username
        });
        await sendEmailVerification(userCredential.user);
        return userCredential;
    };

    const login = async (email, password) => {
        try {
            console.log('AuthContext: Tentative de connexion')
            const result = await signInWithEmailAndPassword(auth, email, password)
            console.log('AuthContext: Connexion réussie', result.user.uid)
            return result
        } catch (error) {
            console.error('AuthContext: Erreur de connexion', {
                code: error.code,
                message: error.message,
                fullError: error
            })
            throw error
        }
    };

    const logout = async () => {
        setUser(null);
        await signOut(auth);
    };

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            )
            await reauthenticateWithCredential(user, credential)
            await firebaseUpdatePassword(user, newPassword)
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, updatePassword }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
