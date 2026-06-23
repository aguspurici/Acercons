import React, { useState, useMemo } from "react";
import { Project, ProjectCategory } from "../types";
import { ChevronLeft, ChevronRight, FolderOpen, ArrowLeft } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
}

interface CategoryFolder {
  category: ProjectCategory;
  coverImage: string;
  count: number;
  projects: Project[];
}

// Card individual de un proyecto: foto grande (con carrusel si tiene
// más de una imagen) + título + descripción. Sin specs técnicas, sin click.
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = project.images && project.images.length > 0 ? project.images : [project.image];

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

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [openFolder, setOpenFolder] = useState<ProjectCategory | null>(null);

  // Agrupa los proyectos por categoría. Solo se incluyen categorías
  // que ya tengan al menos un proyecto cargado.
  const folders: CategoryFolder[] = useMemo(() => {
    const groups = new Map<ProjectCategory, Project[]>();

    projects.forEach((project) => {
      const list = groups.get(project.category) || [];
      list.push(project);
      groups.set(project.category, list);
    });

    return Array.from(groups.entries()).map(([category, projectList]) => ({
      category,
      coverImage: projectList[0]?.image || "",
      count: projectList.length,
      projects: projectList,
    }));
  }, [projects]);

  const activeFolder = folders.find((f) => f.category === openFolder) || null;

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

        {/* ---------------- VISTA DE CARPETAS POR CATEGORÍA ---------------- */}
        {!activeFolder && (
          <div className="space-y-8">
            {folders.length === 0 ? (
              <p className="text-sm text-white/40 text-center py-16">
                Todavía no hay proyectos cargados en el portfolio.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder) => (
                  <button
                    key={folder.category}
                    onClick={() => setOpenFolder(folder.category)}
                    className="group text-left bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden hover:border-[#F27D26]/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      <img
                        src={folder.coverImage}
                        alt={folder.category}
                        className="w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-all duration-[2000ms]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/85 border border-white/15 px-3 py-1.5">
                        <FolderOpen className="w-3.5 h-3.5 text-[#F27D26]" />
                        <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">
                          {folder.count} {folder.count === 1 ? "Obra" : "Obras"}
                        </span>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5">
                        <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight group-hover:text-[#F27D26] transition-colors">
                          {folder.category}
                        </h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

<<<<<<< HEAD
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
                      {project.location?.split(",")[0] || project.location || "Córdoba"}
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
=======
        {/* ---------------- VISTA DENTRO DE LA CARPETA: LISTA VERTICAL DE PROYECTOS ---------------- */}
        {activeFolder && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 text-left">
              <div className="flex items-center gap-4">
>>>>>>> 79a70c20ad49ec03838caa805b924def174b32ad
                <button
                  onClick={() => setOpenFolder(null)}
                  className="p-2.5 bg-black hover:bg-white/5 border border-white/10 text-white/60 hover:text-[#F27D26] transition-colors cursor-pointer"
                  title="Volver a categorías"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-bold text-[#F27D26] uppercase tracking-widest">
                    Categoría
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    {activeFolder.category}
                  </h4>
                </div>
              </div>
              <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider hidden sm:block">
                {activeFolder.count} Registros de Obra
              </span>
            </div>

            <div className="max-w-3xl mx-auto space-y-10">
              {activeFolder.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};