import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

/**
 * Referencia a la colección principal de proyectos.
 *
 * Estructura:
 *
 * projects
 *   └── documentId
 *       ├── title
 *       ├── category
 *       ├── description
 *       ├── image
 *       └── ...
 */
const projectsRef = collection(db, "projects");

/**
 * Crea un nuevo proyecto en Firestore.
 *
 * @param project Datos del proyecto a persistir.
 * @returns ID generado automáticamente por Firestore.
 */
export const createProject = async (project: any) => {
  const docRef = await addDoc(projectsRef, project);

  return docRef.id;
};

/**
 * Obtiene todos los proyectos almacenados
 * actualmente en Firestore.
 *
 * Cada documento se transforma para incluir
 * su ID dentro del objeto retornado.
 */
export const getProjects = async () => {
  const snapshot = await getDocs(projectsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};