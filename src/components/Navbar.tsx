import React, { useState } from "react";
import { Logo } from "./Logo";
import { Menu, X, LayoutDashboard, Send, Eye, Sun, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"

interface NavbarProps {
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdminView,
  setIsAdminView,
  onNavigate,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", target: "hero" },
    { label: "Nosotros", target: "about" },
    { label: "Servicios", target: "services" },
    { label: "Proyectos", target: "projects" },
    { label: "Proceso", target: "process" },
    { label: "Contacto", target: "contact" },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      setIsAdminView(false);
      // Wait a bit for React to switch view, then scroll
      setTimeout(() => {
        onNavigate(target);
      }, 100);
    } else {
      onNavigate(target);
    }
  };

  const whatsappBudgetUrl =
    "https://wa.me/543513853120?text=Hola,%20quisiera%20solicitar%20un%20presupuesto";

  const openWhatsappBudget = () => {
    window.open(whatsappBudgetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-xl transition-all duration-500 ${
      isDarkMode 
        ? "bg-[#0A0A0A]/95 border-white/10" 
        : "bg-white/95 border-neutral-200/80"
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div
            className="flex-shrink-0 cursor-pointer transition-transform duration-200"
            onClick={() => handleLinkClick("hero")}
          >
            <Logo size="lg" withPlate={false} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-widest font-semibold transition-colors duration-500 ${
            isDarkMode ? "text-white/60 text-white" : "text-neutral-600 font-bold"
          }`}>
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className={`border-b border-transparent hover:border-[#F27D26] pb-1 transition-all duration-200 cursor-pointer font-bold uppercase ${
                  isDarkMode ? "hover:text-[#F27D26] text-white/70" : "hover:text-[#F27D26] text-neutral-800"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Action Handles */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 border transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center ${
                isDarkMode
                  ? "bg-transparent text-white/80 border-white/20 hover:border-[#F27D26] hover:text-white"
                  : "bg-transparent text-neutral-800 border-neutral-300 hover:border-[#F27D26] hover:text-neutral-950"
              }`}
              title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F27D26]" /> : <Moon className="w-4 h-4 text-[#F27D26]" />}
            </button>

           

            {/* Quote Button */}
            <button
              onClick={openWhatsappBudget}
              className="px-6 py-2.5 bg-[#F27D26] border border-[#F27D26] text-black text-xs font-black uppercase tracking-widest rounded-none transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FaWhatsapp className="w-4 h-4 text-black" />
                Presupuesto
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            
            {/* Mobile theme toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-none border transition-colors ${
                isDarkMode
                  ? "bg-[#0A0A0A] text-white/60 border-white/10"
                  : "bg-white text-neutral-800 border-neutral-200"
              }`}
              title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F27D26]" /> : <Moon className="w-4 h-4 text-[#F27D26]" />}
            </button>

           

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                isDarkMode ? "text-white/80 hover:text-[#F27D26]" : "text-neutral-800 hover:text-[#F27D26]"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b animate-in fade-in-50 duration-200 ${
          isDarkMode ? "bg-[#0A0A0A] border-white/10" : "bg-white border-neutral-200"
        }`}>
          <div className="px-3 pt-2 pb-5 space-y-1 sm:px-4">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className={`block w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  isDarkMode 
                    ? "text-white/60 hover:text-[#F27D26] hover:bg-white/5" 
                    : "text-neutral-600 hover:text-[#F27D26] hover:bg-neutral-50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className={`pt-4 pb-2 border-t px-4 space-y-2 ${isDarkMode ? "border-white/10" : "border-neutral-200"}`}>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsappBudget();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#F27D26] text-black text-xs font-black uppercase tracking-widest rounded-none"
              >
                <FaWhatsapp className="w-4 h-4 text-black" />
                Solicitar Presupuesto
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
