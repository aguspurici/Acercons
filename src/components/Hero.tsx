import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isDarkMode?: boolean;
}

const PHRASES = [
  "Más de 120 proyectos en toda la región",
  "+15 años en el rubro metalúrgico",
  "10.000 m² construidos",
  "100% compromiso con plazos y calidad",
];

const heroImages = [
  "/images/galponHero.png",
  "/images/techo.png",
  "/images/estructuraGalpon.png",
];

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

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(imageTimer);
  }, []);

  return (
    <section
      id="hero"
      className={`relative h-screen w-full flex flex-col lg:flex-row overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-[#0A0A0A]" : "bg-[#F4F4F6]"
      }`}
    >
      {/* Left Column: Carrusel de imágenes */}
      <div
        className={`relative w-full lg:w-[45%] h-[40vh] lg:h-full overflow-hidden transition-colors duration-500 ${
          isDarkMode ? "bg-black" : "bg-neutral-200"
        }`}
      >
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

        {/* <div
          className={`absolute inset-0 z-10 transition-colors duration-500 ${
            isDarkMode
              ? "bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60"
              : "bg-gradient-to-t from-black/70 via-black/10 to-black/30"
          }`}
        /> */}

        {/* Indicadores del carrusel */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Ver imagen ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? "bg-[#F27D26] scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Contenido */}
      <div
        className={`w-full lg:w-[55%] h-full flex items-center lg:px-20 p-8 transition-colors duration-500 ${
          isDarkMode ? "bg-[#0A0A0A]" : "bg-[#F4F4F6]"
        }`}
      >
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-[#F27D26]" />
            <span
              className={`text-[14px] font-black uppercase tracking-[0.4em] italic transition-colors duration-500 ${
                isDarkMode ? "text-white/40" : "text-neutral-400"
              }`}
            >
              Córdoba, Argentina
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl md:text-7xl font-black leading-[0.9] mb-10 tracking-tight uppercase transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-neutral-950"
            }`}
          >
            Estructuras <br />
            <span className="text-[#F27D26]">Metálicas</span>
            <br />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-sm md:text-base leading-relaxed mb-8 transition-colors duration-500 ${
              isDarkMode ? "text-white/70" : "text-neutral-600"
            }`}
          >
            Desarrollamos, fabricamos y montamos estructuras metálicas que
            aportan valor agregado a tu proyecto.
          </motion.p>

          <div className="h-8 mb-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhrase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-[#F27D26] text-base md:text-lg italic border-l-4 border-[#F27D26] pl-5"
              >
                {PHRASES[currentPhrase]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => onNavigate("projects")}
              className="group bg-[#F27D26] text-black px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-4 border-2 border-[#F27D26] cursor-pointer"
            >
              Ver Trabajos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={openWhatsappBudget}
              className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 border-2 cursor-pointer ${
                isDarkMode
                  ? "border-white/20 hover:border-white text-white hover:bg-white/5"
                  : "border-neutral-300 hover:border-neutral-950 text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              <FileText className="w-4 h-4 text-[#F27D26]" />
              Pedir Presupuesto
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Indicator */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 flex-col items-center gap-4 hidden lg:flex">
        <span
          className={`writing-vertical-rl text-[10px] uppercase tracking-widest font-bold mb-4 transition-colors duration-500 ${
            isDarkMode ? "text-white/30" : "text-neutral-400"
          }`}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ height: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-0.5 bg-[#F27D26]"
        />
      </div>
    </section>
  );
};
