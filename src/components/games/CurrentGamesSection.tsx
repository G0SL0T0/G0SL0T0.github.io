// src/components/games/CurrentGamesSection.tsx
'use client';

import { useState } from 'react';
import { currentGames } from '@/data/gamesData';

export default function CurrentGamesSection() {
  const [openGame, setOpenGame] = useState<string | null>(null);

  const toggleGame = (gameName: string) => {
    setOpenGame(openGame === gameName ? null : gameName);
  };

  return (
    <section className="current-games-section">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <i className="fas fa-play"></i> Сейчас играю
      </h2>
      
      <blockquote className="speech expandable bg-gray-100 p-4 rounded-lg mb-6 cursor-pointer">
        <span className="speech-preview text-gray-700">
          «Самые ценные достижения — те, что мы ставим перед собой…»
        </span>
        <span className="speech-full hidden text-gray-700">
          «Самые ценные достижения в играх — те, что мы ставим перед собой. Я заранее придумываю челленджи: пройти уровень без урона, пройти игру без фаст тревелов или миникарты, построить мегабазу. Эти личные цели не дают мне бросить игру на полпути и превращают каждую сессию в маленький квест.»
        </span>
      </blockquote>

      <div className="current-games-js space-y-4">
        {currentGames.map((game) => (
          <div 
            key={game.name} 
            className={`current-game-card bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${openGame === game.name ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => toggleGame(game.name)}
          >
            <div className="flex gap-4">
              <img 
                src={game.image} 
                alt={game.name} 
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="current-info flex-1">
                <h3 className="text-lg font-bold">
                  {game.name} <small className="text-gray-600">({game.hours} ч)</small>
                </h3>
                <p className="progress-label text-sm text-gray-600 mb-2">{game.progress} % пройдено</p>
                <div className="progress-bar w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="progress bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-600"
                    style={{ width: `${game.progress}%` }}
                  ></div>
                </div>
                <p className="meta text-sm text-gray-500">{game.lastLaunch}</p>
              </div>
            </div>

            {/* Expandable Drawer */}
            {openGame === game.name && (
              <div className="current-drawer mt-4 pt-4 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Достижения:</h4>
                  <p className="text-sm text-gray-600">{game.achievements}</p>
                </div>
                <button 
                  className="btn-screens bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                  data-game={game.name}
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-images mr-2"></i> Скриншоты
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}