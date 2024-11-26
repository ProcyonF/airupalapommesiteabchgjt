import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAc4jmeVVQEBsi3ql1SWoobK-Zqof3MXmY",
  authDomain: "social-video-downloader-1d30b.firebaseapp.com",
  projectId: "social-video-downloader-1d30b",
  storageBucket: "social-video-downloader-1d30b.firebasestorage.app",
  messagingSenderId: "365847602700",
  appId: "1:365847602700:web:dcac5646b716b9e95cf029",
  measurementId: "G-N7DVBWZ2F9"
};

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);
export default firebase_app;