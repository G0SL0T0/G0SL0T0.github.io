// src/components/games/GamesPage.tsx
'use client';

import { useEffect } from 'react';
import { ReactNode } from 'react';

interface GamesPageProps {
  children: ReactNode;
}

export default function GamesPage({ children }: GamesPageProps) {
  useEffect(() => {
    // Handle expandable speech block
    const handleSpeechClick = (e: MouseEvent) => {
      const block = (e.target as Element).closest('.speech.expandable');
      if (block) {
        block.classList.toggle('open');
        const preview = block.querySelector('.speech-preview');
        const full = block.querySelector('.speech-full');
        if (preview && full) {
          preview.classList.toggle('hidden');
          full.classList.toggle('hidden');
        }
      }
    };

    // Handle mobile menu toggle
    const handleMenuToggle = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.classList.toggle('show');
      }
    };

    // Handle scroll effects
    const handleScroll = () => {
      document.body.style.setProperty('--scroll-y', window.scrollY + 'px');
      document.body.setAttribute('data-scroll', '');
    };

    document.addEventListener('click', handleSpeechClick);
    document.querySelector('.menu-toggle')?.addEventListener('click', handleMenuToggle);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleSpeechClick);
      document.querySelector('.menu-toggle')?.removeEventListener('click', handleMenuToggle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="games-page">
      {/* Header */}
      <header className="bg-gray-800 text-white py-2 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="logo text-xl font-bold text-white hover:text-blue-400 transition">
            Иван - Gosloto
          </a>
          <div className="menu-toggle md:hidden cursor-pointer">
            <i className="fas fa-bars"></i>
          </div>
          <nav className="hidden md:flex gap-4">
            <a href="/hobbies" className="hover:text-blue-400 transition active">
              ← Назад к хобби
            </a>
          </nav>
        </div>
      </header>

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hobby Header Banner */}
          <div className="hobby-header mb-8">
            <div className="banner-container relative">
              <img 
                src="/img/games-banner.png" 
                alt="Игровая коллекция" 
                className="hobby-banner w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="banner-overlay absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 via-black/70 to-transparent rounded-b-lg">
                <h1 className="text-4xl font-bold text-white text-center mb-2 relative z-10">
                  <i className="fas fa-gamepad mr-3"></i> Игровые увлечения
                </h1>
                <p className="text-xl text-gray-200 text-center">
                  От ретро-классики до современных AAA-проектов
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="hobby-info grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="hobby-main lg:col-span-2 space-y-8">
              {/* Game Stats Section */}
              <div className="game-stats-section">
                {Array.isArray(children) ? children[0] : children}
              </div>

              {/* Top Games Section */}
              <div className="favorite-games-section">
                {Array.isArray(children) ? children[1] : null}
              </div>

              {/* Current Games Section */}
              <div className="current-games-section">
                {Array.isArray(children) ? children[2] : null}
              </div>

              {/* Steam Games Section */}
              <div className="steam-games">
                {Array.isArray(children) ? children[3] : null}
              </div>
            </div>

            {/* Sidebar */}
            <div className="hobby-sidebar lg:col-span-1">
              <div className="sidebar-content">
                {Array.isArray(children) ? children[4] : null}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-sm">&copy; 2025 Gosloto. Все права НЕ защищены.</p>
        </div>
      </footer>
    </div>
  );
}