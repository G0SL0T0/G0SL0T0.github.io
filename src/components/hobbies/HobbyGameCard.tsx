// src/components/hobbies/HobbyGameCard.tsx
'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Game } from '@/types/game';

interface HobbyGameCardProps {
  game: Game;
  onClick?: () => void;
}

const HobbyGameCard = memo(({ game, onClick }: HobbyGameCardProps) => {
  return (
    <div 
      className="hobby-game-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Game Image */}
      <div className="relative h-48 bg-gray-200">
        <Image 
          src={game.image} 
          alt={game.name} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Status Badge */}
        {game.lastLaunch === 'Активная игра' && (
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              <i className="fas fa-circle text-xs mr-1"></i>
              Активно
            </span>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{game.name}</h3>
        
        <div className="space-y-2">
          {/* Hours */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <i className="fas fa-clock text-blue-500"></i>
              Часы:
            </span>
            <span className="font-semibold">{game.hours} ч</span>
          </div>

          {/* Last Launch */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <i className="fas fa-calendar text-green-500"></i>
              Последний запуск:
            </span>
            <span className="font-semibold text-xs">{game.lastLaunch}</span>
          </div>

          {/* Achievements */}
          {game.achievements && game.achievements !== '-' && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-1">
                <i className="fas fa-trophy text-yellow-500"></i>
                Достижения:
              </span>
              <span className="font-semibold text-xs">{game.achievements}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
          <i className="fas fa-info-circle"></i>
          Подробнее
        </button>
      </div>
    </div>
  );
});

HobbyGameCard.displayName = 'HobbyGameCard';

export default HobbyGameCard;