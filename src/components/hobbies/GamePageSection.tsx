// src/components/hobbies/GamePageSection.tsx
'use client';
import { useEffect, useState } from 'react';
import '@/styles/game-page.css';
import { gamesData } from '@/data/gamesData';
import GameStatsSection from './GameStatsSection';
import GameTopCard from './GameTopCard';
import CurrentGameCard from './CurrentGameCard';
import SteamGamesList from './SteamGamesList';

const GamePageSection = () => {
  // Топ-5 игр
  const topGames = [
    'The Witcher 3: Wild Hunt',
    'GTFO',
    'Warhammer 40,000: Dawn of War - Soulstorm',
    'Dawn of War - Soulstorm',
    'TRADESMAN: Deal to Dealer',
    'EVE Frontier'
  ];

  // Сейчас играю
  const currentGames = [
    { name: 'Expeditions: A MudRunner Game', progress: 47 },
    { name: 'EVE Frontier', progress: 32 }
  ];

  // Жанры
  const genres = [
    { name: 'MMO, прогрессивные ММО', tooltip: 'Большие онлайн-миры с прокачкой и экономикой, где есть контент на года игры (но без ограничений - не как генш,zzz,WW и т.д.)' },
    { name: 'Космические тематики и космо-RPG', tooltip: 'Игры о космосе и космических путешествиях, использование физики в играх (космической), а так же фантастика - тоже космическая' },
    { name: 'Стратегии (X3 - X4, Dawn of War)', tooltip: 'Пошаговые, реального времени и RTS, про космос - других фаворитов не нашел пока' },
    { name: 'Симуляторы', tooltip: 'Вождения - только Saber Interactive, космо, фэнтези, фантастика. Множество ограничений на этот жанр' },
    { name: 'Сюжетные RPG', tooltip: 'Глубокие сюжеты и развитие персонажа, психологические и детективные сюжеты, сюжеты с малой выдачей информации.' }
  ];

  // Платформы
  const platforms = [
    { name: 'PC', icon: 'desktop' },
    { name: 'Steam', icon: 'steam' },
    { name: 'Mobile', icon: 'mobile-alt' }
  ];

  // Скриншоты
  const screenshots = [
    { id: 1, src: '/img/screenshot/screenshot1.jpg', game: 'The Witcher 3' },
    { id: 2, src: '/img/screenshot/screenshot2.jpg', game: 'GTFO' },
    { id: 3, src: '/img/screenshot/screenshot3.jpg', game: 'EVE Frontier' }
  ];

  // Обработчик для разворачивания/сворачивания цитаты
  useEffect(() => {
    const speechElements = document.querySelectorAll('.speech.expandable');
    
    const toggleSpeech = (element: HTMLElement) => {
      element.classList.toggle('open');
    };
    
    speechElements.forEach(element => {
      element.addEventListener('click', () => toggleSpeech(element));
    });
    
    return () => {
      speechElements.forEach(element => {
        element.removeEventListener('click', () => toggleSpeech(element));
      });
    };
  }, []);

  return (
    <section className="hobby-detail">
      <div className="container">
        {/* Баннер с названием */}
        <div className="hobby-header">
          <div className="banner-container">
            <img src="/img/games-banner.png" alt="Игровая коллекция" className="hobby-banner game-banner" />
            <div className="banner-overlay">
              <h1><i className="fas fa-gamepad"></i> Игровые увлечения</h1>
              <p className="subtitle">От ретро-классики до современных AAA-проектов</p>
            </div>
          </div>
        </div>
        
        {/* Основной контент */}
        <div className="hobby-info">
          <div className="hobby-main">
            {/* Общая статистика */}
            <GameStatsSection />
            
            {/* Любимые игры */}
            <section className="favorite-games-section">
              <h2><i className="fas fa-heart"></i> Топ-5 любимых игр</h2>
              <div className="top-vertical">
                {topGames.map((gameName, index) => {
                  const game = gamesData.find(g => g.name === gameName);
                  if (!game) return null;
                  
                  return (
                    <GameTopCard 
                      key={index} 
                      game={game} 
                      index={index} 
                    />
                  );
                })}
              </div>
            </section>
            
            {/* Сейчас играю */}
            <section className="current-games-section">
              <h2><i className="fas fa-play"></i> Сейчас играю</h2>
              <blockquote className="speech expandable">
                <span className="speech-preview">
                  «Самые ценные достижения — те, что мы ставим перед собой…»
                </span>
                <span className="speech-full">
                  «Самые ценные достижения в играх — те, что мы ставим перед собой. Я заранее придумываю челленджи: пройти уровень без урона, пройти игру без фаст тревелов или миникарты, построить мегабазу. Эти личные цели не дают мне бросить игру на полпути и превращают каждую сессию в маленький квест.»
                </span>
              </blockquote>
              
              <div className="current-games-list">
                {currentGames.map((game, index) => {
                  const gameData = gamesData.find(g => g.name === game.name);
                  if (!gameData) return null;
                  
                  return (
                    <CurrentGameCard 
                      key={index} 
                      game={gameData} 
                      progress={game.progress} 
                    />
                  );
                })}
              </div>
            </section>
          </div>
                                                                
          {/* --------------  STEAM GAMES  -------------- */}
          <SteamGamesList games={gamesData} />
          
          {/* Сайдбар */}
          <div className="hobby-sidebar">
            <div className="sidebar-inner">
              {/* Жанры */}
              <div className="sidebar-block">
                <h3><i className="fas fa-tags"></i> Предпочитаемые жанры</h3>
                <ul className="genre-list">
                  {genres.map((genre, index) => (
                    <li key={index} data-tooltip={genre.tooltip}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Платформы */}
              <div className="sidebar-block">
                <h3><i className="fas fa-desktop"></i> Платформы</h3>
                <div className="platforms">
                  {platforms.map((platform, index) => (
                    <span key={index} className="platform-tag" data-label={platform.name}>
                      <i className={`fas fa-${platform.icon}`}></i>
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Достижения */}
              <div className="sidebar-block">
                <h3><i className="fas fa-trophy"></i> Последние достижения</h3>
                <ul className="achievements-list">
                  {/* Здесь можно добавить последние достижения из данных */}
                  <li>
                    <span className="ach-name">Топ-100 в GTFO R8</span>
                    <small className="ach-meta">GTFO — 11.01.2025</small>
                  </li>
                  <li>
                    <span className="ach-name">10 KDA в EVE Frontier</span>
                    <small className="ach-meta">EVE Frontier — 02.07.2025</small>
                  </li>
                  <li>
                    <span className="ach-name">Активный участник альфа-теста</span>
                    <small className="ach-meta">EVE Frontier — 15.06.2025</small>
                  </li>
                </ul>
                <button className="button" style={{marginTop: '.75rem', width: '100%'}}>
                  <i className="fas fa-list"></i> Все достижения
                </button>
              </div>
              
              {/* Контакты */}
              <div className="sidebar-block">
                <h3><i className="fas fa-user"></i> Контакты</h3>
                <ul className="genre-list">
                  <li>
                    <a href="https://steamcommunity.com/id/Gosloto/" target="_blank" style={{color: '#144477', textDecoration: 'none'}} data-tooltip="Steam - Gosloto. Никнейм - (S)Gosloto">
                      <i className="fab fa-steam"></i> Steam профиль
                    </a>
                  </li>
                  <li>
                    <a href="https://discord.gg/gosloto" target="_blank" style={{color: '#5865F2', textDecoration: 'none'}}>
                      <i className="fab fa-discord"></i> Мой Discord: gosloto
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Скриншоты */}
              <section className="mini-gallery">
                <div className="container">
                  <h2><i className="fas fa-images"></i> Скриншоты</h2>
                  <div className="mini-grid">
                    {screenshots.map((screenshot, index) => (
                      <img key={index} src={screenshot.src} loading="lazy" alt={`Скриншот ${index + 1}`} />
                    ))}
                  </div>
                  <button className="button open-gallery">
                    <i className="fas fa-external-link-alt"></i> Показать все
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePageSection;