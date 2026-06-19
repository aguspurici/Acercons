import { Project, Service, WorkStep } from "./types";

// Los proyectos ahora se cargan exclusivamente desde el panel de admin
// (Firebase / Firestore). Este array queda vacío como fallback inicial.
export const initialProjects: Project[] = [];

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
    title: "Obras Menores",
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