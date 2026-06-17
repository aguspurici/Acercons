import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  FileText,
  Trophy,
  Landmark,
  Users,
  ShieldAlert,
} from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isDarkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenAdmin,
  isDarkMode = true,
}) => {
  const whatsappBudgetUrl =
    "https://wa.me/543513853120?text=Hola,%20quisiera%20solicitar%20un%20presupuesto";

  const openWhatsappBudget = () => {
    window.open(whatsappBudgetUrl, "_blank", "noopener,noreferrer");
  };

  const stats = [
    {
      value: "+120",
      label: "Proyectos",
      description: "Galpones, naves y estructuras en toda la región",
      icon: Trophy,
    },
    {
      value: "+15",
      label: "Años",
      description: "Trabajando en el rubro metalúrgico",
      icon: Landmark,
    },
    {
      value: "10K",
      label: "M² Construidos",
      description: "En obras de distintas escalas",
      icon: Users,
    },
    {
      value: "100%",
      label: "Compromiso",
      description: "Con los plazos y la calidad del trabajo",
      icon: ShieldAlert,
    },
  ];

const heroImages = [
  "/images/balcon3.png",
  "/images/estructura.png",
  "/images/frente.webp",
];

const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-[#0A0A0A]" : "bg-[#F4F4F6]"
      }`}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/balcon.webp"
          alt="Acercons Steel Construction"
          className={`w-full h-full object-cover object-center scale-100 select-none pointer-events-none transition-all duration-500 ${
            isDarkMode ? "opacity-25" : "opacity-15"
          }`}
          referrerPolicy="no-referrer"
          style={{
            filter: isDarkMode
              ? "brightness(0.3) contrast(1.2)"
              : "brightness(1) contrast(0.95)",
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-tr transition-colors duration-500 ${
            isDarkMode
              ? "from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent"
              : "from-[#F4F4F6] via-[#F4F4F6]/95 to-[#F4F4F6]/30"
          }`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] blur-[120px] pointer-events-none transition-colors duration-500 ${
            isDarkMode ? "bg-[#F27D26]/5" : "bg-[#F27D26]/10"
          }`}
        />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="max-w-[1400px] mx-auto h-full w-full border-x border-neutral-500/10 flex justify-between">
          <div className="border-r border-neutral-500/10 h-full w-1/4" />
          <div className="border-r border-neutral-500/10 h-full w-1/4" />
          <div className="border-r border-neutral-500/10 h-full w-1/4" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center my-auto w-full text-left pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#F27D26]"></span> Córdoba,
              Argentina
            </span>

            <h2
              className={`text-4xl sm:text-6xl font-black leading-[0.95] tracking-tighter uppercase transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              Estructuras <br />
              <span className="text-[#F27D26]">Metálicas</span>
              <br />
              <span
                className={`text-xl sm:text-3xl mt-3 block font-semibold lowercase tracking-tight normal-case transition-colors duration-500 ${
                  isDarkMode ? "text-white/90" : "text-neutral-800"
                }`}
              >
                galpones y construcción industrial
              </span>
            </h2>

            <p
              className={`max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-normal transition-colors duration-500 ${
                isDarkMode ? "text-white/60" : "text-neutral-600"
              }`}
            >
              Fabricamos y montamos estructuras metálicas en Córdoba y la
              región. Trabajamos con cada cliente desde el diseño hasta la
              entrega, sin intermediarios.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate("projects")}
                className="px-8 py-3.5 bg-[#F27D26] text-black text-xs font-black uppercase tracking-widest rounded-none hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                Ver Trabajos
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openWhatsappBudget}
                className={`px-8 py-3.5 border text-xs font-black uppercase tracking-widest rounded-none transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isDarkMode
                    ? "border-white/20 hover:border-white text-white hover:bg-white/5"
                    : "border-neutral-300 hover:border-neutral-950 text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                <FileText className="w-4 h-4 text-[#F27D26]" />
                Pedir Presupuesto
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center">
            <div
              className={`absolute -inset-3 border pointer-events-none hidden sm:block transition-colors duration-500 ${
                isDarkMode ? "border-white/5" : "border-neutral-200"
              }`}
            />

            <div
              className={`relative w-[120%] h-[700px] -ml-[10%] p-2.5 overflow-hidden shadow-2xl
                isDarkMode
                  ? "bg-black border-white/10"
                  : "bg-white border-neutral-200"
              }`}
            >
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#F27D26]" />

              <div
                className={`relative w-full h-full overflow-hidden border ${
                  isDarkMode ? "border-white/5" : "border-neutral-100"
                }`}
              >
               <div className="relative w-full h-full">
  {heroImages.map((image, index) => (
    <img
      key={image}
      src={image}
      alt="Trabajo Acercons"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
        index === currentImage ? "opacity-100" : "opacity-0"
      }`}
      referrerPolicy="no-referrer"
    />
  ))}


  {/* Indicadores */}
  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          currentImage === index
            ? "bg-[#F27D26] scale-125"
            : "bg-white/50 hover:bg-white/80"
        }`}
      />
    ))}
  </div>
</div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
                    isDarkMode
                      ? "bg-gradient-to-t from-black via-black/25 to-black/5"
                      : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  }`}
                />

                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(#fff 0.8px, transparent 0.8px)`,
                    backgroundSize: "12px 12px",
                  }}
                />

                <div
                  className={`absolute bottom-3 left-3 right-3 p-4 font-sans text-left space-y-1 block shadow-lg backdrop-blur-sm transition-all duration-500 ${
                    isDarkMode
                      ? "bg-[#0A0A0A]/95 border-white/10"
                      : "bg-white/95 border-neutral-200"
                  }`}
                >
                  <span className="text-[8px] font-black text-[#F27D26] uppercase tracking-widest block font-sans">
                    Trabajo realizado • Córdoba
                  </span>
                  <div
                    className={`text-xs font-bold uppercase tracking-tight line-clamp-1 transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    Portón Metálico
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-5 flex flex-col justify-center text-left backdrop-blur-sm transition-all duration-300 rounded-none border ${
                isDarkMode
                  ? "bg-white/5 border-white/5 hover:border-[#F27D26]/20 hover:bg-white/[0.08]"
                  : "bg-white border-neutral-200 hover:border-[#F27D26]/30 hover:bg-neutral-50"
              }`}
            >
              <span className="text-3xl font-black text-[#F27D26] tracking-tight">
                {stat.value}
              </span>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold mt-1 transition-colors duration-500 ${
                  isDarkMode ? "text-white/40" : "text-neutral-500"
                }`}
              >
                {stat.label}
              </span>
              <p
                className={`text-[11px] mt-1.5 leading-tight transition-colors duration-500 ${
                  isDarkMode ? "text-white/50" : "text-neutral-600"
                }`}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
