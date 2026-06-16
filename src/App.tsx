import { Routes, Route } from "react-router-dom";
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
import { LoginPage } from "./components/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useProjects } from "./hooks/useProjects";
import { Project } from "./types";

function LandingPage() {
  const { projects, loading } = useProjects();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className={`font-sans min-h-screen transition-colors duration-500 selection:bg-[#F27D26]/30 ${
        isDarkMode
          ? "bg-[#0A0A0A] text-white selection:text-white"
          : "light-theme bg-[#F4F4F6] text-neutral-900 selection:text-neutral-900"
      }`}
    >
      <div
        className={`fixed inset-y-0 left-1/4 w-px pointer-events-none z-0 hidden md:block transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-neutral-900/[0.04]"}`}
      />
      <div
        className={`fixed inset-y-0 left-1/2 w-px pointer-events-none z-0 hidden md:block transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-neutral-900/[0.04]"}`}
      />
      <div
        className={`fixed inset-y-0 left-3/4 w-px pointer-events-none z-0 hidden md:block transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-neutral-900/[0.04]"}`}
      />

      <Navbar
        isAdminView={false}
        setIsAdminView={() => {}}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="relative z-10 select-none">
        <Hero
          onNavigate={handleNavigate}
          onOpenAdmin={() => {}}
          isDarkMode={isDarkMode}
        />
        <AboutUs />
        <ServicesList />
        <ProjectsSection projects={projects} />
        <HowWeWork />
        <GalleryGrid projects={projects} />
        <ContactForm />
        <Footer onNavigate={handleNavigate} />
        <WhatsappFloating />
      </div>
    </div>
  );
}

function AdminPage() {
  const { projects, addProject, deleteProject, updateProject } = useProjects();

 const handleAddProject = async (proj: Project) => {
  const { id, ...rest } = proj;
  
  // Quitar featured de todos los proyectos existentes
  const updates = projects.map((p) =>
    updateProject(p.id, { featured: false })
  );
  await Promise.all(updates);

  // Agregar el nuevo como featured
  await addProject({ ...rest, featured: true });
};
  
  const handleDeleteProject = async (id: string) => {
  await deleteProject(id);
};

 const handleUpdateProject = async (id: string, data: Partial<Project>) => {
  await updateProject(id, data);
};

return (
  <AdminPanel
    projects={projects}
    onAddProject={handleAddProject}
    onDeleteProject={handleDeleteProject}
    onUpdateProject={handleUpdateProject}
    onCloseAdmin={() => {}}
  />
);
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
