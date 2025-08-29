// src/components/games/SteamGamesSection.tsx
'use client';

import { useState } from 'react';
import { gamesData } from '@/data/gamesData';

export default function SteamGamesSection() {
  const [showSteamList, setShowSteamList] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const toggleSteamList = () => {
    setShowSteamList(!showSteamList);
  };

  const openGameModal = (game: any) => {
    setSelectedGame(game);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
  };

  return (
    <section className="steam-games mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <i className="fab fa-steam"></i> Остальная коллекция Steam
        </h2>
        <button 
          className="mini-toggle bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full transition transform hover:scale-110"
          onClick={toggleSteamList}
          title="Показать/скрыть"
        >
          <i className="fas fa-list"></i>
        </button>
      </div>

      <div className={`steam-list ${showSteamList ? 'block' : 'hidden'}`}>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesData.map((game) => (
            <li key={game.name}>
              <div 
                className="steam-item relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
                onClick={() => openGameModal(game)}
              >
                {/* Game Image */}
                <img 
                  src={game.image} 
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="steam-item-overlay absolute inset-0 bg-gradient-to-t from-transparent via-black/60 to-black/85 flex flex-col justify-end p-4">
                  <h4 className="text-white font-bold text-lg mb-1">{game.name}</h4>
                  <div className="hours text-white/90 text-sm flex items-center gap-2">
                    <i className="fas fa-clock text-blue-400"></i>
                    {game.hours} ч
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <div className="steam-modal fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="steam-modal-content bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              className="steam-modal-close absolute top-2 right-2 text-2xl cursor-pointer hover:text-gray-600"
              onClick={closeGameModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-600">{selectedGame.name}</h2>
            <div className="space-y-2">
              <p><strong>Часы в игре:</strong> {selectedGame.hours} ч</p>
              <p><strong>Последний запуск:</strong> {selectedGame.lastLaunch}</p>
              <p><strong>Достижения:</strong> {selectedGame.achievements}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}