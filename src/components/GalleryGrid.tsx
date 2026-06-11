import React, { useState } from "react";
import {createPortal} from "react-dom";
import { Eye, Hammer, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Project } from "../types";

interface GalleryGridProps {
  projects: Project[];
}

interface GalleryItem {
  id: string;
  category: "estructuras" | "galpones" | "montaje" | "soldadura";
  title: string;
  location: string;
  image: string;
  size: "small" | "large" | "medium";
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);


    // IDs de los proyectos hardcodeados en initialData (para no duplicar)
const staticIds = new Set(["proj-1", "proj-2", "proj-3", "proj-4"]); 
// → ajustá estos IDs a los que tengas en initialData.ts

// Mapea el category string de Project al union type de GalleryItem
const mapCategory = (cat: string): GalleryItem["category"] => {
  if (cat.toLowerCase().includes("galpón") || cat.toLowerCase().includes("galpon")) return "galpones";
  if (cat.toLowerCase().includes("montaje")) return "montaje";
  if (cat.toLowerCase().includes("soldadura")) return "soldadura";
  return "estructuras"; // default
};

   const projectItems: GalleryItem[] = projects
    .filter((p) => !staticIds.has(p.id)) // evita duplicar los hardcodeados
    .map((p, i) => ({
      id: p.id,
      category: mapCategory(p.category),
      title: p.title,
      location: p.location,
      image: p.image,
      size: (["small", "medium", "large"] as const)[i % 3],
    }));

    
  // Curated imagery using our high quality AI photos plus specific industrial placeholder references
  const items: GalleryItem[] = [
    {
      id: "gal-1",
      category: "galpones",
      title: "Obras de Galpón",
      location: "Zárate, Buenos Aires",
      image: "/images/cartel.webp",
      size: "large",
    },
    {
      id: "gal-2",
      category: "estructuras",
      title: "portones metalicos",
      location: "Campana, Buenos Aires",
      image: "/images/frente.webp",
      size: "medium",
    },
    {
      id: "gal-3",
      category: "soldadura",
      title: "escaleras metalicas",
      location: "San Martín, GBA",
      image: "/images/escaleras.webp",
      size: "medium",
    },
    {
      id: "gal-4",
      category: "montaje",
      title: "Izaje de Columnas",
      location: "Rosario, Santa Fe",
      image: "/images/balcon.webp",
      size: "large",
    },
    {
      id: "gal-5",
      category: "estructuras",
      title: "Pórticos Metálicos",
      location: "Bahía Blanca, Buenos Aires",
      image: "/images/estructura.webp",
      size: "small",
    }
    
  ];

    const allItems = [...projectItems, ...items];

  const categories = [
    { value: "todos", label: "Ver Todo" },
    { value: "estructuras", label: "Estructuras Metálicas" },
    { value: "galpones", label: "Construcción de Galpones" },
    { value: "montaje", label: "Montajes de Obra" },
    { value: "soldadura", label: "Soldaduras AWS" },
  ];



  const filteredItems = filter === "todos" ? allItems : allItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-left max-w-xl">
            <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#F27D26]"></span> Registro Visual
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tighter">
              Galería de <span className="text-[#F27D26]">Detalles Industriales</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Registros fotográficos reales tomados durante las etapas críticas de armado en taller y montaje final con grúas de gran tonelaje.
            </p>
          </div>

          {/* Filtering buttons (Razor sharp rounded-none option) */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-none transition-all cursor-pointer ${
                  filter === cat.value
                    ? "bg-[#F27D26] text-black shadow-lg shadow-orange-500/10"
                    : "bg-black text-white/60 hover:text-white border border-white/10 hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic masonry like structural bento grid representational */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {filteredItems.map((item, index) => {
            const sizeClass =
              item.size === "large"
                ? "lg:col-span-2 lg:row-span-2"
                : item.size === "medium"
                ? "lg:col-span-1 lg:row-span-2"
                : "lg:col-span-1 lg:row-span-1";

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-none border border-white/5 bg-black cursor-pointer ${sizeClass}`}
              >
                {/* Image element with cover tag */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Info Text Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-left space-y-1.5 z-20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-black bg-[#F27D26] px-2.5 py-0.5 rounded-none">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-white line-clamp-1 group-hover:text-[#F27D26] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-white/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#F27D26]" />
                    {item.location}
                  </p>
                </div>

                {/* Floating zoom indicator and status visual trigger */}
                <div className="absolute top-5 right-5 p-2 bg-black border border-white/10 rounded-none text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Maximize2 className="w-3.5 h-3.5 text-[#F27D26]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Lightbox overlay slider */}
        {lightboxIndex !== null && createPortal (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-md animate-in fade-in duration-200">
            {/* Close control button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2.5 rounded-none bg-black text-white/70 hover:text-white border border-white/10 text-xs font-black uppercase tracking-widest cursor-pointer flex items-center gap-1"
            >
              <X className="w-4 h-4 text-[#F27D26]" /> Cerrar
            </button>

            {/* Navigation Left */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length)}
              className="absolute left-6 p-4 rounded-none bg-black/80 text-white border border-white/10 hover:text-[#F27D26] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Core Image view */}
            <div className="max-w-4xl max-h-[75vh] flex flex-col items-center">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[65vh] object-contain rounded-none border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-5 text-center space-y-1.5 max-w-md">
                <span className="text-[10px] font-mono text-black font-extrabold uppercase tracking-widest bg-[#F27D26] px-2 py-0.5 rounded-none">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="text-lg font-bold uppercase tracking-tight text-white">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-xs text-white/50">
                  Ubicación de obra: {filteredItems[lightboxIndex].location}
                </p>
              </div>
            </div>

            {/* Navigation Right */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev! + 1) % filteredItems.length)}
              className="absolute right-6 p-4 rounded-none bg-black/80 text-white border border-white/10 hover:text-[#F27D26] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
