import React, { useState } from "react";
import { createPortal } from "react-dom";
import { initialServices } from "../initialData";
import { Service } from "../types";
import { Grid, Warehouse, Layers, Wrench, Flame, Hammer, Check, ArrowRight, X } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";

// Helper function to resolve dynamic Lucide icons
const getIcon = (name: string) => {
  switch (name) {
    case "Grid":
      return <Grid className="w-5 h-5" />;
    case "Warehouse":
      return <Warehouse className="w-5 h-5" />;
    case "Layers":
      return <Layers className="w-5 h-5" />;
    case "Wrench":
      return <Wrench className="w-5 h-5" />;
    case "Flame":
      return <Flame className="w-5 h-5" />;
    case "Construction":
    default:
      return <Hammer className="w-5 h-5" />;
  }
};

export const ServicesList: React.FC = () => {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Visual steel grid background accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#F27D26]"></span> Servicios Industriales
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tighter text-white">
              Especialistas de <span className="text-[#F27D26]">extrema confianza</span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Planificamos de manera rigurosa, fabricamos en talleres propios equipados e instalamos con grúas de alto porte para garantizar la solidez de su proyecto logístico.
            </p>
          </div>
          
         
        </div>

        {/* Services Grid (Razor sharp rounded-none style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-none p-8 hover:border-[#F27D26]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Brushed metallic top layout line marker */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-white/10 group-hover:bg-[#F27D26] transition-all duration-300" />
              
              <div className="space-y-6">
                {/* Icon wrapper with glow inside simple border box */}
                <div className="inline-flex p-3 bg-black/40 border border-white/10 text-[#F27D26] group-hover:border-[#F27D26] rounded-none transition-all duration-300">
                  {getIcon(service.iconName)}
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F27D26] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed h-20 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Bullets List */}
                <ul className="space-y-2 text-left pt-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                      <div className="bg-[#F27D26]/10 p-0.5 rounded-none text-[#F27D26]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 text-left">
                <button
                  onClick={() => setActiveService(service)}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F27D26] hover:text-white transition-colors cursor-pointer"
                >
                  Ficha Técnica Expandida
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Service Dialog (Modal in Editorial theme style: black content backdrop with orange highlines) */}
        {activeService &&  createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-none p-8 shadow-2xl overflow-hidden text-left"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              }}
            >
              {/* Highlight top border line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[#F27D26]" />

              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-black/40 border border-white/10 text-[#F27D26] rounded-none">
                      {getIcon(activeService.iconName)}
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#F27D26]">
                        Fórmula de Ingeniería Acercons
                      </span>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveService(null)}
                    className="p-1 rounded-none text-white/40 hover:text-white hover:bg-white/5 border border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Descripción de Capacidad Operativa
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-black/40 p-4 border border-white/5 rounded-none">
                    {activeService.detailedDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Puntos Clave de Control de Calidad
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.features.map((item, index) => (
                      <div key={index} className="flex items-center gap-2.5 p-2 bg-white/5 border border-white/5 rounded-none text-xs">
                        <div className="w-1.5 h-1.5 rounded-none bg-[#F27D26]" />
                        <span className="text-white/80 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={() => setActiveService(null)}
                    className="px-5 py-2.5 bg-black hover:bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/80 rounded-none cursor-pointer"
                  >
                    Cerrar Ficha
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      setActiveService(null);
                      // Smooth scroll to contact
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-2.5 bg-[#F27D26] hover:bg-orange-500 text-black text-xs font-black uppercase tracking-widest rounded-none shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <WhatsappIcon className="w-4 h-4 text-black" />
                    Cotizar este trabajo
                  </a>
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
