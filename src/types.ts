export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
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