export const PROJECT_CATEGORIES = [
  "Galpones y Naves Industriales",
  "Estructuras Metálicas",
  "Portones y Obras Menores",
  "Escaleras y Pasarelas",
  "Techos Metálicos",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  images: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  features: string[];
}

export interface WorkStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}