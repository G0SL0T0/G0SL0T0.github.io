// src/components/NewsTab.tsx
'use client';
import { useState, useEffect } from 'react';
import '@/styles/news-tab.css';
import ScrollToTop from './ScrollToTop';

// Тип для новости
interface NewsItem {
  date: string;
  version: string;
  text: string;
  importance?: 'high' | 'medium' | 'low'; // Важность новости
  category?: 'feature' | 'fix' | 'update' | 'release'; // Категория новости
}

const newsData: NewsItem[] = [
  {
    date: '2025-08-16',
    version: 'v4.0.0',
    text: 'Полный рефакторинг и миграция сайта на TypeScript. (React). Работа через компоненты и удобная маштабируемость статика TSX',
    importance: 'high',
    category: 'release'
  },  
  {
    date: '2025-08-13',
    version: 'v3.4',
    text: 'Добавлен блок "новости", и кнопку играющую в догонялки - которую никто не нажмет) - на каждую из страниц, парсинг JS новостей.',
    importance: 'medium',
    category: 'feature'
  },
  {
    date: '2025-08-12',
    version: 'v3.3',
    text: 'Обработана и улучшена кнопка "скачать резюме" -сейчас выбор из 4-х резюме.',
    importance: 'low',
    category: 'feature'
  },
  {
    date: '2025-08-3',
    version: 'v3.2',
    text: 'Добавление нового раздела хобби "книги", большой фикс раздела "Обо мне".',
    importance: 'medium',
    category: 'feature'
  },
  {
    date: '2025-08-01',
    version: 'v3.1',
    text: 'Фикс раздела "контакты" - отправка mail почты работает нормально. + Обновление данных пользователя.',
    importance: 'low',
    category: 'fix'
  },
  {
    date: '2025-07-27',
    version: 'v3.0',
    text: 'Глобальные изменения! Задетые разделы: "Навыки", "Проекты", "Главная страничка".',
    importance: 'high',
    category: 'update'
  },
  {
    date: '2025-07-22',
    version: 'v2.9',
    text: 'Раздел "игры" - Большое изменение - библиотека скриншотов, перечень достижений и ачивок.',
    importance: 'medium',
    category: 'feature'
  },
  {
    date: '2025-07-15',
    version: 'v2.2',
    text: 'Фиксы Главной страницы, добавление "Пиксальной Экосистемы" в footer сайта.',
    importance: 'low',
    category: 'fix'
  },
  {
    date: '2025-07-22',
    version: 'v2.0',
    text: 'Рефакторинг Главной страницы, добавление разделов кейсов на страницу.',
    importance: 'high',
    category: 'update'
  }
];

interface NewsTabProps {
  showModal?: boolean;
  setShowModal?: (show: boolean) => void;
}

export default function NewsTab({ showModal, setShowModal }: NewsTabProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);
  
  // Определяем количество новостей для начального отображения
  const initialDisplayCount = 3;
  
  // Используем внутреннее состояние или пропсы
  const isModalOpen = showModal !== undefined ? showModal : internalModalOpen;
  
  const openModal = () => {
    if (setShowModal) {
      setShowModal(true);
    } else {
      setInternalModalOpen(true);
    }
    // При открытии модального окна показываем все новости
    setShowAll(true);
  };
  
  const closeModal = () => {
    if (setShowModal) {
      setShowModal(false);
    } else {
      setInternalModalOpen(false);
    }
  };
  
  useEffect(() => {
    // Сортируем новости по дате (новые сверху)
    const sortedNews = [...newsData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Отображаем только первые новости или все
    setVisibleNews(showAll ? sortedNews : sortedNews.slice(0, initialDisplayCount));
  }, [showAll]);
  
  // Обработка закрытия по Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);
  
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };
  
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'feature': return 'fas fa-star';
      case 'fix': return 'fas fa-tools';
      case 'update': return 'fas fa-sync-alt';
      case 'release': return 'fas fa-rocket';
      default: return 'fas fa-info-circle';
    }
  };
  
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'feature': return '#4CAF50'; // Зеленый
      case 'fix': return '#2196F3'; // Синий
      case 'update': return '#FF9800'; // Оранжевый
      case 'release': return '#F44336'; // Красный
      default: return '#9E9E9E'; // Серый
    }
  };
  
  // ИСПРАВЛЕНО: Поменяли порядок параметров - сначала обязательный, потом необязательный
  const getImportanceBadge = (index: number, importance?: string) => {
    if (index === 0) {
      return <span className="news-badge-custom latest">Последнее</span>;
    }
    
    switch (importance) {
      case 'high': 
        return <span className="news-badge-custom important">Важно</span>;
      case 'medium': 
        return <span className="news-badge-custom notable">Значительно</span>;
      default: 
        return null;
    }
  };
  
  return (
    <>
      <button 
        className="news-tab-custom"
        onClick={openModal} 
        aria-label="Последние обновления"
      >
        <div className="news-tab-icon-custom">
          <i className="fas fa-newspaper"></i>
        </div>
        <div className="news-tab-content-custom">
          <span className="news-tab-text-custom">Новости</span>
          <span className="news-tab-version-custom">{newsData[0].version}</span>
        </div>
      </button>
      
      {isModalOpen && (
        <div 
          className="news-modal-custom show" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="newsTitle"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="news-modal__glass-custom">
            <button 
              className="news-modal__close-custom" 
              onClick={closeModal} 
              aria-label="Закрыть"
            >
              &times;
            </button>
            
            <div className="news-header-custom">
              <h2 id="newsTitle">Все обновления сайта</h2>
              <div className="news-stats-custom">
                <span className="news-count-custom">
                  <i className="fas fa-newspaper"></i> {newsData.length} обновлений
                </span>
                <span className="news-date-range-custom">
                  <i className="fas fa-calendar-alt"></i> {formatDate(newsData[newsData.length - 1].date)} - {formatDate(newsData[0].date)}
                </span>
              </div>
            </div>
            
            <ul className="news-timeline-custom" id="allNewsList">
              {visibleNews.map((item, index) => (
                <li 
                  key={index} 
                  className={`news-item-custom ${item.importance === 'high' ? 'high-importance' : ''} ${index === 0 ? 'latest-news' : ''}`}
                >
                  <div className="news-meta-custom">
                    <time>{formatDate(item.date)}</time>
                    <span className="news-version-custom">{item.version}</span>
                    {/* ИСПРАВЛЕНО: Поменяли порядок аргументов при вызове функции */}
                    {getImportanceBadge(index, item.importance)}
                  </div>
                  
                  <div className="news-content-custom">
                    <div className="news-category-custom" style={{ backgroundColor: getCategoryColor(item.category) }}>
                      <i className={getCategoryIcon(item.category)}></i>
                    </div>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            {!showAll && newsData.length > initialDisplayCount && (
              <button 
                className="load-more-btn-custom"
                onClick={() => setShowAll(true)}
              >
                Показать еще ({newsData.length - initialDisplayCount})
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}