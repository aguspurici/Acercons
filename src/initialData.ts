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
    title: "Estructuras Metálicas",
    description:
      "Fabricación y montaje de estructuras metálicas para proyectos industriales y comerciales.",
    detailedDescription:
      "Realizamos estructuras metálicas adaptadas a cada proyecto, incluyendo columnas, vigas, pórticos y refuerzos estructurales. Trabajamos con planos técnicos y fabricación en taller para garantizar un montaje preciso y seguro en obra.",
    iconName: "Grid",
    features: [
      "Fabricación a medida",
      "Pórticos metálicos",
      "Montaje en obra",
      "Estructuras para galpones y naves"
    ]
  },
  {
    id: "serv-2",
    title: "Construcción de Galpones",
    description:
      "Construcción de galpones metálicos para uso industrial, comercial y logístico.",
    detailedDescription:
      "Desarrollamos galpones completos según las necesidades de cada cliente. Nos encargamos de la estructura metálica, cubiertas, cerramientos y montaje general de la obra, priorizando funcionalidad y resistencia.",
    iconName: "Warehouse",
    features: [
      "Galpones industriales",
      "Cubiertas metálicas",
      "Amplias dimensiones",
      "Montaje rápido"
    ]
  },
  {
    id: "serv-3",
    title: "Techos Industriales",
    description:
      "Instalación y reparación de techos metálicos para industrias y depósitos.",
    detailedDescription:
      "Trabajamos en colocación y renovación de cubiertas metálicas utilizando chapas galvanizadas y sistemas de aislación térmica. También realizamos canaletas y soluciones de desagüe para techos industriales.",
    iconName: "Layers",
    features: [
      "Chapas galvanizadas",
      "Aislación térmica",
      "Canaletas y desagües",
      "Reparación de cubiertas"
    ]
  },
  {
    id: "serv-4",
    title: "Montajes Metálicos",
    description:
      "Montaje de estructuras metálicas con equipos y personal especializado.",
    detailedDescription:
      "Realizamos montaje de estructuras en obra utilizando equipos de izaje y herramientas adecuadas para cada proyecto. Coordinamos las tareas para lograr instalaciones seguras y eficientes.",
    iconName: "Wrench",
    features: [
      "Montaje en altura",
      "Equipos de izaje",
      "Personal capacitado",
      "Trabajos industriales"
    ]
  },
  {
    id: "serv-5",
    title: "Soldadura Industrial",
    description:
      "Trabajos de soldadura para estructuras y piezas metálicas.",
    detailedDescription:
      "Realizamos soldaduras en taller y en obra para diferentes tipos de estructuras metálicas. Priorizamos resistencia, prolijidad y correcta terminación en cada trabajo.",
    iconName: "Flame",
    features: [
      "Soldadura MIG y eléctrica",
      "Trabajos en taller",
      "Reparaciones metálicas",
      "Uniones estructurales"
    ]
  },
  {
    id: "serv-6",
    title: "Obras Metálicas",
    description:
      "Fabricación de escaleras, barandas, plataformas y estructuras metálicas.",
    detailedDescription:
      "Desarrollamos soluciones metálicas funcionales para industrias, comercios y obras particulares. Fabricamos escaleras, portones, plataformas y estructuras adaptadas a cada necesidad.",
    iconName: "Construction",
    features: [
      "Escaleras metálicas",
      "Barandas",
      "Plataformas",
      "Portones y estructuras"
    ]
  }
];

export const initialWorkSteps: WorkStep[] = [
  {
    step: 1,
    title: "Diseño e Ingeniería",
    subtitle: "Precisión en modelado 3D",
    description: "Analizamos los requerimientos estructurales empleando cálculo computacional y modelado BIM 3D. Definimos materiales, cargas vivas, cargas sísmicas, vientos y optimizamos el consumo de acero para asegurar la máxima viabilidad de la inversión antes de iniciar la producción.",
    iconName: "DraftingCompass"
  },
  {
    step: 2,
    title: "Fabricación",
    subtitle: "Calidad controlada en talleres",
    description: "Las piezas metálicas se cortan, perforan, enderezan y sueldan en nuestros talleres industriales. Aplicando maquinarias semiautomatizadas CNC, logramos un ensamble impecable de las vigas y columnas bajo soldadura inspeccionada al 100% por inspectores calificados.",
    iconName: "Factory"
  },
  {
    step: 3,
    title: "Montaje en Obra",
    subtitle: "Logística y erección rápida",
    description: "Desplegamos equipos de operarios experimentados con grúas de gran tonelaje, manipuladores telescópicos e instrumental de topografía satelital. Izamos, nivelamos y abulonamos de manera segura las columnas logrando levantar la estructura completa en plazos ajustados con seguridad rigurosa.",
    iconName: "Compass"
  },
  {
    step: 4,
    title: "Entrega Certificada",
    subtitle: "Inspección final y recepción",
    description: "Inspeccionamos cada conexión, la estanqueidad pluvial de cubiertas y la protección de los perfiles metálicos contra el óxido. Entregamos la obra con su libro de ingeniería conforme a obra, certificaciones de ensayos no destructivos de soldaduras y garantía estructural por escrito.",
    iconName: "Award"
  }
];
