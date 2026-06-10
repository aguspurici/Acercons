import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutUs } from "./components/AboutUs";
import { ServicesList } from "./components/ServicesList";
import { ProjectsSection } from "./components/ProjectsSection";
import { HowWeWork } from "./components/HowWeWork";
import { GalleryGrid } from "./components/GalleryGrid";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import WhatsappFloating from "./components/WhatsappFloating";
import { initialProjects } from "./initialData";
import { Project } from "./types";
import { Hammer, CircleAlert } from "lucide-react";

// TEST DE GIT
//import firebase
import { createProject, getProjects } from "./services/project.service";

export default function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add project state synchronizer
  const handleAddProject = (newProj: Project) => {
    setProjects((prev) => {
      const withoutFeatured = prev.map((p) => ({ ...p, featured: false }));
      return [{ ...newProj, featured: true }, ...withoutFeatured];
    });
  };

  // Delete project state synchronizer
  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Scroll to top on toggling view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isAdminView]);

  /**
 * Carga los proyectos almacenados en Firestore.
 *
 * Si la colección contiene documentos válidos,
 * reemplaza los proyectos mock de initialData.
 *
 * La validación sobre "images" evita que documentos
 * incompletos rompan componentes como ProjectsSection,
 * que dependen de la existencia de al menos una imagen.
 */
const loadProjects = async () => {
  try {
    const data = await getProjects();

    // Debug temporal para verificar la respuesta de Firestore.
    console.log("FIRESTORE DATA:", data);

    // Solo sincronizamos el estado cuando los documentos
    // poseen la estructura mínima esperada por la UI.
    if (data.length > 0 && data.every((p) => p.images)) {
      setProjects(data as Project[]);
    }
  } catch (error) {
    // Registro de errores de lectura desde Firestore.
    console.error(error);
  }
};

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div
      className={`font-sans min-h-screen transition-colors duration-500 selection:bg-[#F27D26]/30 ${
        isDarkMode
          ? "bg-[#0A0A0A] text-white selection:text-white"
          : "light-theme bg-[#F4F4F6] text-neutral-900 selection:text-neutral-900"
      }`}
    >
      {/* Structural guidelines helper grids */}
      <div
        className={`fixed inset-y-0 left-1/4 w-px pointer-events-none z-0 hidden md:block transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-neutral-900/[0.04]"}`}
      />
      <div
        className={`fixed inset-y-0 left-1/2 w-px pointer-events-none z-0 hidden md:block transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-neutral-900/[0.04]"}`}
      />
      <div
        className={`fixed inset-y-0 left-3/4 w-px pointer-events-none z-0 hidden md:block transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-neutral-900/[0.04]"}`}
      />

      {/* Global Navbar */}
      <Navbar
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {isAdminView ? (
        /* ADMIN PANEL INTERACTIVE MOCKUP VIEW */
        <div className="animate-in fade-in duration-300">
          <AdminPanel
            projects={projects}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
            onCloseAdmin={() => setIsAdminView(false)}
          />
        </div>
      ) : (
        /* MAIN LANDING EXPERIENCE (PREMIUM DESIGN) */
        <div className="relative z-10 select-none">
          {/* 1. Hero banner */}
          <Hero
            onNavigate={handleNavigate}
            onOpenAdmin={() => setIsAdminView(true)}
            isDarkMode={isDarkMode}
          />
          {/* 2. Trayectoria y Sobre Nosotros */}
          <AboutUs />
          {/* 3. Servicios en Cards Premium */}
          <ServicesList />
          {/* 4. Portfolio y Trabajos Realizados */}
          <ProjectsSection projects={projects} />
          {/* 5. Cómo Trabajamos (Timeline) */}
          <HowWeWork />
          {/* 6. Galería de Detalles */}
          <GalleryGrid projects={projects} />
          {/* 7. Contacto e Ingeniería */}
          <ContactForm />
          {/* 8. Footer */}
          <Footer onNavigate={handleNavigate} />
          <WhatsappFloating />
        </div>
      )}
    </div>
  );
}
