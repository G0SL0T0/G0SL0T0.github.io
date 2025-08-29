// src/components/games/GamesPage.tsx
'use client';

import { useEffect, ReactNode } from 'react';
//import AnimationUtils from '@/utils/animations';

interface GamesPageProps {
  children: ReactNode;
}

export default function GamesPage({ children }: GamesPageProps) {
  useEffect(() => {
    // Initialize all animations
    AnimationUtils.initAll();

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
      const scrolled = window.pageYOffset;
      document.body.style.setProperty('--scroll-y', scrolled + 'px');
      
      // Add parallax effect to banner
      const banner = document.querySelector('.hobby-banner');
      if (banner) {
        banner.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      
      // Header shadow on scroll
      const header = document.querySelector('header');
      if (header) {
        if (scrolled > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    // Add ripple effect to buttons
    const createRipple = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    // Event listeners
    document.addEventListener('click', handleSpeechClick);
    document.querySelector('.menu-toggle')?.addEventListener('click', handleMenuToggle);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-screens, .mini-toggle').forEach(button => {
      button.addEventListener('click', createRipple);
    });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleSpeechClick);
      document.querySelector('.menu-toggle')?.removeEventListener('click', handleMenuToggle);
      window.removeEventListener('scroll', handleScroll);
      
      document.querySelectorAll('.btn-screens, .mini-toggle').forEach(button => {
        button.removeEventListener('click', createRipple);
      });
      
      AnimationUtils.cleanup();
    };
  }, []);

  return (
    <div className="games-page">
      {/* Header */}
      <header className="bg-gray-800 text-white py-2 sticky top-0 z-50 shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="logo text-xl font-bold text-white hover:text-blue-400 transition transform hover:scale-105">
            Иван - Gosloto
          </a>
          <div className="menu-toggle md:hidden cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-2 rounded-lg">
            <i className="fas fa-bars"></i>
          </div>
          <nav className="hidden md:flex gap-4">
            <a href="/hobbies" className="hover:text-blue-400 transition active flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
              <i className="fas fa-arrow-left"></i>
              Назад к хобби
            </a>
          </nav>
        </div>
      </header>

      <main className="py-8 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Hobby Header Banner */}
          <div className="hobby-header mb-8 scroll-reveal">
            <div className="banner-container relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/img/games-banner.png" 
                alt="Игровая коллекция" 
                className="hobby-banner w-full h-80 object-cover transition-transform duration-700"
              />
              <div className="banner-overlay absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-2xl">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-white mb-4 relative z-10 animate-fade-in">
                    <i className="fas fa-gamepad mr-4 text-blue-400"></i> 
                    Игровые увлечения
                  </h1>
                  <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-delay">
                    От ретро-классики до современных AAA-проектов
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full opacity-50 animate-pulse delay-100"></div>
              <div className="absolute bottom-4 left-1/4 w-4 h-4 bg-green-500 rounded-full opacity-50 animate-pulse delay-200"></div>
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
              <div className="sidebar-content sticky top-24">
                {Array.isArray(children) ? children[4] : null}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <p className="text-sm mb-2">&copy; 2025 Gosloto. Все права НЕ защищены.</p>
          <p className="text-xs text-gray-400">
            Сделано в Китае ;)
          </p>
        </div>
      </footer>
    </div>
  );
}