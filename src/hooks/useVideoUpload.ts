import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../lib/firebase";

export const useVideoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Límite de tamaño: 500MB (generoso para videos)
  const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024;
  
  // Formatos soportados
  const SUPPORTED_FORMATS = ["video/mp4", "video/webm", "video/quicktime"];

  const uploadVideo = (
    file: File,
    onProgress: (pct: number) => void,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      setError(null);

      // Validaciones
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        const msg = "Formato no soportado. Usa MP4, WebM o MOV.";
        setError(msg);
        reject(new Error(msg));
        return;
      }

      if (file.size > MAX_VIDEO_SIZE_BYTES) {
        const msg = `El video no puede superar los 500MB. Tu archivo pesa ${(file.size / (1024 * 1024)).toFixed(1)}MB.`;
        setError(msg);
        reject(new Error(msg));
        return;
      }

      setUploading(true);

      const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.name.replace(/\s+/g, "-")}`;
      const storageRef = ref(storage, `projects/videos/${uniqueName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          onProgress(pct);
        },
        (uploadError) => {
          setError("Error al subir el video. Intentá de nuevo.");
          setUploading(false);
          reject(uploadError);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            setProgress(0);
            resolve(url);
          } catch (err) {
            setError("Error al obtener URL del video.");
            setUploading(false);
            reject(err);
          }
        },
      );
    });
  };

  const deleteVideo = async (url: string) => {
    try {
      if (url.includes("firebasestorage.googleapis.com")) {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
      }
    } catch (err) {
      console.warn("No se pudo eliminar el video:", err);
    }
  };

  return { uploadVideo, deleteVideo, uploading, progress, error };
};