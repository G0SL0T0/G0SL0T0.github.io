// src/components/hobbies/HobbiesGamesSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { gamesData, topGames, currentGames, gameStats } from '@/data/gamesData';
import GameCard from './HobbyGameCard';

interface HobbiesGamesSectionProps {
  title?: string;
  description?: string;
  showStats?: boolean;
  showTopGames?: boolean;
  showCurrentGames?: boolean;
  limit?: number;
}

export default function HobbiesGamesSection({ 
  title = "Игровые увлечения", 
  description = "От ретро-классики до современных AAA-проектов",
  showStats = true,
  showTopGames = true,
  showCurrentGames = true,
  limit = 6
}: HobbiesGamesSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [showAllGames, setShowAllGames] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openGameModal = (game: any) => {
    setSelectedGame(game);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
  };

  const toggleShowAllGames = () => {
    setShowAllGames(!showAllGames);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const displayGames = showAllGames ? gamesData : gamesData.slice(0, limit);

  return (
    <section className="hobbies-games-section">
      {/* Header */}
      <div className="section-header mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <i className="fas fa-gamepad text-blue-500"></i>
          {title}
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl">
          {description}
        </p>
      </div>

      {/* Game Stats */}
      {showStats && (
        <div className="game-stats mb-8">
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-lg text-center transform transition hover:scale-105">
              <i className="fas fa-hourglass text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold">{gameStats.totalHours.toLocaleString()}+</h3>
              <p className="text-lg opacity-90">Часов в играх</p>
            </div>
            <div className="stat-card bg-gradient-to-r from-green-500 to-green-400 text-white p-6 rounded-lg text-center transform transition hover:scale-105">
              <i className="fas fa-trophy text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold">{gameStats.achievementPercentage}%</h3>
              <p className="text-lg opacity-90">Достижений в Steam</p>
            </div>
            <div className="stat-card bg-gradient-to-r from-purple-500 to-purple-400 text-white p-6 rounded-lg text-center transform transition hover:scale-105">
              <i className="fas fa-gamepad text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold">{gameStats.totalGames}+</h3>
              <p className="text-lg opacity-90">Игр в коллекции</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Games */}
      {showTopGames && (
        <div className="top-games mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-heart text-red-500"></i>
            Топ-5 любимых игр
          </h3>
          <div className="top-games-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topGames.map((game, index) => (
              <div key={game.name} className="top-game-card">
                <div className="relative h-48 bg-cover bg-center rounded-lg cursor-pointer transform transition hover:scale-105 shadow-lg"
                     style={{ backgroundImage: `url(${game.image})` }}
                     onClick={() => openGameModal(game)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg flex flex-col justify-end p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                        #{game.rank}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm">{game.name}</h4>
                    <p className="text-white/80 text-xs">{game.hours}+ ч</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Games */}
      {showCurrentGames && (
        <div className="current-games mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-play text-green-500"></i>
            Сейчас играю
          </h3>
          <div className="current-games-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGames.map((game) => (
              <div key={game.name} className="current-game-card bg-white p-4 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{game.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{game.hours} ч</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Прогресс</span>
                        <span>{game.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                          style={{ width: `${game.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{game.lastLaunch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Games Grid */}
      <div className="games-collection">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-th text-blue-500"></i>
            Коллекция игр
          </h3>
          {gamesData.length > limit && (
            <button 
              onClick={toggleShowAllGames}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              <i className="fas fa-{showAllGames ? 'eye-slash' : 'eye'}"></i>
              {showAllGames ? 'Скрыть' : 'Показать все'}
            </button>
          )}
        </div>
        
        <div className="games-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGames.map((game) => (
            <GameCard 
              key={game.name} 
              game={game} 
              onClick={() => openGameModal(game)}
            />
          ))}
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <div className="game-modal fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="game-modal-content bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              className="absolute top-2 right-2 text-2xl cursor-pointer hover:text-gray-600"
              onClick={closeGameModal}
            >
              &times;
            </button>
            <div className="text-center mb-4">
              <img 
                src={selectedGame.image} 
                alt={selectedGame.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-blue-600">{selectedGame.name}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Часы в игре:</span>
                <span>{selectedGame.hours} ч</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Последний запуск:</span>
                <span>{selectedGame.lastLaunch}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Достижения:</span>
                <span>{selectedGame.achievements}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
                <i className="fas fa-external-link-alt mr-2"></i>
                Steam
              </button>
              <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition">
                <i className="fas fa-images mr-2"></i>
                Скриншоты
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}