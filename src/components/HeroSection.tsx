// src/components/HeroSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <Image 
          src="/Logo.png" 
          alt="Аватарка" 
          className="profile-image"
          width={200}
          height={200}
        />
        <div className="hero-text">
          <h1>Привет! Я Иван, веб-разработчик.</h1>
          <p className="hero-sub">
            Создаю современные, адаптивные и удобные веб-приложения с фокусом на производительность и пользовательский опыт.
          </p>
          <div className="hero-actions">
            <Link href="/about" className="button">Узнать больше</Link>
            <Link href="/contact" className="button secondary">Связаться</Link>
          </div>
        </div>
      </div>
    </section>
  );
}