import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Info } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Números de contacto: mientras no haya un número técnico distinto,
// ambos apuntan al mismo. Cuando lo consigan, solo hace falta
// reemplazar PHONE_TECHNICAL / PHONE_TECHNICAL_WHATSAPP acá abajo.
const PHONE_COMMERCIAL = "+54 9 351 385-3120";
const PHONE_COMMERCIAL_WHATSAPP = "543513853120";
const PHONE_TECHNICAL = "+54 9 351 4032885";
const PHONE_TECHNICAL_WHATSAPP = "543514032885";

export const ContactForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "galpones",
    area: "",
    message: "",
  });

  const [activeForm, setActiveForm] = useState<"whatsapp" | "email">(
    "whatsapp",
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeForm === "whatsapp") {
      const mensaje = `
*Nueva Consulta - Acercons*
─────────────────────────
👤 *Nombre:* ${formData.name}
📧 *Email:* ${formData.email}
📞 *Teléfono:* ${formData.phone}
🏗️ *Servicio:* ${formData.projectType}
📐 *Superficie:* ${formData.area || "No especificada"}
📋 *Detalles:* ${formData.message}
─────────────────────────
    `.trim();
      const url = `https://wa.me/${PHONE_COMMERCIAL_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    } else {
      const subject = `Consulta de ${formData.name} - ${formData.projectType}`;
      const body = `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Servicio: ${formData.projectType}
Superficie: ${formData.area || "No especificada"}

Detalles:
${formData.message}
    `.trim();
      const mailtoUrl = `mailto:tecnica.acercons@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, "_blank");
    }

    setFormSubmitted(true);
  };
  return (
    <section
      id="contact"
      className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden"
    >
      <div className="absolute bottom-[-15%] left-[-10%] w-[40%] h-[40%] bg-[#F27D26]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="space-y-4 max-w-2xl text-left mb-16">
          <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#F27D26]"></span>
            CONTACTO
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            Hablemos sobre su <span className="text-[#F27D26]">proyecto</span>
          </h2>

          <p className="text-sm text-white/60 leading-relaxed">
            Complete el formulario y nos pondremos en contacto para asesorarlo
            sobre estructuras metálicas, galpones y obras industriales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#F27D26]">
                Oficina y Contacto
              </h3>

              <div className="space-y-4">
                {/* ADDRESS */}
                <div className="flex gap-4 p-4 bg-white/5 border border-white/5">
                  <div className="p-3 bg-black/40 border border-white/10 text-[#F27D26] h-fit">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Taller y Oficina
                    </h4>

                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      Av. Gral. Manuel Savio 3851, Córdoba
                    </p>
                  </div>
                </div>

                {/* PHONE - COMERCIAL */}
                <div className="flex gap-4 p-4 bg-white/5 border border-white/5">
                  <div className="p-3 bg-black/40 border border-white/10 text-[#F27D26] h-fit">
                    <Phone className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                        Contacto Comercial
                      </h4>
                      <a
                        href={`https://wa.me/${PHONE_COMMERCIAL_WHATSAPP}?text=Hola,%20quisiera%20realizar%20una%20consulta%20comercial`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                      >
                        <FaWhatsapp className="w-3 h-3" />
                        Ir a WhatsApp
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      {PHONE_COMMERCIAL}
                    </p>

                    <p className="text-[14px] text-white/80 mt-1">
                      comercial.acercons@gmail.com
                    </p>
                  </div>
                </div>

                {/* PHONE - TÉCNICO */}
                <div className="flex gap-4 p-4 bg-white/5 border border-white/5">
                  <div className="p-3 bg-black/40 border border-white/10 text-[#F27D26] h-fit">
                    <Phone className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                        Contacto Técnico
                      </h4>
                      {/* <a
                        href={`https://wa.me/${PHONE_TECHNICAL_WHATSAPP}?text=Hola,%20quisiera%20realizar%20una%20consulta%20t%C3%A9cnica`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                      >
                        <FaWhatsapp className="w-3 h-3" />
                        Ir a WhatsApp
                      </a> */}
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      {PHONE_TECHNICAL}
                    </p>

                    <p className="text-[14px] text-white/80 mt-1">
                      tecnica.acercons@gmail.com
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                {/* <div className="flex gap-4 p-4 bg-white/5 border border-white/5">
                  <div className="p-3 bg-black/40 border border-white/10 text-[#F27D26] h-fit">
                    <Mail className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Correo Electrónico
                    </h4>

                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      comercial.acercons@gmail.com
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* MAP */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#F27D26]" />

                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  UBICACIÓN
                </h4>
              </div>

              <div className="relative aspect-[16/10] border border-white/10 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425.4154480414981!2d-64.14208072441535!3d-31.460283745036552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432bd006005b2e3%3A0x18ae33a0e3c0133d!2sACERCONS%20Estructuras%20Metalicas!5e0!3m2!1ses!2sar!4v1781764338365!5m2!1ses!2sar"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Acercons"
                />
              </div>
            </div>

            {/* WHATSAPP BUTTON */}
            <div>
              <a
                href={`https://wa.me/${PHONE_COMMERCIAL_WHATSAPP}?text=Hola,%20quisiera%20realizar%20una%20consulta`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all"
              >
                <FaWhatsapp className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden text-left shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#F27D26]" />
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* TABS */}
                <div className="flex border-b border-white/10 pb-4 gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveForm("whatsapp")}
                    className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all cursor-pointer ${
                      activeForm === "whatsapp"
                        ? "border-[#F27D26] text-[#F27D26]"
                        : "border-transparent text-white/40 hover:text-white"
                    }`}
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    Comercial
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveForm("email")}
                    className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all cursor-pointer ${
                      activeForm === "email"
                        ? "border-[#F27D26] text-[#F27D26]"
                        : "border-transparent text-white/40 hover:text-white"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Técnico
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* NAME */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                      Nombre Completo
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Ej: Juan Pérez"
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 text-xs focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-600"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                      Correo Electrónico
                    </label>

                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Ej: contacto@empresa.com"
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 text-xs focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-600"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                      Teléfono
                    </label>

                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Ej: +54 9 351 000 0000"
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 text-xs focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-600"
                    />
                  </div>

                  {/* SERVICE */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                      Servicio de Interés
                    </label>

                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 text-xs focus:border-[#F27D26] focus:outline-none"
                    >
                      <option value="Naves Industriales">Naves Industriales</option>

                      <option value="Estructuras Metalicas Especiales">Estructuras Metalicas Especiales</option>

                      <option value="Estructuras Metalicas Especiales">Estructuras Metalicas Especiales</option>

                      <option value="Obras Civiles">Obras Civiles</option>
                    </select>
                  </div>
                </div>

                {/* AREA */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                    Superficie Aproximada
                  </label>

                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        area: e.target.value,
                      })
                    }
                    placeholder="Ej: 500 m²"
                    className="w-full bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 text-xs focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-600"
                  />
                </div>

                {/* MESSAGE */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
                    Detalles del Proyecto
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Contanos brevemente qué tipo de estructura o trabajo necesitás..."
                    className="w-full bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 text-xs focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-600 resize-none"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#F27D26] text-black font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-all cursor-pointer flex items-center justify-center gap-3"
                >
                  {activeForm === "whatsapp" ? (
                    <>
                      <FaWhatsapp className="w-4 h-4" /> Consulta Comercial
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" /> Consulta Técnica
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-4 bg-[#F27D26]/10 border border-[#F27D26]/30 text-[#F27D26]">
                  <CheckCircle className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                    ¡Mensaje Enviado!
                  </h3>

                  <p className="text-[10px] text-[#F27D26] font-bold uppercase tracking-widest">
                    Nos pondremos en contacto a la brevedad
                  </p>

                  <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed pt-2">
                    Gracias <strong>{formData.name}</strong> por comunicarte con
                    nosotros.
                  </p>
                </div>

                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 bg-black border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#F27D26] hover:bg-white/5 transition-all cursor-pointer"
                >
                  Enviar otro formulario
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
