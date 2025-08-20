// src/types/hobby.ts
export interface Hobby {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Game {
  name: string;
  hours: number;
  lastLaunch: string;
  achievements: string;
  image: string;
}

export interface Achievement {
  name: string;
  game: string;
  date: string;
  unlocked: boolean;
  type: 'achievement' | 'challenge';
}