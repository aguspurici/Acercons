import React, { useState } from "react";
import { createProject } from "../services/project.service"; //importa la función para crear proyectos en Firestore
import { Project } from "../types";
import {
  FileSpreadsheet,
  PlusCircle,
  FolderDot,
  Sparkles,
  Trash2,
  Eye,
  MapPin,
  Send,
  X,
  Plus,
} from "lucide-react";

interface AdminPanelProps {
  projects: Project[];
  onAddProject: (proj: Project) => void;
  onDeleteProject: (id: string) => void;
  onCloseAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  projects,
  onAddProject,
  onDeleteProject,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");
  const [urlInput, setUrlInput] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Construcción de Galpones",
    area: "",
    year: "2026",
    location: "",
    steelWeight: "",
    description: "",
    fullDescription: "",
    images: [] as string[],
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddImage = () => {
    if (urlInput.trim()) {
      setNewProject({
        ...newProject,
        images: [...newProject.images, urlInput.trim()],
      });
      setUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewProject({
      ...newProject,
      images: newProject.images.filter((_, i) => i !== index),
    });
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const defaultImage =
      "/src/assets/images/warehouse_finished_1779383995795.png";

    const created = {
      title: newProject.title,
      category: newProject.category,
      area: newProject.area || "1,200 m²",
      year: newProject.year || "2026",
      location: newProject.location || "Parque Industrial Zárate",
      steelWeight: newProject.steelWeight
        ? `${newProject.steelWeight} Toneladas`
        : undefined,
      description:
        newProject.description ||
        "Nave industrial metálica multipropósito de alto rendimiento estructural.",
      fullDescription:
        newProject.fullDescription || "Proyecto de ingeniería civil...",
      image: newProject.images[0] || defaultImage,
      images: newProject.images.length > 0 ? newProject.images : [defaultImage],
      featured: false,
    };

    try {
      console.log("ANTES DE FIREBASE");

      const firebaseId = await createProject(created);

      console.log("ID FIREBASE:", firebaseId);

      onAddProject(created);

      setNotification("¡Proyecto creado y guardado en Firebase!");
    } catch (error) {
      console.error("ERROR FIREBASE:", error);

      setNotification("Error al guardar el proyecto.");

      return;
    }

    setNewProject({
      title: "",
      category: "Construcción de Galpones",
      area: "",
      year: "2026",
      location: "",
      steelWeight: "",
      description: "",
      fullDescription: "",
      images: [],
    });
    setUrlInput("");

    setTimeout(() => {
      setNotification(null);
      setActiveTab("list");
    }, 2000);
  };

  const availableImages = [
    {
      name: "Galpón Metalúrgico Primario",
      path: "/src/assets/images/balcon2.webp",
    },
    {
      name: "Pórticos Metálicos Curvos",
      path: "/src/assets/images/hero_industrial_1779383980213.png",
    },
    {
      name: "Talleres y Soldaduras",
      path: "/src/assets/images/steel_fabrication_1779384011286.png",
    },
    {
      name: "Grúas e Izaje de Columnas",
      path: "/src/assets/images/industrial_assembly_1779384024704.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-950 pt-24 pb-12 transition-all selection:bg-[#F27D26]/30 selection:text-neutral-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-6 mb-8 gap-4 text-left">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 rounded-none border border-[#F27D26]/20 inline-block tracking-wider">
              ENTORNO INTERACTIVO CMS • VISTA CONCEPTUAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-neutral-900 tracking-tight flex items-center gap-2.5">
              <FolderDot className="w-8 h-8 text-[#F27D26]" />
              Acercons Control Hub
            </h2>
            <p className="text-xs text-neutral-500">
              Módulo administrativo simulado para la gestión de obras, planos y
              carga de portfolio corporativo.
            </p>
          </div>

          <button
            onClick={onCloseAdmin}
            className="px-5 py-2.5 bg-[#F27D26] hover:bg-orange-500 text-black font-black text-xs uppercase tracking-widest rounded-none shadow-lg flex items-center gap-2 duration-300 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Volver al Sitio Corporativo
          </button>
        </div>

        {/* CMS Workspace layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-none p-4 space-y-2">
              <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest px-3 py-1">
                Navegación CMS
              </div>
              {[
                {
                  id: "list",
                  label: "Obras Almacenadas",
                  icon: FileSpreadsheet,
                },
                { id: "add", label: "Agregar Nueva Obra", icon: PlusCircle },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "list" | "add")}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-xs font-black uppercase tracking-widest rounded-none border transition-all duration-300 cursor-pointer text-left ${
                      isSelected
                        ? "bg-[#F27D26] text-black border-[#F27D26]"
                        : "bg-white text-neutral-600 border-neutral-200/60 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="bg-[#FFF6F0] border border-[#F27D26]/20 rounded-none p-5 text-left space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#F27D26] uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                Sincronización
              </div>
              <p className="text-[11px] text-neutral-700 leading-relaxed">
                Cualquier obra que cargue se insertará al portfolio de la
                landing de manera inmediata en memoria.
              </p>
            </div>
          </div>

          {/* WORKSPACE */}
          <div className="lg:col-span-9 bg-white border border-neutral-200 rounded-none p-6 sm:p-8 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#F27D26]" />

            <div className="border-b border-neutral-200 pb-4 mb-6 text-left">
              <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight uppercase">
                {activeTab === "list" &&
                  "Biblioteca de Proyectos Activos en Portal"}
                {activeTab === "add" && "Formulario Técnico de Carga de Obra"}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {activeTab === "list" &&
                  "Examine, organice o remueva las obras visibles en el portfolio frontal."}
                {activeTab === "add" &&
                  "Complete los requerimientos para publicar el caso en el frontend."}
              </p>
            </div>

            {notification && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 text-left flex items-center gap-3 rounded-none">
                <span className="w-2 h-2 bg-emerald-500" />
                {notification}
              </div>
            )}

            {/* LIST TAB */}
            {activeTab === "list" && (
              <div className="space-y-3 text-left">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-none gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={proj.image}
                        alt="Thumbnail"
                        className="w-16 h-12 object-cover rounded-none bg-black shrink-0 border border-neutral-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left space-y-1">
                        <span className="text-[9px] font-black text-[#F27D26] uppercase tracking-widest bg-white border border-neutral-200 px-2 py-0.5">
                          {proj.category}
                        </span>
                        <h4 className="text-sm font-bold uppercase text-neutral-900 line-clamp-1">
                          {proj.title}
                        </h4>
                        <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                          {proj.location} • {proj.area}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {proj.featured && (
                        <span className="text-[9px] font-bold text-white bg-neutral-950 px-2 py-1 uppercase">
                          Destacado
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-neutral-400 uppercase bg-neutral-100 border border-neutral-200 px-2 py-1">
                        {proj.images.length} foto
                        {proj.images.length !== 1 ? "s" : ""}
                      </span>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "¿Está seguro de que desea remover este proyecto?",
                            )
                          ) {
                            onDeleteProject(proj.id);
                            setNotification(
                              "¡Proyecto eliminado temporalmente!",
                            );
                            setTimeout(() => setNotification(null), 2500);
                          }
                        }}
                        className="p-2 rounded-none bg-white border border-neutral-200 text-neutral-500 hover:text-red-500 hover:border-red-200 hover:bg-neutral-50 duration-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD TAB */}
            {activeTab === "add" && (
              <form
                onSubmit={handleCreateProject}
                className="space-y-6 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Título de la Obra / Empresa
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Depósito de Logística del Sur"
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Especialidad / Categoría
                    </label>
                    <select
                      value={newProject.category}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          category: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none focus:ring-0"
                    >
                      <option value="Estructuras Metálicas">
                        Estructuras Metálicas
                      </option>
                      <option value="Construcción de Galpones">
                        Construcción de Galpones
                      </option>
                      <option value="Montajes Metálicos">
                        Montajes Metálicos
                      </option>
                      <option value="Soldadura Industrial">
                        Soldadura Industrial
                      </option>
                      <option value="Obras Metálicas">Obras Metálicas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Superficie Estimada (m²)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 3,500 m²"
                      value={newProject.area}
                      onChange={(e) =>
                        setNewProject({ ...newProject, area: e.target.value })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Ubicación de la Obra
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Pilar, Buenos Aires"
                      value={newProject.location}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          location: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Año de Finalización
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 2026"
                      value={newProject.year}
                      onChange={(e) =>
                        setNewProject({ ...newProject, year: e.target.value })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Peso de Acero Total (Toneladas)
                    </label>
                    <input
                      type="number"
                      placeholder="Ej: 145"
                      value={newProject.steelWeight}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          steelWeight: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Descripción Corta (Para cards frontales)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Pórticos soldados por arco sumergido y techado hermético"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Memoria e Información Detallada
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Trazabilidad total de colada perfiles de acero HEB, montaje abulonado rápido..."
                    value={newProject.fullDescription}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        fullDescription: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 resize-none focus:ring-0"
                  />
                </div>

                {/* IMAGE UPLOADER */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1 block">
                    Imágenes del Proyecto (URLs)
                  </label>

                  {/* Imágenes de ejemplo — clickear para agregar */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold pl-1">
                      Seleccioná de la galería de ejemplo
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 border border-neutral-200">
                      {availableImages.map((img) => {
                        const yaAgregada = newProject.images.includes(img.path);
                        return (
                          <button
                            key={img.path}
                            type="button"
                            onClick={() => {
                              if (!yaAgregada) {
                                setNewProject({
                                  ...newProject,
                                  images: [...newProject.images, img.path],
                                });
                              } else {
                                handleRemoveImage(
                                  newProject.images.indexOf(img.path),
                                );
                              }
                            }}
                            className={`text-left rounded-none overflow-hidden border p-1 bg-white transition-all cursor-pointer ${
                              yaAgregada
                                ? "border-[#F27D26] opacity-100"
                                : "border-neutral-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={img.path}
                                alt={img.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-[9px] text-neutral-500 font-bold truncate mt-1.5 px-0.5 uppercase flex items-center justify-between">
                              <span>{img.name}</span>
                              {yaAgregada && (
                                <span className="text-[#F27D26]">✓</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Separador */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-neutral-200" />
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                      o agregá una URL externa
                    </span>
                    <div className="flex-1 h-px bg-neutral-200" />
                  </div>

                  {/* Input + botón agregar */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/foto-obra.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddImage();
                        }
                      }}
                      className="flex-1 bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-4 py-3 bg-[#F27D26] text-black font-black text-xs uppercase tracking-widest rounded-none hover:bg-orange-500 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar
                    </button>
                  </div>

                  {/* Grid de imágenes agregadas */}
                  {newProject.images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 border border-neutral-200">
                      {newProject.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <div className="aspect-[4/3] overflow-hidden border border-neutral-200 bg-black">
                            <img
                              src={img}
                              alt={`Foto ${i + 1}`}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex items-center justify-between mt-1 px-0.5">
                            <span className="text-[9px] text-neutral-400 font-bold uppercase">
                              {i === 0 ? "Principal" : `Foto ${i + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(i)}
                              className="text-red-400 hover:text-red-600 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-neutral-50 border border-dashed border-neutral-300 p-6 text-center">
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                        Sin imágenes agregadas — la primera URL que agregues
                        será la imagen principal
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#F27D26] text-black font-black text-xs uppercase tracking-widest rounded-none shadow-lg hover:bg-orange-500 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Publicar en Portfolio de Acercons
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
