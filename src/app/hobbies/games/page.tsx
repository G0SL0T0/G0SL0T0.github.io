// src/app/hobbies/games/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import GamesHeader from '@/components/hobbies/GamesHeader';
import Footer from '@/components/Footer';
import GameStatsSection from '@/components/hobbies/GameStatsSection';
import GameTopCard from '@/components/hobbies/GameTopCard';
import CurrentGameCard from '@/components/hobbies/CurrentGameCard';
import SteamGamesList from '@/components/hobbies/SteamGamesList';
import AchievementsAccordion from '@/components/hobbies/AchievementsAccordion';
import GalleryModal from '@/components/hobbies/GalleryModal';
import { games, topGames, currentGames } from '@/data/gamesData';
import { achievements } from '@/data/achievementsData';
import '@/styles/game-page.css';

export default function GamesPage() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedGameForGallery, setSelectedGameForGallery] = useState<string>('all');
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);
  
  const openGallery = (gameName: string = 'all') => {
    setSelectedGameForGallery(gameName);
    setIsGalleryOpen(true);
  };
  
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const toggleQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuoteExpanded(!isQuoteExpanded);
  };
  
  // Получаем уникальные игры для фильтра достижений
  const allGames = [...new Set([
    ...games.map(g => g.name),
    ...achievements.map(a => a.game)
  ])].sort();

  return (
    
    <><GamesHeader />

      <Head>
        <title>Игровые увлечения - Иван - Gosloto</title>
        <meta name="description" content="Мои игровые предпочтения, статистика и достижения" />
        <link rel="icon" type="png" sizes="32x32" href="/img/favicon-32x32.png" />
      </Head>
      
      <div className="hobby-detail">
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
                  {topGames.map(game => (
                    <GameTopCard 
                      key={`top-${game.id}`} 
                      game={game} 
                      achievements={achievements}
                      onOpenGallery={openGallery}
                    />
                  ))}
                </div>
              </section>
              
              {/* Сейчас играю */}
              <section className="current-games-section">
                <h2><i className="fas fa-play"></i> Сейчас играю</h2>
                <blockquote 
                  className={`speech expandable ${isQuoteExpanded ? 'open' : ''}`} 
                  onClick={toggleQuote}
                >
                  <span className="speech-preview">
                    «Самые ценные достижения — те, что мы ставим перед собой…»
                  </span>
                  <span className="speech-full">
                    «Самые ценные достижения в играх — те, что мы ставим перед собой. Я заранее придумываю челленджи: пройти уровень без урона, пройти игру без фаст тревелов или миникарты, построить мегабазу. Эти личные цели не дают мне бросить игру на полпути и превращают каждую сессию в маленький квест.»
                  </span>
                </blockquote>
                
                <div id="currentGamesJS">
                  {currentGames.map(game => (
                    <CurrentGameCard 
                      key={`current-${game.id}`} 
                      game={game} 
                      achievements={achievements}
                      onOpenGallery={openGallery}
                    />
                  ))}
                </div>
              </section>
              
              {/* Список игр Steam */}
              <SteamGamesList 
                games={games} 
                achievements={achievements}
                onOpenGallery={openGallery}
              />
            </div>
            
            {/* Сайдбар */}
            <div className="hobby-sidebar">
              <div className="sidebar-inner">
                {/* Жанры */}
                <div className="sidebar-block">
                  <h3><i className="fas fa-tags"></i> Предпочитаемые жанры</h3>
                  <ul className="genre-list">
                    <li data-tooltip="Большие онлайн-миры с прокачкой и экономикой, где есть контент на года игры (но без ограничений - не как генш,zzz,WW и т.д.)">MMO, прогрессивные ММО</li>
                    <li data-tooltip="Игры о космосе и космических путешествиях, использование физики в играх (космической), а так же фантастика - тоже космическая">Космические тематики и космо-RPG</li>
                    <li data-tooltip="Пошаговые, реального времени и RTS, про космос - других фаворитов не нашел пока">Стратегии (X3 - X4, Dawn of War)</li>
                    <li data-tooltip="Вождения - только Saber Interactive, космо, фэнтези, фантастика. Множество ограничений на этот жанр">Симуляторы</li>
                    <li data-tooltip="Глубокие сюжеты и развитие персонажа, психологические и детективные сюжеты, сюжеты с малой выдачей информации.">Сюжетные RPG</li>
                  </ul>
                </div>
                
                {/* Платформы */}
                <div className="sidebar-block">
                  <h3><i className="fas fa-desktop"></i> Платформы</h3>
                  <div className="platforms">
                    <span className="platform-tag" data-label="PC"><i className="fas fa-desktop"></i></span>
                    <span className="platform-tag" data-label="Steam"><i className="fab fa-steam"></i></span>
                    <span className="platform-tag" data-label="Mobile"><i className="fas fa-mobile-alt"></i></span>
                  </div>
                </div>
                
                {/* Достижения */}
                <AchievementsAccordion achievements={achievements} games={allGames} />
                
                {/* Контакты */}
                <div className="sidebar-block">
                  <h3><i className="fas fa-user"></i> Контакты</h3>
                  <ul className="genre-list">
                    <li>
                      <a href="https://steamcommunity.com/id/Gosloto/" target="_blank" rel="noopener noreferrer" data-tooltip="Steam - Gosloto. Никнейм - (S)Gosloto">
                        <i className="fab fa-steam"></i> Steam профиль
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.gg/gosloto" target="_blank" rel="noopener noreferrer">
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
                      <img src="/img/screenshot/screenshot1.jpg" loading="lazy" alt="Скриншот 1" />
                      <img src="/img/screenshot/screenshot2.jpg" loading="lazy" alt="Скриншот 2" />
                      <img src="/img/screenshot/screenshot3.jpg" loading="lazy" alt="Скриншот 3" />
                    </div>
                    <button 
                      className="button open-gallery" 
                      onClick={(e) => {
                        e.preventDefault();
                        openGallery();
                      }}
                    >
                      <i className="fas fa-external-link-alt"></i> Показать все
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Модальное окно галереи */}
      <GalleryModal 
        isOpen={isGalleryOpen} 
        onClose={closeGallery}
        initialGame={selectedGameForGallery}
      />
      
      <Footer />
    </>
  );
}