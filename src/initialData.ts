import { Project, Service, WorkStep } from "./types";

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Galpón Logístico Premium con Estructura de Acero",
    category: "Construcción de Galpones",
    area: "12,500 m²",
    year: "2025",
    location: "Córdoba Capital",
    steelWeight: "280 Toneladas",
    description:
      "Construcción de un galpón logístico de gran escala con estructura metálica de alma llena, amplias luces libres y cerramientos termoacústicos.",
    fullDescription:
      "Proyecto industrial desarrollado para operaciones logísticas y almacenamiento de alto tránsito. La obra incluyó fabricación y montaje de pórticos metálicos de gran porte, cubiertas galvanizadas tipo standing seam y sistema de ventilación natural. Se utilizaron perfiles estructurales certificados y pintura epoxi anticorrosiva para garantizar durabilidad y bajo mantenimiento. El montaje de las 280 toneladas de acero se ejecutó en aproximadamente 45 días mediante grúas telescópicas y conexiones abulonadas de alta resistencia.",
    image: "/src/assets/images/balcon.webp",
    images: [
      "/src/assets/images/balcon.webp",
      "/src/assets/images/balcon2.webp",
    ],
    featured: true
  },
  {
    id: "proj-2",
    title: "Estructura Frontal para Nave Industrial",
    category: "Estructuras Metálicas",
    area: "4,200 m²",
    year: "2025",
    location: "Villa María, Córdoba",
    steelWeight: "120 Toneladas",
    description:
      "Fabricación y montaje de estructura frontal metálica para nave industrial con terminaciones de alta resistencia.",
    fullDescription:
      "Obra orientada al sector industrial, diseñada para soportar grandes cargas operativas y amplias luces sin columnas intermedias. Se fabricaron pórticos y vigas mediante procesos mecanizados CNC, incorporando pintura poliuretánica resistente a rayos UV y humedad. El proyecto contempló montaje integral de cerramientos metálicos, refuerzos estructurales y terminaciones para futuras ampliaciones.",
    image: "/src/assets/images/estructura.webp",
    images: [
      "/src/assets/images/estructura.webp",
      "/src/assets/images/estructura2.webp"
    ],
    featured: false
  },
  {
    id: "proj-3",
    title: "Cartel de Ruta Estructural",
    category: "Montajes Metálicos",
    area: "50 m²",
    year: "2024",
    location: "Av. Circunvalación, Córdoba",
    steelWeight: "8 Toneladas",
    description:
      "Montaje de cartel metálico de gran porte sobre estructura tubular reforzada para vía rápida.",
    fullDescription:
      "Proyecto realizado para señalización vial y publicidad exterior sobre corredor de alto tránsito. La estructura fue diseñada para soportar cargas de viento y vibraciones constantes mediante columnas tubulares y bases de hormigón armado. El trabajo incluyó fabricación en taller, traslado especial y montaje con grúas hidráulicas, garantizando precisión en alineación y seguridad estructural.",
    image: "/src/assets/images/cartel.webp",
    images: [
      "/src/assets/images/cartel.webp",
      "/src/assets/images/cartel2.webp"
    ],
    featured: false
  },
  {
    id: "proj-4",
    title: "Portón Industrial Corredizo",
    category: "Obras Metálicas",
    area: "1,800 m²",
    year: "2024",
    location: "Córdoba Capital",
    steelWeight: "12 Toneladas",
    description:
      "Fabricación e instalación de portón industrial metálico corredizo para complejo logístico.",
    fullDescription:
      "Desarrollo de portón metálico reforzado para uso intensivo industrial, construido con perfilería estructural pesada y sistema de desplazamiento sobre guía reforzada. El proyecto incluyó automatización, tratamiento anticorrosivo y pintura industrial horneada. Se priorizó resistencia mecánica, seguridad operativa y bajo mantenimiento para tránsito constante de vehículos pesados.",
    image: "/src/assets/images/frente.webp",
    images: [
      "/src/assets/images/frente.webp",
      "/src/assets/images/frente2.webp"
    ],
    featured: false
  },
  {
    id: "proj-5",
    title: "Escaleras de Escape Metálicas",
    category: "Obras Metálicas",
    area: "2,100 m²",
    year: "2023",
    location: "Carlos Paz, Córdoba",
    steelWeight: "52 Toneladas",
    description:
      "Fabricación y montaje de escaleras de emergencia exteriores con estructura metálica galvanizada.",
    fullDescription:
      "Proyecto desarrollado para edificio industrial y comercial, cumpliendo normativas de evacuación y seguridad. Se ejecutaron escaleras metálicas modulares con plataformas intermedias, barandas reforzadas y escalones antideslizantes. La estructura fue protegida mediante galvanizado en caliente para mejorar la resistencia a la intemperie y prolongar la vida útil del conjunto.",
    image: "/src/assets/images/escaleras.webp",
    images: [
      "/src/assets/images/escaleras.webp",
      "/src/assets/images/escaleras2.webp"
    ],
    featured: false
  }
];

export const initialServices: Service[] = [
  {
    id: "serv-1",
    title: "Galpones y Naves Industriales",
    description:
      "Construimos galpones metálicos completos para uso industrial, logístico o comercial en Córdoba y la región.",
    detailedDescription:
      "Nos encargamos de todo: estructura metálica, cubierta, cerramientos y montaje. Trabajamos con cada cliente para definir dimensiones, accesos y terminaciones según el uso que le van a dar. El resultado es un galpón sólido, funcional y listo para trabajar.",
    iconName: "Warehouse",
    features: [
      "Estructuras de acero a medida",
      "Cubiertas y cerramientos metálicos",
      "Amplias luces sin columnas intermedias",
      "Montaje completo en obra",
    ],
  },
  {
    id: "serv-2",
    title: "Estructuras Metálicas",
    description:
      "Fabricamos y montamos estructuras de acero para todo tipo de obras industriales y comerciales.",
    detailedDescription:
      "Desde columnas y vigas hasta pórticos complejos, fabricamos en nuestro taller y montamos en obra. Trabajamos con planos propios o del cliente, adaptándonos a los tiempos y condiciones de cada proyecto.",
    iconName: "Grid",
    features: [
      "Columnas, vigas y pórticos",
      "Fabricación en taller propio",
      "Montaje con equipos de izaje",
      "Escaleras, plataformas y pasarelas",
    ],
  },
  {
    id: "serv-3",
    title: "Portones y Obras Menores",
    description:
      "Fabricamos portones, barandas, rejas y todo tipo de trabajo metálico a medida.",
    detailedDescription:
      "Para obras más chicas o trabajos puntuales, fabricamos e instalamos portones corredizos, batientes, barandas, rejas y estructuras metálicas de menor escala. Mismo proceso, misma atención que en las obras grandes.",
    iconName: "Construction",
    features: [
      "Portones corredizos y batientes",
      "Barandas y rejas",
      "Soldadura en taller y en obra",
      "Tratamiento anticorrosivo",
    ],
  },
];

export const initialWorkSteps: WorkStep[] = [
  {
    step: 1,
    title: "Consulta y Medición",
    subtitle: "Arrancamos desde el terreno",
    description:
      "Nos juntamos con el cliente, vemos el lugar y entendemos qué necesita. Con esa información armamos un presupuesto claro y sin sorpresas.",
    iconName: "DraftingCompass",
  },
  {
    step: 2,
    title: "Fabricación",
    subtitle: "Todo se hace en nuestro taller",
    description:
      "Cortamos, soldamos y preparamos cada pieza en nuestro taller. Antes de salir a obra, revisamos que todo esté bien terminado y listo para montar.",
    iconName: "Factory",
  },
  {
    step: 3,
    title: "Montaje en Obra",
    subtitle: "Personal y equipos propios",
    description:
      "Llevamos nuestro equipo y los elementos necesarios para montar la estructura en el lugar. Coordinamos los tiempos para no generar demoras en la obra del cliente.",
    iconName: "Compass",
  },
  {
    step: 4,
    title: "Entrega",
    subtitle: "El trabajo terminado",
    description:
      "Antes de entregar recorremos la obra con el cliente, revisamos terminaciones y nos aseguramos de que todo quedó como se acordó.",
    iconName: "Award",
  },
];