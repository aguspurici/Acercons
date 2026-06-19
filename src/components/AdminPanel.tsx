import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Project, PROJECT_CATEGORIES, ProjectCategory } from "../types";
import { storage } from "../lib/firebase";
import { compressImage } from "../lib/Imagecompression";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  FileSpreadsheet,
  PlusCircle,
  FolderDot,
  Sparkles,
  Trash2,
  Eye,
  Send,
  X,
  LogOut,
  Pencil,
  UploadCloud,
  Loader2,
} from "lucide-react";

// — Constantes fuera del componente —
const inputClass =
  "w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 focus:ring-0";

const categoryOptions = PROJECT_CATEGORIES;

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB por foto

type ProjectFormData = {
  title: string;
  category: ProjectCategory;
  description: string;
  images: string[];
};

// Sube un archivo a Firebase Storage dentro de la carpeta "projects/"
// y devuelve la URL pública de descarga. onProgress reporta el % (0-100).
const uploadImageToStorage = (
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.name}`;
    const storageRef = ref(storage, `projects/${uniqueName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        onProgress(pct);
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      },
    );
  });
};

// — ProjectForm fuera del componente —
const ProjectForm = ({
  data,
  setData,
  onSubmit,
  submitLabel,
}: {
  data: ProjectFormData;
  setData: (d: ProjectFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFilesSelected = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    const allFiles = Array.from(files);

    // Separar archivos válidos (≤5MB) de los que exceden el límite
    const oversizedFiles = allFiles.filter(
      (f) => f.size > MAX_IMAGE_SIZE_BYTES,
    );
    const validFiles = allFiles.filter(
      (f) => f.size <= MAX_IMAGE_SIZE_BYTES,
    );

    if (oversizedFiles.length > 0) {
      const names = oversizedFiles.map((f) => f.name).join(", ");
      setUploadError(
        `${oversizedFiles.length === 1 ? "Esta foto pesa" : "Estas fotos pesan"} más de 5MB y no se ${oversizedFiles.length === 1 ? "subió" : "subieron"}: ${names}. Comprimila o elegí otra.`,
      );
    }

    if (validFiles.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploadingCount(validFiles.length);
    setUploadProgress(0);

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < validFiles.length; i++) {
        const originalFile = validFiles[i];
        const file = await compressImage(originalFile);
        const url = await uploadImageToStorage(file, (pct) => {
          // Progreso combinado: archivos ya subidos + progreso del actual
          const overall = Math.round(
            ((i + pct / 100) / validFiles.length) * 100,
          );
          setUploadProgress(overall);
        });
        uploadedUrls.push(url);
      }
      setData({ ...data, images: [...data.images, ...uploadedUrls] });
    } catch (err) {
      console.error(err);
      setUploadError(
        "No se pudo subir una o más imágenes. Probá de nuevo.",
      );
    } finally {
      setUploadingCount(0);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImg = (index: number) => {
    setData({
      ...data,
      images: data.images.filter((_, i) => i !== index),
    });
  };

  const isUploading = uploadingCount > 0;

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
            Título de la Obra / Empresa
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Depósito de Logística del Sur"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
            Especialidad / Categoría
          </label>
          <select
            value={data.category}
            onChange={(e) =>
              setData({ ...data, category: e.target.value as ProjectCategory })
            }
            className={inputClass}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
          Descripción
        </label>
        <textarea
          rows={4}
          required
          placeholder="Ej: Construcción de un galpón logístico de gran escala con estructura metálica..."
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full bg-white border border-neutral-300 text-neutral-900 px-4 py-3 text-xs rounded-none focus:border-[#F27D26] focus:outline-none placeholder:text-neutral-400 resize-none focus:ring-0"
        />
      </div>

      {/* IMAGE UPLOADER */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1 block">
          Imágenes del Proyecto
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleFilesSelected}
          className="hidden"
          id="project-image-upload"
        />

        <label
          htmlFor="project-image-upload"
          className={`flex items-center justify-center gap-2 w-full px-4 py-4 border border-dashed font-black text-xs uppercase tracking-widest rounded-none transition-all cursor-pointer ${
            isUploading
              ? "border-neutral-300 bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "border-[#F27D26]/40 bg-[#FFF6F0] text-[#F27D26] hover:bg-[#F27D26]/10"
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subiendo imágenes... {uploadProgress}%
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" />
              Subir Fotos desde el Dispositivo
            </>
          )}
        </label>

        {uploadError && (
          <p className="text-[11px] text-red-600 font-semibold">{uploadError}</p>
        )}

        {data.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 border border-neutral-200">
            {data.images.map((img, i) => (
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
                    onClick={() => handleRemoveImg(i)}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isUploading && (
            <div className="bg-neutral-50 border border-dashed border-neutral-300 p-6 text-center">
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                Sin imágenes agregadas — la primera foto será la imagen principal
              </p>
            </div>
          )
        )}
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className={`w-full py-4 font-black text-xs uppercase tracking-widest rounded-none shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isUploading
            ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            : "bg-[#F27D26] text-black hover:bg-orange-500 cursor-pointer"
        }`}
      >
        <Send className="w-4 h-4" />
        {submitLabel}
      </button>
    </form>
  );
};

// — Interfaces —
interface AdminPanelProps {
  projects: Project[];
  onAddProject: (proj: Project) => void;
  onDeleteProject: (id: string) => void;
  onUpdateProject: (id: string, data: Partial<Project>) => void;
  onCloseAdmin: () => void;
}

// — AdminPanel —
export const AdminPanel: React.FC<AdminPanelProps> = ({
  projects,
  onAddProject,
  onDeleteProject,
  onUpdateProject,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<"list" | "add" | "edit">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const emptyForm: ProjectFormData = {
    title: "",
    category: PROJECT_CATEGORIES[0],
    description: "",
    images: [],
  };

  const [newProject, setNewProject] = useState<ProjectFormData>(emptyForm);
  const [editProject, setEditProject] = useState<ProjectFormData>(emptyForm);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Project = {
      id: "proj-custom-" + Math.floor(Math.random() * 10000),
      title: newProject.title,
      category: newProject.category,
      description: newProject.description,
      image: newProject.images[0] || "",
      images: newProject.images,
    };
    onAddProject(created);
    showNotification("¡Proyecto creado y sincronizado al portfolio con éxito!");
    setNewProject(emptyForm);
    setTimeout(() => setActiveTab("list"), 2000);
  };

  // — EDIT handlers —
  const handleOpenEdit = (proj: Project) => {
    setSelectedProject(proj);
    setEditProject({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      images: proj.images,
    });
    setActiveTab("edit");
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    onUpdateProject(selectedProject.id, {
      title: editProject.title,
      category: editProject.category,
      description: editProject.description,
      image: editProject.images[0] || "",
      images: editProject.images,
    });
    showNotification("¡Proyecto actualizado con éxito!");
    setTimeout(() => setActiveTab("list"), 2000);
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleGoToSite = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-950 pt-24 pb-12 transition-all selection:bg-[#F27D26]/30 selection:text-neutral-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-6 mb-8 gap-4 text-left">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 rounded-none border border-[#F27D26]/20 inline-block tracking-wider">
              PANEL DE ADMINISTRACIÓN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-neutral-900 tracking-tight flex items-center gap-2.5">
              <FolderDot className="w-8 h-8 text-[#F27D26]" />
              Acercons Control Hub
            </h2>
            <p className="text-xs text-neutral-500">
              Gestión de obras y portfolio corporativo.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoToSite}
              className="px-5 py-2.5 bg-[#F27D26] hover:bg-orange-500 text-black font-black text-xs uppercase tracking-widest rounded-none shadow-lg flex items-center gap-2 duration-300 cursor-pointer"
            >
              <Eye className="w-4 h-4" /> Volver al Sitio
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest rounded-none shadow-lg flex items-center gap-2 duration-300 cursor-pointer border border-neutral-700"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        </div>

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
                { id: "edit", label: "Editar Obra", icon: Pencil },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() =>
                      tab.id !== "edit"
                        ? setActiveTab(tab.id as "list" | "add")
                        : null
                    }
                    className={`flex items-center gap-3 w-full px-4 py-3 text-xs font-black uppercase tracking-widest rounded-none border transition-all duration-300 text-left ${
                      tab.id === "edit"
                        ? "cursor-default opacity-50"
                        : "cursor-pointer"
                    } ${isSelected ? "bg-[#F27D26] text-black border-[#F27D26]" : "bg-white text-neutral-600 border-neutral-200/60 hover:text-neutral-900 hover:bg-neutral-50"}`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    {tab.label}
                    {tab.id === "edit" && (
                      <span className="ml-auto text-[9px] normal-case font-medium">
                        via lista
                      </span>
                    )}
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
                Los cambios se sincronizan en tiempo real con el portfolio de la
                landing.
              </p>
            </div>
          </div>

          {/* WORKSPACE */}
          <div className="lg:col-span-9 bg-white border border-neutral-200 rounded-none p-6 sm:p-8 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#F27D26]" />

            <div className="border-b border-neutral-200 pb-4 mb-6 text-left">
              <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight uppercase">
                {activeTab === "list" && "Biblioteca de Proyectos Activos"}
                {activeTab === "add" && "Agregar Proyecto"}
                {activeTab === "edit" && `Editando: ${selectedProject?.title}`}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {activeTab === "list" && "Proyectos visibles en el portfolio. Podés editarlos o eliminarlos."}
                {activeTab === "add" && "Completá los datos del proyecto para publicarlo en el portfolio."}
                {activeTab === "edit" &&
                  "Modificá los campos que necesites y guardá los cambios."}
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
                {projects.length === 0 && (
                  <p className="text-xs text-neutral-400 text-center py-8">
                    No hay proyectos cargados todavía.
                  </p>
                )}
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
                        <span className="text-[10px] text-neutral-500 line-clamp-1">
                          {proj.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-[9px] font-bold text-neutral-400 uppercase bg-neutral-100 border border-neutral-200 px-2 py-1">
                        {proj.images.length} foto
                        {proj.images.length !== 1 ? "s" : ""}
                      </span>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-2 rounded-none bg-white border border-neutral-200 text-neutral-500 hover:text-[#F27D26] hover:border-[#F27D26]/30 hover:bg-neutral-50 duration-200 cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "¿Está seguro de que desea remover este proyecto?",
                            )
                          ) {
                            onDeleteProject(proj.id);
                            showNotification("¡Proyecto eliminado con éxito!");
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
              <ProjectForm
                data={newProject}
                setData={setNewProject}
                onSubmit={handleCreateProject}
                submitLabel="Publicar en Portfolio de Acercons"
              />
            )}

            {/* EDIT TAB */}
            {activeTab === "edit" && selectedProject && (
              <ProjectForm
                data={editProject}
                setData={setEditProject}
                onSubmit={handleUpdateProject}
                submitLabel="Guardar Cambios"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};