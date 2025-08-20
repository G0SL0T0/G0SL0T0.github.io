// src/components/hobbies/GalleryModal.tsx
'use client';
import { useState, useEffect } from 'react';

interface Screenshot {
  url: string;
  game: string;
  date: number;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGame?: string;
}

export default function GalleryModal({ isOpen, onClose, initialGame = 'all' }: GalleryModalProps) {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [filteredScreenshots, setFilteredScreenshots] = useState<Screenshot[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>(initialGame);
  const [sortOrder, setSortOrder] = useState<string>('date-desc');
  const [displayedCount, setDisplayedCount] = useState<number>(12);
  const [viewerImage, setViewerImage] = useState<string | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number>(-1);
  
  useEffect(() => {
    if (isOpen) {
      loadScreenshots();
    }
  }, [isOpen]);
  
  useEffect(() => {
    filterAndSortScreenshots();
  }, [screenshots, selectedGame, sortOrder]);
  
  const loadScreenshots = async () => {
    try {
      // В реальном приложении здесь будет запрос к API
      const mockScreenshots: Screenshot[] = [
        { url: '/img/screenshot/screenshot1.jpg', game: 'The Witcher 3: Wild Hunt', date: Date.now() - 86400000 },
        { url: '/img/screenshot/screenshot2.jpg', game: 'The Witcher 3: Wild Hunt', date: Date.now() - 172800000 },
        { url: '/img/screenshot/screenshot3.jpg', game: 'GTFO', date: Date.now() - 259200000 },
        // Добавьте больше скриншотов по необходимости
      ];
      
      setScreenshots(mockScreenshots);
      
      // Получаем уникальные игры
      const uniqueGames = [...new Set(mockScreenshots.map(s => s.game))].sort();
      setGames(uniqueGames);
    } catch (error) {
      console.error('Ошибка загрузки скриншотов:', error);
    }
  };
  
  const filterAndSortScreenshots = () => {
    let filtered = [...screenshots];
    
    // Фильтр по игре
    if (selectedGame !== 'all') {
      filtered = filtered.filter(s => s.game === selectedGame);
    }
    
    // Сортировка
    const sortMultiplier = sortOrder === 'date-asc' ? 1 : -1;
    filtered.sort((a, b) => sortMultiplier * (a.date - b.date));
    
    setFilteredScreenshots(filtered);
    setDisplayedCount(12);
  };
  
  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };
  
  const loadMore = () => {
    setDisplayedCount(prev => prev + 12);
  };
  
  const openViewer = (url: string) => {
    const index = filteredScreenshots.findIndex(s => s.url === url);
    setViewerImage(url);
    setViewerIndex(index);
  };
  
  const closeViewer = () => {
    setViewerImage(null);
    setViewerIndex(-1);
  };
  
  const goToPrev = () => {
    if (viewerIndex > 0) {
      const prevIndex = viewerIndex - 1;
      setViewerImage(filteredScreenshots[prevIndex].url);
      setViewerIndex(prevIndex);
    }
  };
  
  const goToNext = () => {
    if (viewerIndex < filteredScreenshots.length - 1) {
      const nextIndex = viewerIndex + 1;
      setViewerImage(filteredScreenshots[nextIndex].url);
      setViewerIndex(nextIndex);
    }
  };
  
  // Обработчик закрытия модального окна
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewerImage) {
          closeViewer();
        } else {
          onClose();
        }
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, viewerImage]);
  
  const displayedScreenshots = filteredScreenshots.slice(0, displayedCount);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal" onClick={handleModalClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        
        <div className="filter-row">
          <select value={selectedGame} onChange={handleGameChange}>
            <option value="all">Все игры</option>
            {games.map(game => (
              <option key={`gallery-game-${game}`} value={game}>{game}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="date-desc">Новые</option>
            <option value="date-asc">Старые</option>
          </select>
        </div>
        
        <div className="modal-grid">
          {displayedScreenshots.map((screenshot, index) => (
            <div 
              key={`screenshot-${index}`} 
              className="modal-item" 
              onClick={() => openViewer(screenshot.url)}
            >
              <img src={screenshot.url} loading="lazy" alt="" />
              <div className="modal-info"><strong>{screenshot.game}</strong></div>
            </div>
          ))}
        </div>
        
        {displayedCount < filteredScreenshots.length && (
          <button className="load-more" onClick={loadMore}>
            Показать ещё
          </button>
        )}
        
        {/* Просмотр изображения */}
        {viewerImage && (
          <div className="viewer" onClick={closeViewer}>
            {viewerIndex > 0 && (
              <button className="viewer-nav viewer-prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
                &lt;
              </button>
            )}
            <button className="viewer-back" onClick={(e) => { e.stopPropagation(); closeViewer(); }}>← Назад</button>
            <img src={viewerImage} alt="" />
            {viewerIndex < filteredScreenshots.length - 1 && (
              <button className="viewer-nav viewer-next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
                &gt;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}