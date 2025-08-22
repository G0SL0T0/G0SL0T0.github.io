// src/components/NewsSection.tsx
'use client';
import { useState } from 'react';
import '@/styles/news-tab.css';
import { useGradientAnimation } from '@/hooks/useGradientAnimation';

const newsData = [
  {
    date: '2025-08-13',
    version: 'v3.4',
    text: 'Добавлен блок "новости", и кнопку играющую в догонялки - которую никто не нажмет) - на каждую из страниц, парсинг JS новостей.'
  },
  {
    date: '2025-08-12',
    version: 'v3.3',
    text: 'Обработана и улучшена кнопка "скачать резюме" -сейчас выбор из 4-х резюме.'
  },
  {
    date: '2025-08-3',
    version: 'v3.2',
    text: 'Добавление нового раздела хобби "книги", большой фикс раздела "Обо мне".'
  },
  {
    date: '2025-08-01',
    version: 'v3.1',
    text: 'Фикс раздела "контакты" - отправка mail почты работает нормально. + Обновление данных пользователя.'
  },
  {
    date: '2025-07-27',
    version: 'v3.0',
    text: 'Глобальные изменения! Задетые разделы: "Навыки", "Проекты", "Главная страничка".'
  },
  {
    date: '2025-07-22',
    version: 'v2.9',
    text: 'Раздел "игры" - Большое изменение - библиотека скриншотов, перечень достижений и ачивок.'
  },
  {
    date: '2025-07-15',
    version: 'v2.2',
    text: 'Фиксы Главной страницы, добавление "Пиксальной Экосистемы" в footer сайта.'
  },
  {
    date: '2025-07-22',
    version: 'v2.0',
    text: 'Рефакторинг Главной страницы, добавление разделов кейсов на страницу.'
  }
];

export default function NewsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { buttonRef } = useGradientAnimation(); // Используем наш хук
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };
  
  return (
    <>
      <button 
        ref={buttonRef} // Привязываем реф к кнопке
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
        <div className="news-modal-custom show" role="dialog" aria-modal="true" aria-labelledby="newsTitle">
          <div className="news-modal__glass-custom">
            <button className="news-modal__close-custom" onClick={closeModal} aria-label="Закрыть">&times;</button>
            
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
            
            <ul className="news-timeline-custom">
              {newsData.map((item, index) => (
                <li key={index} className={`news-item-custom ${index === 0 ? 'latest-news' : ''}`}>
                  <div className="news-meta-custom">
                    <time>{formatDate(item.date)}</time>
                    <span className="news-version-custom">{item.version}</span>
                    {index === 0 && <span className="news-badge-custom latest">Последнее</span>}
                  </div>
                  <div className="news-content-custom">
                    <div className="news-category-custom" style={{ backgroundColor: '#9E9E9E' }}>
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}