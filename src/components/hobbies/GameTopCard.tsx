// src/components/hobbies/GameTopCard.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Game } from '@/types/game';
import { buildAchievementsDrawer } from '@/utils/gameUtils';
import { Achievement } from '@/types/achievement';

interface GameTopCardProps {
  game: Game;
  achievements: Achievement[];
  onOpenGallery: (gameName: string) => void;
}

export default function GameTopCard({ game, achievements, onOpenGallery }: GameTopCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [drawerHeight, setDrawerHeight] = useState<number>(0);
  
  const { achievements: ach, challenges: chall } = buildAchievementsDrawer(game.name, achievements);
  
  // Рассчитываем высоту drawer в зависимости от контента
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      setTimeout(() => {
        if (drawerRef.current) {
          const height = drawerRef.current.scrollHeight;
          setDrawerHeight(height);
        }
      }, 10);
    }
  }, [isOpen, achievementsOpen, challengesOpen, ach, chall]);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // Закрываем аккордеоны при закрытии карточки
    if (isOpen) {
      setAchievementsOpen(false);
      setChallengesOpen(false);
    }
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

  const handleScreensClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenGallery(game.name);
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
    <div className={`top-card-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="top-card" style={{ backgroundImage: `url(${game.image})` }} onClick={toggleOpen}>
        <div className="top-card-overlay">
          <h3>{game.name}</h3>
          <p className="details">{game.hours}+ ч · Топ-5</p>
        </div>
      </div>
      <div 
        className={`top-card-drawer ${isOpen ? 'open' : ''}`} 
        style={{ maxHeight: isOpen ? `${drawerHeight}px` : '0' }}
        ref={drawerRef}
      >
        <h2>{game.name}</h2>
        <p><strong>Часы в Steam:</strong> {game.hours} ч</p>
        <p><strong>Последний запуск:</strong> {game.lastLaunch}</p>
        <p><strong>Достижения:</strong> {game.achievements}</p>
        
        {/* Достижения */}
        <div className="ach-drawer">
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
                  <div key={`top-ach-${a.id}`} className="ach-row done">
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
                  <div key={`top-chall-${a.id}`} className="ach-row done">
                    <i className="fas fa-check-circle"></i>
                    <span>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="button"
          className="btn-screens" 
          onClick={handleScreensClick}
        >
          <i className="fas fa-images"></i> Посмотреть скриншоты
        </button>
      </div>
    </div>
  );
}