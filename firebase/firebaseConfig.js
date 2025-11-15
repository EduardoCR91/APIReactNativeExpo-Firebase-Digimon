import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// (Reemplaza con tu config real si no está en las variables globales)
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
  apiKey: "AIzaSyB0tIvNq3aooY6V7b691xA7984kamUmlkY",
  authDomain: "apgi-digimon-react-expo.firebaseapp.com",
  projectId: "apgi-digimon-react-expo",
  storageBucket: "apgi-digimon-react-expo.firebasestorage.app",
  messagingSenderId: "1076435140804",
  appId: "1:1076435140804:web:44183f58c1872234bf8991"
    };

export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicialización de Auth específica para Web vs. Nativo
export const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web' 
    ? browserLocalPersistence 
    : getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

// URL de la API
export const API_URL = "https://digimon-api.vercel.app/api/digimon";
