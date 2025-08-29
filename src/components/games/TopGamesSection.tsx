// src/components/games/TopGamesSection.tsx
'use client';

import { useState } from 'react';
import { topGames } from '@/data/gamesData';

export default function TopGamesSection() {
  const [openGame, setOpenGame] = useState<string | null>(null);

  const toggleGame = (gameName: string) => {
    setOpenGame(openGame === gameName ? null : gameName);
  };

  return (
    <section className="favorite-games-section">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <i className="fas fa-heart"></i> Топ-5 любимых игр
      </h2>

      <div className="top-vertical space-y-4">
        {topGames.map((game) => (
          <div key={game.name} className="top-card-wrapper">
            {/* Game Card */}
            <div 
              className="top-card relative h-48 bg-cover bg-center rounded-lg cursor-pointer transform transition hover:scale-105 shadow-lg"
              style={{ backgroundImage: `url(${game.image})` }}
              onClick={() => toggleGame(game.name)}
            >
              <div className="top-card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                <p className="text-white/90 text-sm">{game.hours}+ ч · Топ-{game.rank}</p>
              </div>
            </div>

            {/* Expandable Drawer */}
            {openGame === game.name && (
              <div className="top-card-drawer bg-white p-6 rounded-lg shadow-md mt-2">
                <h2 className="text-xl font-bold mb-3">{game.name}</h2>
                <p className="mb-2"><strong>Часы в Steam:</strong> {game.hours} ч</p>
                <p className="mb-2"><strong>Последний запуск:</strong> {game.lastLaunch}</p>
                <p className="mb-4"><strong>Достижения:</strong> {game.achievements}</p>
                <button 
                  className="btn-screens bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                  data-game={game.name}
                >
                  <i className="fas fa-images mr-2"></i> Посмотреть скриншоты
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}