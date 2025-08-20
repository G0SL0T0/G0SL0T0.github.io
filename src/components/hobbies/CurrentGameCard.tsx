// src/components/hobbies/CurrentGameCard.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Game } from '@/types/game';
import { buildAchievementsDrawer } from '@/utils/gameUtils';
import { Achievement } from '@/types/achievement';

interface CurrentGameCardProps {
  game: Game & { progress: number };
  achievements: Achievement[];
  onOpenGallery: (gameName: string) => void;
}

export default function CurrentGameCard({ game, achievements, onOpenGallery }: CurrentGameCardProps) {
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
    <div className={`current-game-card accordion-item ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
      <img src={game.image} alt={game.name} />
      <div className="current-info">
        <h3>{game.name} <small>({game.hours} ч)</small></h3>
        <p className="progress-label">{game.progress} % пройдено</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${game.progress}%` }}></div>
        </div>
        <p className="meta">{game.lastLaunch}</p>
      </div>
      <div 
        className="current-drawer" 
        style={{ maxHeight: isOpen ? `${drawerHeight}px` : '0' }}
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
      >
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
                  <div key={`cur-ach-${a.id}`} className="ach-row done">
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
                  <div key={`cur-chall-${a.id}`} className="ach-row done">
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
          <i className="fas fa-images"></i> Скриншоты
        </button>
      </div>
    </div>
  );
}