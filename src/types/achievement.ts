//src/types/achievement.ts
export interface Achievement {
  id: string;
  name: string;
  game: string;
  date: string | null;
  unlocked: boolean;
  type: 'achievement' | 'challenge';
}