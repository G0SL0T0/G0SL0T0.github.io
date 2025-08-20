// src/components/hobbies/SteamGamesList.tsx
'use client';
import { useState } from 'react';
import { Game } from '@/types/game';
import { buildAchievementsDrawer } from '@/utils/gameUtils';
import { Achievement } from '@/types/achievement';

interface SteamGamesListProps {
  games: Game[];
  achievements: Achievement[];
  onOpenGallery: (gameName: string) => void;
}

export default function SteamGamesList({ games, achievements, onOpenGallery }: SteamGamesListProps) {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);
  
  const toggleList = () => {
    setIsListVisible(!isListVisible);
  };
  
  const openGameModal = (game: Game) => {
    setSelectedGame(game);
    // Сбрасываем состояние аккордеонов при открытии новой игры
    setAchievementsOpen(false);
    setChallengesOpen(false);
  };
  
  const closeGameModal = () => {
    setSelectedGame(null);
  };
  
  const toggleAchievements = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAchievementsOpen(!achievementsOpen);
    if (challengesOpen && !achievementsOpen) {
      setChallengesOpen(false);
    }
  };
  
  const toggleChallenges = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setChallengesOpen(!challengesOpen);
    if (achievementsOpen && !challengesOpen) {
      setAchievementsOpen(false);
    }
  };
  
  const handleScreensClick = (e: React.MouseEvent, gameName: string) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenGallery(gameName);
  };
  
  // Функция для создания иконки игры
  const getGameIcon = (gameName: string) => {
    const colors = [
      '#ff6b6b', '#f9844a', '#ee6c4d', '#c9184a', '#560bad', '#7209b7',
      '#3a0ca3', '#4361ee', '#4895ef', '#4cc9f0', '#06ffa5', '#52b788'
    ];
    
    const idx = [...gameName].reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
    const text = gameName.slice(0, 2).toUpperCase();
    
    return (
      <span className="game-icon" style={{ background: colors[idx] }}>
        {text}
      </span>
    );
  };
  
  return (
    <div className="steam-games">
      <h2><i className="fab fa-steam"></i> Остальная коллекция Steam</h2>
      <button 
        type="button"
        className="mini-toggle" 
        onClick={toggleList} 
        title="Показать/скрыть"
      >
        <i className={`fas ${isListVisible ? 'fa-times' : 'fa-list'}`}></i>
      </button>
      
      <div className={`steam-list ${isListVisible ? '' : 'hidden'}`}>
        <ul>
          {games.map(game => (
            <li key={game.id} className="steam-item" onClick={() => openGameModal(game)}>
              <img src={game.image} alt={game.name} />
              <div className="steam-item-overlay">
                <h4>{game.name}</h4>
                <span className="hours">{game.hours} ч</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Модальное окно для деталей игры */}
      {selectedGame && (
        <div className="steam-modal" onClick={closeGameModal}>
          <div className="steam-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="steam-modal-close" onClick={closeGameModal}>&times;</span>
            <h2>{selectedGame.name}</h2>
            <img src={selectedGame.image} alt={selectedGame.name} />
            <p><strong>Общее время:</strong> {selectedGame.hours} ч</p>
            <p><strong>Последний запуск:</strong> {selectedGame.lastLaunch}</p>
            <p><strong>Достижения:</strong> {selectedGame.achievements}</p>
            
            {/* Достижения для игры */}
            <div className="ach-drawer">
              {(() => {
                const { achievements: ach, challenges: chall } = buildAchievementsDrawer(selectedGame.name, achievements);
                return (
                  <>
                    {ach.done.length > 0 && (
                      <div className="ach-accordion">
                        <button 
                          type="button"
                          className={`ach-btn done ${achievementsOpen ? 'open' : ''}`} 
                          onClick={toggleAchievements}
                        >
                          Личные Достижения ({ach.done.length})
                          <i className={`fas fa-chevron-right ${achievementsOpen ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`ach-panel ${achievementsOpen ? 'open' : ''}`}>
                          {ach.done.map(a => (
                            <div key={`steam-ach-${a.id}`} className="ach-row done">
                              <i className="fas fa-check-circle"></i>
                              <span>{a.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {chall.done.length > 0 && (
                      <div className="ach-accordion">
                        <button 
                          type="button"
                          className={`ach-btn chal ${challengesOpen ? 'open' : ''}`} 
                          onClick={toggleChallenges}
                        >
                          Личные Челленджи ({chall.done.length})
                          <i className={`fas fa-chevron-right ${challengesOpen ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`ach-panel ${challengesOpen ? 'open' : ''}`}>
                          {chall.done.map(a => (
                            <div key={`steam-chall-${a.id}`} className="ach-row done">
                              <i className="fas fa-check-circle"></i>
                              <span>{a.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            
            <button 
              type="button"
              className="btn-screens" 
              onClick={(e) => handleScreensClick(e, selectedGame.name)}
            >
              <i className="fas fa-images"></i> Посмотреть скриншоты
            </button>
          </div>
        </div>
      )}
    </div>
  );
}