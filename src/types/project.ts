// src/types/project.ts
export interface ProjectFeature {
  text: string;
}

export interface ProjectTech {
  name: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  features: ProjectFeature[];
  technologies: ProjectTech[];
  screenshots: ProjectScreenshot[];
  demoUrl?: string;
  githubUrl?: string;
  thumbnail: string;
  badge?: string;
  logo?: string;
  logoType?: 'li' | 'pixel' | 'uc';
  comingSoon?: boolean;
}