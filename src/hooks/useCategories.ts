import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Category } from "../types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      setCategories(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addCategory = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const exists = categories.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) throw new Error("Ya existe una categoría con ese nombre.");
    await addDoc(collection(db, "categories"), { name: trimmed });
  };

  const deleteCategory = async (id: string, projectCount: number) => {
    if (projectCount > 0) {
      // Eliminar todos los proyectos de esa categoría
      const categoryName = categories.find((c) => c.id === id)?.name;
      if (!categoryName) return;
      const q = query(
        collection(db, "projects"),
        where("category", "==", categoryName)
      );
      const snapshot = await getDocs(q);
      const deletions = snapshot.docs.map((d) => deleteDoc(d.ref));
      await Promise.all(deletions);
    }
    await deleteDoc(doc(db, "categories", id));
  };

  return { categories, loading, addCategory, deleteCategory };
};