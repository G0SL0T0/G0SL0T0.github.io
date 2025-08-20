'use client';
import { achievement } from '@/types/achievement';

// Функция для получения цвета иконки на основе названия игры
export function getGameIconColor(gameName: string): string {
  const colors = [
    '#ff6b6b', '#f9844a', '#ee6c4d', '#c9184a', '#560bad', '#7209b7',
    '#3a0ca3', '#4361ee', '#4895ef', '#4cc9f0', '#06ffa5', '#52b788'
  ];
  
  const idx = [...gameName].reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

// Функция для получения текста иконки на основе названия игры
export function getGameIconText(gameName: string): string {
  return gameName.slice(0, 2).toUpperCase();
}

export function getAchievementsForGame(gameName: string, achievements: achievement[]) {
  return achievements.filter(a => a.game === gameName && a.name);
}

export function buildAchievementsDrawer(gameName: string, achievements: achievement[]) {
  const list = getAchievementsForGame(gameName, achievements);
  const achDone = list.filter(a => a.type === 'achievement' && a.unlocked);
  const achTodo = list.filter(a => a.type === 'achievement' && !a.unlocked);
  const challDone = list.filter(a => a.type === 'challenge' && a.unlocked);
  const challTodo = list.filter(a => a.type === 'challenge' && !a.unlocked);
  
  return {
    achievements: { done: achDone, todo: achTodo },
    challenges: { done: challDone, todo: challTodo }
  };
}