// src/components/hobbies/GamesHeader.tsx
'use client';
import '@/styles/header.css';

const GamesHeader = () => {
  return (
    <header>
      <div className="container header-container">
        <a href="/" className="logo">Иван - Gosloto</a>
        <nav>
          <a href="/hobbies" className="active">← Назад к хобби</a>
        </nav>
      </div>
    </header>
  );
};

export default GamesHeader;