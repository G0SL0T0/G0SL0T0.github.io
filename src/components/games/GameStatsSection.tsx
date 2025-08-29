// src/components/games/GameStatsSection.tsx - Modern Enhanced Version
'use client';

import { useEffect, useRef } from 'react';
import { gameStats } from '@/data/gamesData';

export default function GameStatsSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const animateValue = (element: HTMLElement, start: number, end: number, duration: number, suffix = '') => {
      let startTime: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    };

    const animatePercent = (element: HTMLElement, start: number, end: number, duration: number) => {
      let startTime: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    };

    const hoursElement = document.querySelector('.counter[data-target="10000"]');
    if (hoursElement && !hoursElement.getAttribute('data-animated')) {
      animateValue(hoursElement as HTMLElement, 0, 10000, 2000);
      hoursElement.setAttribute('data-animated', 'true');
    }

    const percentElement = document.querySelector('.counter-percent');
    if (percentElement && !percentElement.getAttribute('data-animated')) {
      animatePercent(percentElement as HTMLElement, 0, 73, 2000);
      percentElement.setAttribute('data-animated', 'true');
    }

    const gamesElement = document.querySelector('.counter-plus[data-target="100"]');
    if (gamesElement && !gamesElement.getAttribute('data-animated')) {
      animateValue(gamesElement as HTMLElement, 0, 100, 2000, '+');
      gamesElement.setAttribute('data-animated', 'true');
    }
  };

  return (
    <div className="game-stats-section scroll-reveal" ref={statsRef}>
      <div className="section-header mb-8">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3 text-gradient">
          <i className="fas fa-chart-line text-4xl"></i>
          Моя игровая статистика
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl">
          Цифры, которые говорят больше чем слова. Более 10 000 часов в виртуальных мирах, 
          десятки пройденных игр и бесценный опыт.
        </p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card accent-blue hover-lift">
          <div className="stat-icon">
            <i className="fas fa-hourglass-half"></i>
          </div>
          <h3 className="stat-number">
            <span className="counter" data-target="10000">0</span>+
          </h3>
          <p className="stat-label">Часов в играх</p>
          <div className="stat-description">
            <small>Более 400 дней непрерывной игры</small>
          </div>
        </div>

        <div className="stat-card accent-green hover-lift">
          <div className="stat-icon">
            <i className="fas fa-trophy"></i>
          </div>
          <h3 className="stat-number">
            <span className="counter-percent">0</span>
          </h3>
          <p className="stat-label">Достижений в Steam</p>
          <div className="stat-description">
            <small>Высокий процент завершения</small>
          </div>
        </div>

        <div className="stat-card accent-purple hover-lift">
          <div className="stat-icon">
            <i className="fas fa-gamepad"></i>
          </div>
          <h3 className="stat-number">
            <span className="counter-plus" data-target="100">0</span>
          </h3>
          <p className="stat-label">Игр в коллекции</p>
          <div className="stat-description">
            <small>От инди до AAA-проектов</small>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="secondary-stats mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card glass-effect hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">Любимый жанр</p>
              <p className="font-semibold">RPG</p>
            </div>
            <i className="fas fa-dragon text-2xl opacity-50"></i>
          </div>
        </div>
        
        <div className="stat-card glass-effect hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">Активных игр</p>
              <p className="font-semibold">3</p>
            </div>
            <i className="fas fa-play-circle text-2xl opacity-50"></i>
          </div>
        </div>
        
        <div className="stat-card glass-effect hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">Платформ</p>
              <p className="font-semibold">PC</p>
            </div>
            <i className="fas fa-desktop text-2xl opacity-50"></i>
          </div>
        </div>
      </div>
    </div>
  );
}