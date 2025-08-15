// src/components/NewsSection.tsx
'use client';

import { useState } from 'react';

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  return (
    <>
      <button className="news-tab" onClick={openModal} aria-label="Последние обновления">
        <span>Новости</span>
        <small>v3.4</small>
      </button>

      {isModalOpen && (
        <div className="news-modal show" role="dialog" aria-modal="true" aria-labelledby="newsTitle">
          <div className="news-modal__glass">
            <button className="news-modal__close" onClick={closeModal} aria-label="Закрыть">&times;</button>
            <h2 id="newsTitle">Все обновления сайта</h2>
            <ul className="news-timeline">
              {newsData.map((item, index) => (
                <li key={index}>
                  <time>{formatDate(item.date)}</time>
                  <span className="news-version">{item.version}</span>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}