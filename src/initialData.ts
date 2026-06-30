import { Project, Service, WorkStep } from "./types";

// Los proyectos ahora se cargan exclusivamente desde el panel de admin
// (Firebase / Firestore). Este array queda vacío como fallback inicial.
export const initialProjects: Project[] = [];

export const initialServices: Service[] = [
  {
    id: "serv-1",
    title: "Naves Industriales",
    description:
      "Diseñamos, fabricamos y montamos naves industriales y estructuras metálicas de gran porte para proyectos industriales y comerciales.",
    detailedDescription:
      "Desarrollamos soluciones integrales para naves industriales, desde la fabricación hasta el montaje en obra. Construimos estructuras de grandes luces, aleros, revestimientos con paneles térmicos y sistemas diseñados para maximizar el espacio útil y la resistencia estructural.",
    iconName: "Warehouse",
    features: [
      "Estructuras de alma llena de grandes luces",
      "Estructuras de inercia variable",
      "Perfilería y perfiles conformados",
      "Montaje en obra con equipo propio",
      "Aleros de grandes dimensiones",
      "Revestimientos con paneles térmicos",
    ],
  },
  {
    id: "serv-2",
    title: "Estructuras Metálicas Especiales",
    description:
      "Fabricamos estructuras metálicas especiales adaptadas a las necesidades de cada industria y proyecto.",
    detailedDescription:
      "Diseñamos y fabricamos estructuras metálicas específicas para distintos sectores productivos. Realizamos trabajos industriales, viales y de infraestructura, garantizando calidad, precisión y durabilidad en cada pieza.",
    iconName: "Grid",
    features: [
      "Corte y doblado de armaduras para hormigón",
      "Cartelería de advertencia para redes",
      "Cartelería vial",
      "Estructuras para canteras y establecimientos productivos",
      "Rampas, escaleras y pasarelas",
      "Barandas y protecciones metálicas",
    ],
  },
  {
    id: "serv-3",
    title: "Estructuras Metálicas Livianas",
    description:
      "Fabricamos estructuras metálicas livianas personalizadas para viviendas, comercios e industrias.",
    detailedDescription:
      "Realizamos estructuras metálicas livianas a medida, combinando funcionalidad, diseño y resistencia. Fabricamos cubiertas, rejas, portones automatizados, entrepisos y otros proyectos adaptados a cada necesidad.",
    iconName: "Construction",
    features: [
      "Cubiertas para ingresos vehiculares",
      "Rejas artesanales",
      "Portones automatizados",
      "Cubiertas para locales comerciales",
      "Cenefas metálicas",
      "Entrepisos y escaleras",
      "Estructuras para paneles solares",
    ],
  },
  {
    id: "serv-4",
    title: "Obras Civiles",
    description:
      "Ejecutamos obras civiles e infraestructura complementaria para proyectos industriales y comerciales.",
    detailedDescription:
      "Brindamos soluciones integrales en obras civiles, realizando movimientos de suelo, fundaciones, pisos industriales e instalaciones necesarias para acompañar cada proyecto constructivo.",
    iconName: "Building2",
    features: [
      "Replanteos topográficos",
      "Excavaciones y movimiento de suelos",
      "Fundaciones corridas y bases",
      "Perforación de pilotes",
      "Pisos industriales, pavimentos y rampas",
      "Mampostería",
      "Instalaciones eléctricas, sanitarias y de agua",
      "Calefacción y aire acondicionado",
    ],
  },
];

export const initialWorkSteps: WorkStep[] = [
  {
    step: 1,
    title: "Consulta, Medición y Diseño",
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
    title: "Logistica, Transporte y Montaje",
    subtitle: "Personal y equipos propios",
    description:
      "Llevamos nuestro equipo y los elementos necesarios para montar la estructura en el lugar. Coordinamos los tiempos para no generar demoras en la obra del cliente.",
    iconName: "Compass",
  },
  {
    step: 4,
    title: "Entrega Final",
    subtitle: "El trabajo terminado",
    description:
      "Antes de entregar recorremos la obra con el cliente, revisamos terminaciones y nos aseguramos de que todo quedó como se acordó.",
    iconName: "Award",
  },
];