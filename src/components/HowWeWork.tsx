import React from "react";
import { initialWorkSteps } from "../initialData";
import { WorkStep } from "../types";
import { DraftingCompass, Hammer, Compass, Award } from "lucide-react";

const getStepIcon = (name: string) => {
  switch (name) {
    case "DraftingCompass":
      return <DraftingCompass className="w-5 h-5" />;
    case "Factory":
      return <Hammer className="w-5 h-5" />;
    case "Compass":
      return <Compass className="w-5 h-5" />;
    case "Award":
    default:
      return <Award className="w-5 h-5" />;
  }
};

export const HowWeWork: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="space-y-4 max-w-2xl text-center mx-auto mb-20">
          <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-[#F27D26]"></span> Cómo trabajamos
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tighter">
            De la consulta a la <span className="text-[#F27D26]">entrega</span>
          </h2>
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
            Cuatro pasos simples que seguimos en cada obra, sin importar el tamaño del proyecto.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[2.75rem] left-[10%] right-[10%] h-[1px] bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialWorkSteps.map((step: WorkStep) => (
              <div
                key={step.step}
                className="group relative bg-[#0A0A0A] border border-white/10 rounded-none p-6 sm:p-8 hover:border-[#F27D26]/40 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#F27D26] uppercase tracking-[0.15em] bg-[#F27D26]/10 border border-[#F27D26]/20 px-2.5 py-1 rounded-none">
                      Paso 0{step.step}
                    </span>
                    <span className="text-3xl font-black text-white/70 group-hover:text-[#F27D26]/20 transition-colors">
                      0{step.step}
                    </span>
                  </div>

                  <div className="inline-flex p-3 bg-black/40 border border-white/10 text-[#F27D26] group-hover:border-[#F27D26] rounded-none transition-all duration-300">
                    {getStepIcon(step.iconName)}
                  </div>

                  <div className="space-y-2 text-left">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F27D26] transition-colors duration-200">
                      {step.title}
                    </h3>
                    <div className="text-[10px] text-[#F27D26] uppercase tracking-widest font-black">
                      {step.subtitle}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed pt-2">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <div className="w-2 h-2 rounded-none bg-white/10 group-hover:bg-[#F27D26] transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white/5 border border-white/10 p-6 rounded-none max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#F27D26]">
              ¿Tenés un proyecto en mente?
            </h4>
            <p className="text-xs text-white/60">
              Contanos qué necesitás y te respondemos a la brevedad.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3.5 bg-black hover:bg-white/5 border border-white/10 text-[#F27D26] font-black text-xs uppercase tracking-widest rounded-none transition-all duration-300 shrink-0 cursor-pointer"
          >
            Contactanos
          </a>
        </div>

      </div>
    </section>
  );
};