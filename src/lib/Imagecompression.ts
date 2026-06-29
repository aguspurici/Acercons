/**
 * Redimensiona y comprime una imagen en el navegador antes de subirla,
 * para que las fotos de obra (a veces de 2-3MB y muy alta resolución)
 * pesen menos y carguen/decodifiquen más rápido en el sitio público.
 *
 * - Reduce el lado más largo a un máximo de 1920px (mantiene proporción).
 * - Reexporta como JPEG con calidad 0.8 (buen balance peso/calidad).
 * - Si por algún motivo falla la compresión, devuelve el archivo original
 *   para no bloquear la subida.
 */
const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.8;

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    // Si no es una imagen rasterizable conocida (ej. ya es muy chica),
    // igual pasamos por el mismo proceso; canvas la maneja bien.
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        // No se pudo obtener el contexto del canvas: devolvemos el original.
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.(png|jpe?g|webp|heic)$/i, ".jpg"),
            { type: "image/jpeg" },
          );
          resolve(compressedFile);
        },
        "image/jpeg",
        JPEG_QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Si la imagen no pudo cargarse para procesar, subimos el original.
      resolve(file);
    };

    img.src = objectUrl;
  });
};