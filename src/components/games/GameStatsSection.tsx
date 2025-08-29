// src/components/games/GameStatsSection.tsx
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
      animateValue(hoursElement as HTMLElement, 0, 10000, 1500);
      hoursElement.setAttribute('data-animated', 'true');
    }

    const percentElement = document.querySelector('.counter-percent');
    if (percentElement && !percentElement.getAttribute('data-animated')) {
      animatePercent(percentElement as HTMLElement, 0, 73, 1500);
      percentElement.setAttribute('data-animated', 'true');
    }

    const gamesElement = document.querySelector('.counter-plus[data-target="100"]');
    if (gamesElement && !gamesElement.getAttribute('data-animated')) {
      animateValue(gamesElement as HTMLElement, 0, 100, 1500, '+');
      gamesElement.setAttribute('data-animated', 'true');
    }
  };

  return (
    <div className="game-stats-section" ref={statsRef}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <i className="fas fa-chart-bar"></i> Моя игровая статистика
      </h2>
      <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card accent-blue bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-lg text-center transform transition hover:scale-105">
          <i className="fas fa-hourglass text-4xl mb-4"></i>
          <h3 className="text-3xl font-bold">
            <span className="counter" data-target="10000">0</span>+
          </h3>
          <p className="text-lg opacity-90">Часов в играх</p>
        </div>

        <div className="stat-card accent-green bg-gradient-to-r from-green-500 to-green-400 text-white p-6 rounded-lg text-center transform transition hover:scale-105">
          <i className="fas fa-trophy text-4xl mb-4"></i>
          <h3 className="text-3xl font-bold">
            <span className="counter-percent">0</span>
          </h3>
          <p className="text-lg opacity-90">Достижений в Steam</p>
        </div>

        <div className="stat-card accent-purple bg-gradient-to-r from-purple-500 to-purple-400 text-white p-6 rounded-lg text-center transform transition hover:scale-105">
          <i className="fas fa-gamepad text-4xl mb-4"></i>
          <h3 className="text-3xl font-bold">
            <span className="counter-plus" data-target="100">0</span>
          </h3>
          <p className="text-lg opacity-90">Игр в коллекции</p>
        </div>
      </div>
    </div>
  );
}