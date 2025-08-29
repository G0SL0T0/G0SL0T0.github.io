// src/components/hobbies/EnhancedHobbiesPageSection.tsx
'use client';

import { hobbiesData } from '@/data/hobbiesData';
import HobbyCard from './HobbyCard';
import HobbiesGamesSection from './HobbiesPageSection';
import { useState, useEffect, useRef } from 'react';

const EnhancedHobbiesPageSection = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 3, hobbiesData.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  // Find the games hobby to check if we should show the games section
  const gamesHobby = hobbiesData.find(hobby => hobby.id === 'games');

  return (
    <div className="enhanced-hobbies-page">
      {/* Main Hobbies Section */}
      <section className="hobbies-section">
        <div className="container">
          <h1 className="hobbies-title">Мои хобби</h1>
          <p className="intro-wide">
            Помимо кода и задач «на проде» я увлекаюсь множеством вещей: от глубоких RPG до пайки печатных плат,
            от лабораторных пробирок до CTF-челленджей. Эти интересы не только разнообразят день,
            но и постоянно подкидывают идей, которые потом превращаются в фичи, оптимизации
            или просто вдохновляют на новые проекты.
          </p>
          
          <div className="hobbies-grid">
            {hobbiesData.slice(0, visibleItems).map((hobby) => (
              <HobbyCard key={hobby.id} hobby={hobby} />
            ))}
          </div>
          
          {visibleItems < hobbiesData.length && (
            <div ref={observerRef} className="loading-trigger">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Games Section */}
      {gamesHobby && (
        <section className="enhanced-games-section bg-gray-50 py-12">
          <div className="container">
            <HobbiesGamesSection 
              title={gamesHobby.title}
              description={gamesHobby.description}
              showStats={true}
              showTopGames={true}
              showCurrentGames={true}
              limit={9}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default EnhancedHobbiesPageSection;