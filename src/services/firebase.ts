import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Configuración de Firebase.
 *
 * Las credenciales se obtienen desde variables de entorno
 * para evitar exponer información sensible en el repositorio.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Inicialización única de Firebase.
 */
const app = initializeApp(firebaseConfig);

/**
 * Instancia global de Firestore.
 *
 * Será utilizada por los distintos servicios
 * para leer y persistir información.
 */
export const db = getFirestore(app);