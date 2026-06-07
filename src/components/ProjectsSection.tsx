import React, { useState } from "react";
import { Project } from "../types";
import { createPortal} from "react-dom"
import { MapPin, Calendar, Layers, Landmark, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Divide into Featured (only 1) and Past Projects (the remaining ones)
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const listProjects = projects.filter((p) => p.id !== (featuredProject?.id || ""));

  const handleNextImage = (galleryImages: string[]) => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = (galleryImages: string[]) => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Editorial backdrop grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="max-w-[1400px] mx-auto h-full w-full border-x border-white/5 flex justify-between">
          <div className="border-r border-white/5 h-full w-1/4" />
          <div className="border-r border-white/5 h-full w-1/4" />
          <div className="border-r border-white/5 h-full w-1/4" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl text-left mb-16">
          <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#F27D26]"></span> Portfolio de Obra
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tighter text-white">
            Nuestros trabajos realizados con <span className="text-[#F27D26]">ingeniería pesada</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Explora las obras más ambiciosas construidas por Acercons en materia de galpones logísticos, naves industriales de proceso y montajes de alta resistencia mecánica en todo el territorio nacional.
          </p>
        </div>

        {/* ---------------- A) PROYECTO DESTACADO (CASE STUDY PANEL) ---------------- */}
        {featuredProject && (
          <div className="mb-20 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-[#F27D26] animate-ping" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F27D26]">
                Caso de Estudio Destacado / Especialidad Activa
              </h3>
            </div>

            {/* Featured Layout Card (No curved templates, crisp Editorial design) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
              
              {/* Cover highlighting outline */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#F27D26]" />

              {/* Case Study Left: Interactive Image Preview */}
              <div className="lg:col-span-7 flex flex-col justify-between relative group order-last lg:order-first">
                <div className="relative overflow-hidden rounded-none border border-white/10 bg-black aspect-[16/9]">
                  <img
                    src={featuredProject.images[activeImageIndex] || featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover select-none transition-transform duration-[6000ms] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Shading overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

                  {/* Left-Right Slider Controls */}
                  {featuredProject.images && featuredProject.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                      <button
                        onClick={() => handlePrevImage(featuredProject.images)}
                        className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                        title="Anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-white/90 font-mono bg-black/85 px-3 py-1 border border-white/15">
                        {activeImageIndex + 1} / {featuredProject.images.length}
                      </span>
                      <button
                        onClick={() => handleNextImage(featuredProject.images)}
                        className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                        title="Siguiente"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Interactive Expand button */}
                  <button
                    onClick={() => openProjectModal(featuredProject)}
                    className="absolute top-4 right-4 flex p-2.5 bg-[#F27D26] text-black hover:bg-orange-500 transition-colors duration-250 cursor-pointer"
                    title="Expandir ficha"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Micro Images Toggler Grid */}
                {featuredProject.images && featuredProject.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {featuredProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-16 rounded-none border overflow-hidden bg-black transition-all ${
                          activeImageIndex === index
                            ? "border-[#F27D26] ring-1 ring-[#F27D26] scale-95"
                            : "border-white/10 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt="Thumbnail step"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Case Study Right: Project Technical details */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-[#F27D26] uppercase tracking-widest bg-[#F27D26]/10 px-2.5 py-1 border border-[#F27D26]/30 inline-block rounded-none">
                    {featuredProject.category}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-none">
                    {featuredProject.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {featuredProject.description}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed italic bg-black p-4 border border-white/5 rounded-none">
                    "{featuredProject.fullDescription.slice(0, 180)}..."
                  </p>
                </div>

                {/* Specs Box Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-none">
                    <MapPin className="w-4 h-4 text-[#F27D26] shrink-0" />
                    <div className="text-left">
                      <div className="text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        Ubicación
                      </div>
                      <div className="text-xs text-white/95 font-semibold line-clamp-1">
                        {featuredProject.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-none">
                    <Calendar className="w-4 h-4 text-[#F27D26] shrink-0" />
                    <div className="text-left">
                      <div className="text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        Año Conclusión
                      </div>
                      <div className="text-xs text-white/95 font-semibold">
                        {featuredProject.year}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-none">
                    <Layers className="w-4 h-4 text-[#F27D26] shrink-0" />
                    <div className="text-left">
                      <div className="text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        Superficie
                      </div>
                      <div className="text-xs text-white/95 font-semibold">
                        {featuredProject.area}
                      </div>
                    </div>
                  </div>

                  {featuredProject.steelWeight && (
                    <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-none">
                      <Landmark className="w-4 h-4 text-[#F27D26] shrink-0" />
                      <div className="text-left">
                        <div className="text-[9px] text-white/40 uppercase font-bold tracking-widest">
                          Acero Configurado
                        </div>
                        <div className="text-xs font-bold text-[#F27D26]">
                          {featuredProject.steelWeight}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Trigger button */}
                <div className="pt-2">
                  <button
                    onClick={() => openProjectModal(featuredProject)}
                    className="w-full sm:w-auto py-3 px-6 text-center bg-[#F27D26] text-black font-black text-xs uppercase tracking-widest hover:bg-orange-500 rounded-none transition-all cursor-pointer"
                  >
                    Ver Caso de Estudio Completo
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ---------------- B) PROYECTOS ANTERIORES ---------------- */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-16 text-left">
            <h4 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Proyectos Realizados Adicionales
            </h4>
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">
              Base de Datos: {listProjects.length} Registros de Obra
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className="group cursor-pointer bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden hover:border-[#F27D26]/40 transition-all duration-300 text-left"
              >
                {/* Visual Image container with orange glow bar */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-all duration-[2000ms]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle orange cover shade indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Inner small tag */}
                  <span className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-widest text-[#F27D26] bg-black border border-[#F27D26]/30 px-2.5 py-1 rounded-none">
                    {project.category}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h5 className="font-extrabold text-sm uppercase tracking-tight text-white group-hover:text-[#F27D26] transition-colors line-clamp-1">
                      {project.title}
                    </h5>
                    <p className="text-xs text-white/60 mt-1.5 h-12 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Micro list of project specs */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[9px] text-white/40 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                      {project.location.split(",")[0] || project.location}
                    </span>
                    <span className="text-[#F27D26]">{project.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- FULL SCREEN PREMIUM MODAL CASE STUDY DYNAMIC (EDITORIAL REDESIGN) ---------------- */}
        {selectedProject && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
            <div
              className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 lg:p-10 shadow-2xl focus:outline-none my-8"
              style={{
                boxShadow: "0 30px 60px rgba(0,0,0,0.9)",
              }}
            >
              {/* Highlight top border line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[#F27D26]" />

              {/* Header block with close option */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 border-b border-white/10 pb-6 text-left">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 border border-[#F27D26]/20">
                    INGENIERÍA CIVIL CONFORME A OBRA • {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="self-end sm:self-start p-2.5 rounded-none bg-black hover:bg-white/5 border border-white/10 text-white/60 hover:text-white font-black text-xs uppercase tracking-widest cursor-pointer flex items-center gap-1"
                >
                  <X className="w-4 h-4 text-[#F27D26]" /> Cerrar
                </button>
              </div>

              {/* Main Content split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8All">
                
                {/* Images column left */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-4 text-left">
                  <div className="relative rounded-none overflow-hidden border border-white/10 bg-black aspect-[16/10]">
                    <img
                      src={selectedProject.images[activeImageIndex] || selectedProject.image}
                      alt="Project Large Detail view"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <button
                          onClick={() => handlePrevImage(selectedProject.images)}
                          className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-white/90 font-mono bg-black/85 px-3 py-1.5 border border-white/15">
                          {activeImageIndex + 1} / {selectedProject.images.length}
                        </span>
                        <button
                          onClick={() => handleNextImage(selectedProject.images)}
                          className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail indicator track */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-thin">
                      {selectedProject.images.map((thumb, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-20 h-14 shrink-0 rounded-none overflow-hidden border transition-all ${
                            activeImageIndex === idx ? "border-[#F27D26] scale-95" : "border-white/10 opacity-50"
                          }`}
                        >
                          <img
                            src={thumb}
                            alt="thumb"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs column right */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">
                      Ficha Analítica de Obra
                    </h4>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed bg-black/40 p-4 border border-white/5 rounded-none">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Core Technical Table */}
                  <div className="space-y-2 bg-black/50 border border-white/10 rounded-none p-4 w-full">
                    <h5 className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                      Especificaciones de Construcción
                    </h5>
                    <div className="divide-y divide-white/5">
                      <div className="flex justify-between py-2.5 text-xs">
                        <span className="text-white/40">Ubicación Geográfica:</span>
                        <span className="text-white/90 font-bold">{selectedProject.location}</span>
                      </div>
                      <div className="flex justify-between py-2.5 text-xs">
                        <span className="text-white/40">Superficie Cubierta:</span>
                        <span className="text-white/90 font-bold">{selectedProject.area}</span>
                      </div>
                      <div className="flex justify-between py-2.5 text-xs">
                        <span className="text-white/40">Año Conclusión:</span>
                        <span className="text-white/90 font-bold">{selectedProject.year}</span>
                      </div>
                      {selectedProject.steelWeight && (
                        <div className="flex justify-between py-2.5 text-xs">
                          <span className="text-white/40">Acero Estructural:</span>
                          <span className="text-[#F27D26] font-extrabold">{selectedProject.steelWeight}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2.5 text-xs items-center">
                        <span className="text-white/40">Código de Soldadura:</span>
                        <span className="text-[10px] bg-black border border-white/10 px-2 py-0.5 font-bold uppercase tracking-wider text-white">
                          AWS D1.1 MIG
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action group bottom of sheet */}
                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-5 py-2.5 bg-black hover:bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/70 rounded-none cursor-pointer"
                    >
                      Volver
                    </button>
                    <a
                      href="#contact"
                      onClick={() => {
                        setSelectedProject(null);
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-5 py-2.5 text-center bg-[#F27D26] text-black text-xs font-black uppercase tracking-widest rounded-none shadow-md cursor-pointer"
                    >
                      Consultar Obra
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
