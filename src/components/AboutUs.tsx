import React from "react";
import { Wrench, Package, HardHat, Clock } from "lucide-react";

export const AboutUs: React.FC = () => {
  const highlights = [
    {
      title: "Fabricación propia",
      desc: "Producimos las estructuras en nuestro taller y las montamos en obra. Sin tercerizar.",
      icon: Wrench,
    },
    {
      title: "Materiales de calidad",
      desc: "Trabajamos con aceros y perfiles de proveedores conocidos, seleccionados por duración y rendimiento.",
      icon: Package,
    },
    {
      title: "Equipo con experiencia",
      desc: "Personal propio con años en el rubro, acostumbrado a obras de distintas escalas y condiciones.",
      icon: HardHat,
    },
    {
      title: "Cumplimiento de plazos",
      desc: "Organizamos cada etapa del trabajo para entregar en tiempo y sin sorpresas de último momento.",
      icon: Clock,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="max-w-[1400px] mx-auto h-full w-full border-x border-white/5 flex justify-between">
          <div className="border-r border-white/5 h-full w-1/4" />
          <div className="border-r border-white/5 h-full w-1/4" />
          <div className="border-r border-white/5 h-full w-1/4" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#F27D26]"></span> Quiénes somos
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tighter text-white">
                Metalúrgica con base <br />
                <span className="text-[#F27D26]">en Córdoba</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              Somos <strong className="text-white font-semibold">Acercons</strong>, una empresa metalúrgica cordobesa dedicada a la fabricación y montaje de estructuras metálicas. Hacemos galpones industriales, portones, naves y todo tipo de construcción en acero para clientes de la región.
            </p>

            <p className="text-sm text-white/50 leading-relaxed">
              Llevamos más de 15 años en el rubro. En ese tiempo aprendimos que cada obra tiene sus particularidades, y que la mejor forma de trabajar es de cerca con el cliente, desde la primera medición hasta el día de la entrega.
            </p>

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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#F27D26]">
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

          <div className="lg:col-span-5 relative">
            <div className="relative z-10 border border-white/10 p-3 rounded-none bg-[#0A0A0A]/90 backdrop-blur-md">
              <div className="overflow-hidden rounded-none relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
                <img
                  src="/images/estructura.png"
                  alt="Taller Acercons"
                  className="w-full object-cover h-[500px] scale-100 group-hover:scale-105 transition-transform duration-[4000ms]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-[#0A0A0A] border border-white/10 p-4 rounded-none shadow-2xl z-20 flex items-center gap-4 max-w-xs">
              <div className="text-3xl font-black text-[#F27D26]">+15</div>
              <div className="border-l border-white/10 pl-3 text-left">
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Años en el rubro
                </div>
                <p className="text-[10px] text-white/50 mt-0.5 leading-tight">
                  Fabricación y montaje de estructuras metálicas en Córdoba.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};