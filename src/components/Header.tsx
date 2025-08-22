// src/components/Header.tsx

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

  // Определяем активность для каждой ссылки
  const isHomeActive = pathname === '/';
  const isAboutActive = pathname === '/about' || pathname.startsWith('/about/');
  const isSkillsActive = pathname === '/skills' || pathname.startsWith('/skills/');
  const isProjectsActive = pathname === '/projects' || pathname.startsWith('/projects/');
  const isHobbiesActive = pathname === '/hobbies' || pathname.startsWith('/hobbies/');
  const isContactActive = pathname === '/contact' || pathname.startsWith('/contact/');

  return (
    <header>
      <div className="header-container">
        <a href="/" className={`logo ${isHomeActive ? 'active' : ''}`}>Иван - Gosloto</a>
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
        </div>
        <nav className={`${isMenuOpen ? 'active' : ''}`}>
          <a href="/about" className={isAboutActive ? 'active' : ''}>Обо мне</a>
          <a href="/skills" className={isSkillsActive ? 'active' : ''}>Навыки</a>
          <a href="/projects" className={isProjectsActive ? 'active' : ''}>Проекты</a>
          <a href="/hobbies" className={isHobbiesActive ? 'active' : ''}>Хобби</a>
          <a href="/contact" className={isContactActive ? 'active' : ''}>Контакты</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;