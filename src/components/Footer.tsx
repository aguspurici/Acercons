import React from "react";
import { Logo } from "./Logo";
import { ChevronRight, Globe } from "lucide-react";
import FaWahtsapp, { FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10 text-left">

          {/* Logo + descripción */}
          <div className="md:col-span-5 space-y-5">
            <Logo size="lg" withPlate={false} />

            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Fabricación y montaje de estructuras metálicas para proyectos
              industriales, comerciales y logísticos.
            </p>

            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-1 border border-[#F27D26]/20">
                Montajes Industriales
              </span>

              <span className="text-[10px] uppercase font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-1 border border-[#F27D26]/20">
                Cobertura Nacional
              </span>
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/10 pb-2">
              Secciones
            </h4>

            <ul className="space-y-2.5">
              {[
                { label: "Inicio", target: "hero" },
                { label: "Sobre Nosotros", target: "about" },
                { label: "Servicios", target: "services" },
                { label: "Proyectos", target: "projects" },
                { label: "Proceso", target: "process" },
                { label: "Contacto", target: "contact" },
              ].map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[#F27D26] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#F27D26]" />

                    {link.target === "contact" ? (
                      <>
                        <FaWhatsapp className="w-4 h-4 text-[#F27D26]" />
                        <span>{link.label}</span>
                      </>
                    ) : (
                      link.label
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/10 pb-2">
              Información
            </h4>

            <p className="text-sm text-white/50 leading-relaxed">
              Trabajamos en proyectos industriales y comerciales ofreciendo
              soluciones metálicas resistentes, funcionales y adaptadas a cada
              necesidad.
            </p>

            <div className="p-3 bg-white/5 border border-white/10 flex gap-3 items-center">
              <Globe className="w-4 h-4 text-[#F27D26] shrink-0" />

              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                  Cobertura Nacional
                </div>

                <p className="text-[11px] text-white/50">
                  Trabajos realizados en Córdoba y distintas provincias.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          
          <div>
            © {currentYear} ACERCONS ESTRUCTURAS METÁLICAS
          </div>

          <a
            href="https://elementalwebs.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <span>Hecho por</span>

            <img
              src="/src/assets/images/logoElemental.png"
              alt="Elemental Webs"
              className="h-5 object-contain"
            />
          </a>

        </div>
      </div>
    </footer>
  );
};