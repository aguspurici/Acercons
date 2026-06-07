export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  area: string;
  year: string;
  location: string;
  steelWeight?: string;
  images: string[];
  featured: boolean;
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
