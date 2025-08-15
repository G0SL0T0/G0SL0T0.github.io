// src/components/hobbies/HobbiesPageSection.tsx
'use client';

import { hobbiesData } from '@/data/hobbiesData';
import HobbyCard from './HobbyCard';

const HobbiesPageSection = () => {
  return (
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
          {hobbiesData.map((hobby) => (
            <HobbyCard key={hobby.id} hobby={hobby} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesPageSection;