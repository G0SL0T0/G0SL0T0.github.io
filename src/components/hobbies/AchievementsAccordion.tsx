// src/components/hobbies/AchievementsAccordion.tsx
'use client';
import { useState, useEffect } from 'react';
import { Achievement } from '@/types/achievement';

interface AchievementsAccordionProps {
  achievements: Achievement[];
  games: string[];
}

export default function AchievementsAccordion({ achievements, games }: AchievementsAccordionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterGame, setFilterGame] = useState<string>('все');
  
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterGame(e.target.value);
  };
  
  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
      // Блокируем прокрутку страницы
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      // Возвращаем прокрутку страницы
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  
  const filteredAchievements = filterGame === 'все' 
    ? achievements 
    : achievements.filter(a => a.game === filterGame);
    
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });
  
  const latestAchievements = achievements
    .filter(a => a.unlocked && a.name && a.game)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
    
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
    <>
      <div className="sidebar-block">
        <h3><i className="fas fa-trophy"></i> Последние достижения</h3>
        <ul className="achievements-list" id="latestAchievements">
          {latestAchievements.map(a => (
            <li key={`latest-${a.id}-${a.game}`}>
              <span className="ach-name">{a.name}</span>
              <small className="ach-meta">{a.game} — {new Date(a.date).toLocaleDateString('ru-RU')}</small>
            </li>
          ))}
        </ul>
        <button 
          type="button"
          className={`button achievements-button ${isModalOpen ? 'active' : ''}`} 
          onClick={openModal}
        >
          <i className="fas fa-list"></i> Все достижения
        </button>
      </div>
      
      {/* Полноэкранное модальное окно */}
      {isModalOpen && (
        <div className="fullscreen-modal" onClick={closeModal}>
          <div className="fullscreen-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Все достижения и челленджи</h2>
              <button className="modal-close-button" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="filter-section">
                <select 
                  className="game-filter" 
                  value={filterGame} 
                  onChange={handleFilterChange}
                >
                  <option value="все">Все игры</option>
                  {games.map(game => (
                    <option key={`game-filter-${game}`} value={game}>{game}</option>
                  ))}
                </select>
              </div>
              
              <div className="achievements-container">
                {sortedAchievements.map(a => (
                  <div key={`modal-${a.id}-${a.game}`} className={`achievement-item ${a.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="achievement-icon">
                      {getGameIcon(a.game)}
                    </div>
                    <div className="achievement-info">
                      <h3 className="achievement-name">{a.name}</h3>
                      <div className="achievement-meta">
                        <span className="game-title">{a.game}</span>
                        <span className="achievement-type">
                          {a.type === 'challenge' ? 'Челлендж' : 'Достижение'}
                        </span>
                      </div>
                      {a.unlocked && (
                        <div className="achievement-date">
                          {new Date(a.date).toLocaleDateString('ru-RU')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}