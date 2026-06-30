import React, { useState, useMemo, useEffect } from "react";
import { Project, ProjectCategory } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "./pagination";

interface ProjectsSectionProps {
  projects: Project[];
}

// Card individual de un proyecto: foto grande (con carrusel si tiene
// más de una imagen) + título + descripción. Sin specs técnicas, sin click.
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  // Precarga en segundo plano todas las fotos del proyecto (salvo la que
  // ya se está mostrando) para que el carrusel cambie de foto al instante.
  useEffect(() => {
    images.forEach((src) => {
      const preloadImg = new Image();
      preloadImg.src = src;
    });
  }, [images]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden shadow-xl text-left">
      <div className="relative aspect-[16/9] bg-black overflow-hidden">
        <img
          src={images[activeImageIndex]}
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handlePrev}
              className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/90 font-mono bg-black/85 px-3 py-1 border border-white/15">
              {activeImageIndex + 1} / {images.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-7 space-y-2">
        <h5 className="font-extrabold text-base sm:text-lg uppercase tracking-tight text-white">
          {project.title}
        </h5>
        <p className="text-sm text-white/65 leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "Todos"
  >("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 4;

const categories = useMemo(() => {
  return ["Todos", ...Array.from(new Set(projects.map((project) => project.category)))] as (
    | ProjectCategory
    | "Todos"
  )[];
}, [projects]);

const filteredProjects = useMemo(() => {
  if (selectedCategory === "Todos") return projects;

  return projects.filter((project) => project.category === selectedCategory);
}, [projects, selectedCategory]);

const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;

const paginatedProjects = useMemo(() => {
  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
}, [filteredProjects, currentPage]);

  return (
    <section
      id="projects"
      className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden"
    >
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
            Nuestros proyectos
            <span className="text-[#F27D26]"> más destacados</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Explora las obras más ambiciosas construidas por Acercons en materia
            de galpones logísticos, naves industriales de proceso y montajes de
            alta resistencia mecánica en todo el territorio nacional.
          </p>
        </div>



<div className="space-y-8">
  <div className="flex flex-wrap gap-3">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
        className={`px-5 py-2 border text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
          selectedCategory === category
            ? "bg-[#F27D26] border-[#F27D26] text-white"
            : "bg-black border-white/10 text-white/50 hover:text-white hover:border-[#F27D26]/60"
        }`}
      >
        {category}
      </button>
    ))}
  </div>

  {filteredProjects.length === 0 ? (
    <p className="text-sm text-white/40 text-center py-16">
      Todavía no hay proyectos cargados en esta categoría.
    </p>
  ) : (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  )}
</div>
      </div>
    </section>
  );
};
