// src/types/skills.ts
export interface Skill {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  tooltip?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}