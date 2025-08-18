// src/components/Header.tsx
'use client';
import { useState, useEffect } from 'react';
import '@/styles/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Закрывать меню при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Добавить эффект прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <a href="/" className="logo">Иван - Gosloto</a>
        <div 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
        </div>
        <nav className={`${isMenuOpen ? 'active' : ''}`}>
          <a href="/about" className="active">Обо мне</a>
          <a href="/skills">Навыки</a>
          <a href="/projects">Проекты</a>
          <a href="/hobbies">Хобби</a>
          <a href="/contact">Контакты</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;