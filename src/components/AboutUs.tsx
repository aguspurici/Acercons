import React from "react";
import { ShieldCheck, Cpu, HardHat, Award } from "lucide-react";

export const AboutUs: React.FC = () => {
  const highlights = [
    {
      title: "Solidez Estructural",
      desc: "Estructuras diseñadas con perfiles de acero pesado certificados y soldaduras continuas certificadas por normativas AWS.",
      icon: ShieldCheck,
    },
    {
      title: "Cálculo e Ingeniería Inteligente",
      desc: "Ingeniería de detalle con modelamiento BIM en 3D que permite integrar los planos del galpón directamente a fabricación.",
      icon: Cpu,
    },
    {
      title: "Seguridad y Logística Propia",
      desc: "Instalación en altura por personal especializado provisto de flota de grúas e instrumental de maniobra de alta capacidad.",
      icon: HardHat,
    },
    {
      title: "Trayectoria y Garantía",
      desc: "Garantizamos todas las uniones pluviales, la estanqueidad de las cubiertas y la durabilidad contra la fatiga de materiales.",
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Structural visual dashed grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="max-w-[1400px] mx-auto h-full w-full border-x border-white/5 flex justify-between">
          <div className="border-r border-white/5 h-full w-1/4" />
          <div className="border-r border-white/5 h-full w-1/4" />
          <div className="border-r border-white/5 h-full w-1/4" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT SIDE: Description and Highlights */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#F27D26]"></span> Trayectoria e Ingeniería
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tighter text-white">
                Construimos el soporte de la <br />
                <span className="text-[#F27D26]">industria nacional</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              En <strong className="text-white font-semibold">Acercons Estructuras Metálicas</strong>, combinamos más de 15 años de conocimiento práctico en obra con las tecnologías industriales más modernas del mercado. Nos especializamos en la planificación integrada de galpones industriales, depósitos logísticos, hangares de aviación y estructuras metálicas de alta complejidad para toda la Argentina.
            </p>
            
            <p className="text-sm text-white/50 leading-relaxed">
              Trabajamos estrechamente con ingenieros, estudios de arquitectura y directores de planta para asegurar que cada perfil de acero pesado, cada viga reticulada y cada chapa termoacústica del techo cumpla rigurosamente los plazos acordados, garantizando la inversión del cliente final y la seguridad civil del complejo.
            </p>

            {/* Quick stats items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-white/5 border border-white/5 group-hover:border-[#F27D26]/30 text-[#F27D26] group-hover:bg-white/[0.08] transition-all duration-300 rounded-none shadow-md">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#F27D26] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Heavy Industrial Image & Grid layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 border border-white/10 p-3 rounded-none bg-[#0A0A0A]/90 backdrop-blur-md">
              <div className="overflow-hidden rounded-none relative group">
                {/* Custom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
                
                <img
                  src="/src/assets/images/cartel.webp"
                  alt="Acercons fabricación de vigas y soldadura"
                  className="w-full object-cover h-[500px] scale-100 group-hover:scale-105 transition-transform duration-[4000ms]"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Label */}

              </div>
            </div>

            {/* Float Badge/Metadata Styled with Premium Editorial Look (Solid, Stationary) */}
            <div className="absolute -bottom-6 -left-6 bg-[#0A0A0A] border border-white/10 p-4 rounded-none shadow-2xl z-20 flex items-center gap-4 max-w-xs">
              <div className="text-3xl font-black text-[#F27D26]">100%</div>
              <div className="border-l border-white/10 pl-3 text-left">
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Aceros Ensayados
                </div>
                <p className="text-[10px] text-white/50 mt-0.5 leading-tight">
                  Trazabilidad de colada y control de ultrasonido en soldaduras.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
