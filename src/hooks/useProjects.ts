import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Project } from "../types";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addProject = async (project: Omit<Project, "id">) => {
    await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: serverTimestamp(),
    });
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    await updateDoc(doc(db, "projects", id), data);
  };

  return { projects, loading, addProject, deleteProject, updateProject };
};