import React, { useMemo, useRef, useCallback, useEffect } from "react";
import { Project } from "../types";

interface GallerySectionProps {
  projects: Project[];
}

interface GalleryItem {
  src: string;
  label: string;
  key: string;
}

// Algunos proyectos viejos pueden no tener createdAt (campo no tipado en
// Project), así que lo leemos de forma segura sin romper el tipado.
const getCreatedAtMillis = (project: Project): number => {
  const raw = (project as unknown as { createdAt?: { seconds?: number } }).createdAt;
  return raw?.seconds ? raw.seconds * 1000 : 0;
};

export const GallerySection: React.FC<GallerySectionProps> = ({ projects }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  // Arma la lista plana de imágenes (image + images[]) a partir de los
  // proyectos, ordenando por fecha de creación (más nuevo primero) y
  // evitando duplicar la portada si ya está dentro de images[].
  const items: GalleryItem[] = useMemo(() => {
    const sorted = [...projects].sort(
      (a, b) => getCreatedAtMillis(b) - getCreatedAtMillis(a)
    );

    const result: GalleryItem[] = [];

    sorted.forEach((project) => {
      const allImages =
        project.images && project.images.length > 0
          ? project.images
          : [project.image];

      allImages.forEach((src, index) => {
        if (!src) return;
        result.push({
          src,
          label: project.category,
          key: `${project.id}-${index}`,
        });
      });
    });

    return result;
  }, [projects]);

  // Para el loop infinito visual, duplicamos la lista una vez. El scroll
  // automático recorre el primer set y al llegar al final salta sin
  // transición al mismo punto del set duplicado (efecto cinta sin fin).
  const loopItems = useMemo(() => [...items, ...items], [items]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartLeft.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
    trackRef.current.style.scrollBehavior = "auto";
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartLeft.current - delta;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.releasePointerCapture(e.pointerId);
    trackRef.current.style.scrollBehavior = "auto";
  }, []);

  // Autoplay tipo cinta: mueve scrollLeft de a poco en cada frame.
  // Se pausa mientras el usuario arrastra o tiene el mouse encima.
  // Como loopItems es items duplicado, al pasar la mitad del scroll
  // saltamos al inicio sin transición para que el loop sea invisible.
  const isHovering = useRef(false);

  useEffect(() => {
    if (items.length === 0) return;
    let frameId: number;

    const tick = () => {
      const track = trackRef.current;
      if (track && !isDragging.current && !isHovering.current) {
        track.scrollLeft += 0.6;
        const halfWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [items.length]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback((e: React.PointerEvent) => {
    isHovering.current = false;
    handlePointerUp(e);
  }, [handlePointerUp]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-4 max-w-3xl text-left mb-16">
          <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#F27D26]"></span> Galería
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tighter text-white">
            Calidad en cada<span className="text-[#F27D26]"> estructura</span>
          </h2>

        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="gallery-track flex gap-3 overflow-x-auto cursor-grab active:cursor-grabbing select-none px-4 sm:px-6 lg:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.key}-${index}`}
            className="relative shrink-0 w-[200px] sm:w-[260px] aspect-[3/4] bg-black overflow-hidden border border-white/10"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-3 text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .gallery-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};