// src/components/hobbies/GameStatsSection.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function GameStatsSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    animateValue('hours-counter', 0, 10000, 1500, '+');
    animateValue('achievements-counter', 0, 73, 1500, '%');
    animateValue('games-counter', 0, 100, 1500, '+');
  };

  const animateValue = (id: string, start: number, end: number, duration: number, suffix = '') => {
    const element = document.getElementById(id);
    if (!element) return;
    
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

  return (
    <div className="game-stats-section" ref={statsRef}>
      <h2><i className="fas fa-chart-bar"></i> Моя игровая статистика</h2>
      <div className="stats-grid">
        <div className="stat-card accent-blue">
          <i className="fas fa-hourglass"></i>
          <h3><span id="hours-counter">0</span>+</h3>
          <p>Часов в играх</p>
        </div>
        <div className="stat-card accent-green">
          <i className="fas fa-trophy"></i>
          <h3><span id="achievements-counter">0</span></h3>
          <p>Достижений в Steam</p>
        </div>
        <div className="stat-card accent-purple">
          <i className="fas fa-gamepad"></i>
          <h3><span id="games-counter">0</span></h3>
          <p>Игр в коллекции</p>
        </div>
      </div>
    </div>
  );
}