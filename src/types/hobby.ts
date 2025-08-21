// src/types/hobby.ts
export interface Hobby {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  stats?: {
    label: string;
    value: string;
  }[];
}
