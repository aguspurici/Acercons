import React from "react";
import { Logo } from "./Logo";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10 text-left">

          {/* Logo + descripción */}
          <div className="md:col-span-4 space-y-5">
            <Logo size="lg" withPlate={false} />
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Fabricación y montaje de estructuras metálicas en Córdoba. Naves Industriales, estructuras metálicas a medida y obras civiles.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-1 border border-[#F27D26]/20">
                Córdoba
              </span>
              <span className="text-[10px] uppercase font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-1 border border-[#F27D26]/20">
                +15 años en el rubro
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
                { label: "Nosotros", target: "about" },
                { label: "Servicios", target: "services" },
                { label: "Proyectos", target: "projects" },
                { label: "Cómo trabajamos", target: "process" },
                { label: "Contacto", target: "contact" },
              ].map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[#F27D26] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#F27D26]" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/10 pb-2">
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                <span>Av. Gral. Manuel Savio 3851, Córdoba</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-[#F27D26] shrink-0" />
                <span>+54 9 351 385-3120</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[#F27D26] shrink-0" />
                <span>comercial.acercons@gmail.com</span>
              </div>
              <a
                href="https://wa.me/543513853120?text=Hola,%20quisiera%20realizar%20una%20consulta"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 w-fit px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <FaWhatsapp className="w-4 h-4" />
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {currentYear} Acercons Estructuras Metálicas. Todos los derechos reservados
          </div>
          <a
            href="https://elementalwebs.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white/60 group-hover:text-white transition-colors"
          >
            <span>Creado por</span>
            <img
              src={isDarkMode ? "/images/LogoElemental.png" : "/images/LogoElementalNegro.png"}
              alt="Elemental Webs"
              className="h-5 object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};