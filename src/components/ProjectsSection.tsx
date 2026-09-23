import React, { useState, useMemo, useEffect } from "react";
import { Project } from "../types";
import { ChevronLeft, ChevronRight, FolderOpen, ArrowLeft, X, Play } from "lucide-react";
import { Pagination } from "./pagination";

interface ProjectsSectionProps {
  projects: Project[];
}

interface CategoryFolder {
    category: string;
  coverImage: string;
  count: number;
  projects: Project[];
}

// Modal para reproducir video
const VideoModal: React.FC<{ videoUrl: string; onClose: () => void }> = ({
  videoUrl,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative h-150 w-full max-w-xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors z-10 flex items-center gap-2 text-xs font-bold uppercase"
          aria-label="Cerrar modal de video"
        >
          <X className="w-5 h-5" />
          CERRAR
        </button>
        <video
          src={videoUrl}
          controls
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// Card individual de un proyecto: fotos en carrusel + videos mezclados + título + descripción
const ProjectCard: React.FC<{ project: Project; onPlayVideo: (url: string) => void }> = ({ 
  project, 
  onPlayVideo 
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [videoLoadingIndex, setVideoLoadingIndex] = useState<number | null>(null);
  const [playedVideoIndexes, setPlayedVideoIndexes] = useState<Set<number>>(new Set());
  
  // Combinar imágenes y videos en un solo array
  // Si no hay imágenes pero hay videos, videos van primero
  const images = project.images && project.images.length > 0 ? project.images : [];
  const videos = project.videos || [];
  const allMedia = images.length > 0 ? [...images, ...videos] : [...videos, ...images];

  // Precarga en segundo plano todas las fotos
  useEffect(() => {
    images.forEach((src) => {
      const preloadImg = new Image();
      preloadImg.src = src;
    });
  }, [images]);

  // Preload de videos
  useEffect(() => {
    videos.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [videos]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const isCurrentVideo = activeMediaIndex >= images.length;
  const currentVideoUrl = isCurrentVideo && allMedia[activeMediaIndex] ? allMedia[activeMediaIndex] : null;
  const isVideoPaused = isCurrentVideo && playedVideoIndexes.has(activeMediaIndex);

  const handleVideoEnded = () => {
    const newSet = new Set(playedVideoIndexes);
    newSet.add(activeMediaIndex);
    setPlayedVideoIndexes(newSet);
  };

  const handleReplayVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(playedVideoIndexes);
    newSet.delete(activeMediaIndex);
    setPlayedVideoIndexes(newSet);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden shadow-xl text-left">
      <div className="relative aspect-[16/9] bg-black overflow-hidden group cursor-pointer">
        {isCurrentVideo && currentVideoUrl ? (
          <>
            {videoLoadingIndex === activeMediaIndex && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-[#F27D26] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!isVideoPaused ? (
              <>
                {/* Indicador de video */}
                <div className="absolute top-4 left-4 bg-[#F27D26] text-black px-2 py-1 text-[10px] font-bold uppercase rounded-none z-10">
                  Video
                </div>

                {/* Video reproduciéndose */}
                <video
                  key={currentVideoUrl}
                  src={currentVideoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  onEnded={handleVideoEnded}
                  onLoadStart={() => setVideoLoadingIndex(activeMediaIndex)}
                  onCanPlay={() => setVideoLoadingIndex(null)}
                />

                {/* Botón AMPLIAR solo mientras se reproduce */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayVideo(currentVideoUrl);
                  }}
                  className="absolute top-4 right-4 bg-[#F27D26] text-black px-3 py-1.5 rounded-none hover:bg-orange-500 transition-colors text-xs font-bold"
                  aria-label="Ampliar video en modal"
                >
                  AMPLIAR
                </button>
              </>
            ) : (
              // Video pausado - mostrar overlay con botón de reproducción
              <div className="w-full h-full bg-black/60 flex items-center justify-center">
                <button
                  onClick={handleReplayVideo}
                  className="flex items-center gap-3 px-6 py-3 bg-[#F27D26] text-black font-bold uppercase text-sm hover:bg-orange-500 transition-colors"
                  aria-label="Reproducir video nuevamente"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Reproducir nuevamente
                </button>
              </div>
            )}
          </>
        ) : (
          <img
            src={allMedia[activeMediaIndex]}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {allMedia.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handlePrev}
              className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
              title="Anterior"
              aria-label="Ir a media anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/90 font-mono bg-black/85 px-3 py-1 border border-white/15">
              {activeMediaIndex + 1} / {allMedia.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 bg-black/85 border border-white/15 text-white/70 hover:text-[#F27D26] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
              title="Siguiente"
              aria-label="Ir a siguiente media"
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
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const PROJECTS_PER_PAGE = 4;

  // Agrupa los proyectos por categoría
  const folders: CategoryFolder[] = useMemo(() => {
    const groups = new Map<string, Project[]>();

    projects.forEach((project) => {
      const list = groups.get(project.category) || [];
      list.push(project);
      groups.set(project.category, list);
    });

    return Array.from(groups.entries()).map(([category, projectList]) => {
      const firstProject = projectList[0];
      // Si primer proyecto tiene imagen, usar esa. Si no, usar primer video si existe
      const coverImage = firstProject?.image && firstProject.image.trim().length > 0 
        ? firstProject.image 
        : (firstProject?.videos && firstProject.videos.length > 0 ? firstProject.videos[0] : "");
      
      return {
        category,
        coverImage,
        count: projectList.length,
        projects: projectList,
      };
    });
  }, [projects]);

  const activeFolder = folders.find((f) => f.category === openFolder) || null;

  const handleOpenFolder = (category: string) => {
    setOpenFolder(category);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleCloseFolder = () => {
    setOpenFolder(null);
    setSelectedCategory("Todos");
    setCurrentPage(1);
  };

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
            <span className="w-8 h-[1px] bg-[#F27D26]"></span> Portafolio de Obra
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tighter text-white">
            Nuestros proyectos 
            <span className="text-[#F27D26]"> más destacados</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Explora las obras más ambiciosas construidas por Acercons en materia de galpones logísticos, naves industriales de proceso y montajes de alta resistencia mecánica en todo el territorio nacional.
          </p>
        </div>

        {/* VISTA DE CARPETAS POR CATEGORÍA */}
        {!activeFolder && (
          <div className="space-y-8">
            {folders.length === 0 ? (
              <p className="text-sm text-white/40 text-center py-16">
                Todavía no hay proyectos cargados en el portafolio.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder) => {
                  const isVideo = folder.coverImage && (folder.coverImage.endsWith('.mp4') || folder.coverImage.endsWith('.webm') || folder.coverImage.endsWith('.mov') || folder.coverImage.includes('video'));
                  const hasContent = folder.coverImage && folder.coverImage.trim().length > 0;
                  
                  return (
                    <button
                      key={folder.category}
                      onClick={() => handleOpenFolder(folder.category)}
                      className="group text-left bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden hover:border-[#F27D26]/40 transition-all duration-300 cursor-pointer"
                      aria-label={`Abrir categoría ${folder.category}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-black">
                        {hasContent ? (
                          <>
                            {isVideo ? (
                              <>
                                <video
                                  src={folder.coverImage}
                                  className="w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-all duration-[2000ms]"
                                  muted
                                  autoPlay
                                  loop
                                />
                             
                              </>
                            ) : (
                              <img
                                src={folder.coverImage}
                                alt={folder.category}
                                className="w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-all duration-[2000ms]"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-black/40 flex items-center justify-center">
                            <span className="text-white/40 text-sm">Sin contenido</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 " />

                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/85 border border-white/15 px-3 py-1.5">
                          <FolderOpen className="w-3.5 h-3.5 text-[#F27D26]" />
                          <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">
                            {folder.count} {folder.count === 1 ? "Obra" : "Obras"}
                          </span>
                        </div>

                        <div className="absolute bottom-0 inset-x-0 p-5">
                          <h3 className="text-lg sm:text-xl font-black uppercase !text-white tracking-tight group-hover:text-[#F27D26] transition-colors">
                            {folder.category}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VISTA DENTRO DE LA CARPETA */}
        {activeFolder && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 text-left">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCloseFolder}
                  className="p-2.5 bg-black hover:bg-white/5 border border-white/10 text-white/60 hover:text-[#F27D26] transition-colors cursor-pointer"
                  title="Volver a categorías"
                  aria-label="Volver a vista de categorías"
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

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("Todos");
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 border text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === "Todos"
                    ? "bg-[#F27D26] border-[#F27D26] text-white"
                    : "bg-black border-white/10 text-white/50 hover:text-white hover:border-[#F27D26]/60"
                }`}
                aria-label="Ver todos los proyectos de la categoría"
              >
                Todos
              </button>

              {folders.map((folder) => (
                <button
                  key={folder.category}
                  onClick={() => {
                    setSelectedCategory(folder.category);
                    setOpenFolder(folder.category);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2 border text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    selectedCategory === folder.category
                      ? "bg-[#F27D26] border-[#F27D26] text-white"
                      : "bg-black border-white/10 text-white/50 hover:text-white hover:border-[#F27D26]/60"
                  }`}
                  aria-label={`Ver proyectos de ${folder.category}`}
                >
                  {folder.category}
                </button>
              ))}
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {paginatedProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onPlayVideo={setSelectedVideoUrl}
                />
              ))}
            </div>

            <div className="max-w-5xl mx-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}

      </div>

      {/* Modal de video */}
      {selectedVideoUrl && (
        <VideoModal videoUrl={selectedVideoUrl} onClose={() => setSelectedVideoUrl(null)} />
      )}
    </section>
  );
};