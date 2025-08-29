// src/types/game.ts
export interface Game {
  name: string;
  hours: number;
  lastLaunch: string;
  achievements: string;
  image: string;
}

export interface TopGame extends Game {
  rank: number;
  description?: string;
}

export interface CurrentGame extends Game {
  progress: number;
}

export interface Achievement {
  id: string;
  game: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

export interface GameStats {
  totalHours: number;
  totalAchievements: number;
  totalGames: number;
  achievementPercentage: number;
}