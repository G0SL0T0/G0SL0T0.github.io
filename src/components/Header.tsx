'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import '@/styles/header.css';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Определяем, активна ли ссылка на хобби или игры
  const isHobbiesActive = pathname === '/hobbies' || pathname.startsWith('/hobbies/');
  const isGamesActive = pathname === '/hobbies/games';

  return (
    <header>
      <div className="header-container">
        <a href="/" className="logo">Иван - Gosloto</a>
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
        </div>
        <nav className={`${isMenuOpen ? 'active' : ''}`}>
          <a href="/about">Обо мне</a>
          <a href="/skills">Навыки</a>
          <a href="/projects">Проекты</a>
          <a href="/hobbies" className={isHobbiesActive ? 'active' : ''}>Хобби</a>
          <a href="/contact">Контакты</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;