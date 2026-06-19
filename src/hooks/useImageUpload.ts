import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../lib/firebase";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setError(null);

    // Validaciones
    if (!file.type.startsWith("image/")) {
      const msg = "El archivo debe ser una imagen.";
      setError(msg);
      throw new Error(msg);
    }

    if (file.size > 5 * 1024 * 1024) {
      const msg = "La imagen no puede superar los 5MB.";
      setError(msg);
      throw new Error(msg);
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const storageRef = ref(storage, `projects/${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (err) {
      setError("Error al subir la imagen. Intentá de nuevo.");
      throw err;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const deleteImage = async (url: string) => {
    try {
      // Solo intenta borrar si es una URL de Firebase Storage
      if (url.includes("firebasestorage.googleapis.com")) {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
      }
    } catch (err) {
      // Si la imagen ya no existe, no rompemos el flujo
      console.warn("No se pudo eliminar la imagen:", err);
    }
  };

  return { uploadImage, deleteImage, uploading, progress, error };
};