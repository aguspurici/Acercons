import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsappFloating: React.FC = () => {
  return (
    <div>
     <a
  href="https://wa.me/543513853120"
  target="_blank"
  rel="noreferrer"
  aria-label="Contactar por WhatsApp"
  className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg transition-all duration-200"
>
  <FaWhatsapp className="w-7 h-7" />
</a>
    </div>
  );
};

export default WhatsappFloating;
