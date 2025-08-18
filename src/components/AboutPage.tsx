// src/app/about/page.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import NewsTab from '@/components/NewsTab';
import StubbornButton from '@/components/StubbornButton';

export default function AboutPage() {
  useEffect(() => {
    // Анимация появления timeline
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    
    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    
    return () => {
      document.querySelectorAll('.timeline-item').forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div>
      <header>
        <div className="container header-container">
          <Link href="/" className="logo">Иван - Gosloto</Link>
          <div className="menu-toggle" onClick={() => document.querySelector('nav')?.classList.toggle('show')}>
            <i className="fas fa-bars"></i>
          </div>
          <nav>
            <Link href="/about" className="active">Обо мне</Link>
            <Link href="/skills">Навыки</Link>
            <Link href="/projects">Проекты</Link>
            <Link href="/hobbies">Хобби</Link>
            <Link href="/contact">Контакты</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="about">
          <div className="container">
            {/* Обо мне */}
            <section className="about-modern">
              <div className="container">
                {/* лого */}
                <div className="about-top">
                  <img src="/Logo.png" alt="Иван" className="about-photo" />
                  <h2 className="about-title">Привет, я Иван</h2>
                </div>
                {/* да */}
                <div className="about-center">
                  <p className="about-subtitle">
                    Веб-разработчик, который превращает идеи в быстрые и надёжные приложения.
                  </p>
                  <p className="about-text">
                    Начинал с Python и Ruby в школе, сегодня специализируюсь на React, Node.js и TypeScript.
                    Прошёл путь от фриланса до full-stack разработчика, создающего масштабируемые решения и
                    рефакторя legacy-код в современные системы.
                  </p>
                  <ul className="about-facts">
                    <li><i className="fas fa-calendar-alt"></i> 4+ года опыта</li>
                    <li><i className="fas fa-graduation-cap"></i> Диплом с отличием</li>
                  </ul>
                  <div className="about-actions">
                    <Link href="/contact" className="btn btn-primary">Связаться</Link>
                    <Link href="/assets/cv.pdf" download className="btn btn-secondary">
                      <i className="fas fa-download"></i> Скачать CV
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Мой опыт — горизонтальная шкала */}
            <section className="experience-horizontal">
              <div className="container">
                <h2 className="section-title">Мой опыт</h2>
                <div className="timeline-wrapper">
                  <div className="timeline-track">
                    {/* 2025 */}
                    <article className="timeline-card">
                      <span className="timeline-dot" data-year="2025"></span>
                      <h3>IT-компетенции</h3>
                      <p>Саморазвитие и подтверждение навыков на ГосУслугах.</p>
                      <div className="tags">
                        <span>HTML+CSS 95%</span>
                        <span>JS 85%</span>
                        <span>Node 50%</span>
                      </div>
                    </article>
                    <article className="timeline-card">
                      <span className="timeline-dot" data-year="2024-25"></span>
                      <h3>Личные проекты & Legacy</h3>
                      <p>
                        SPA на React + Vite, SSR-эксперименты на Next.js, Telegram-боты на Node.js. 
                        Поддержка и рефакторинг legacy-кода (jQuery → React).
                      </p>
                      <div className="tags">
                        <span>React 70%</span>
                        <span>Node.js 65%</span>
                        <span>VanillaJS 85%</span>
                        <span>Legacy 65%</span>
                      </div>
                    </article>
                    {/* 2022–2024 */}
                    <article className="timeline-card">
                      <span className="timeline-dot" data-year="2022-24"></span>
                      <h3>Full-stack Developer</h3>
                      <p>Полный цикл разработки веб-приложений.</p>
                      <div className="tags">
                        <span>Vue 55%</span>
                        <span>Python 75%</span>
                        <span>HTML/CSS 75%</span>
                      </div>
                    </article>
                    {/* 2021–2023 */}
                    <article className="timeline-card">
                      <span className="timeline-dot" data-year="2021-23"></span>
                      <h3>Фриланс-разработчик</h3>
                      <p>Адаптивные интерфейсы, API, оптимизация.</p>
                      <div className="tags">
                        <span>Python 40%</span>
                        <span>JS+HTML+CSS 35%</span>
                        <span>SQL 35%</span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>

            {/* Образование и сертификаты */}
            <section className="py-12 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Образование и сертификаты</h2>
                {/* Образование */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center">
                    <i className="fas fa-graduation-cap mr-3 text-blue-600"></i> Образование
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl shadow">
                      <p className="font-semibold text-gray-800">Среднее профессиональное</p>
                      <p className="text-sm text-gray-600">Техник по компьютерным системам</p>
                      <p className="text-xs text-gray-600 mb-1">
                        2025г. ГПОУ «Воркутинский арктический горно-политехнический колледж»
                      </p>
                      <Link href="/assets/diploma.rar" download className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                        <i className="fas fa-award text-yellow-500"></i>
                        Диплом с отличием (Скачать, 22.5 МБ, RAR - архив)
                      </Link>                             
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow">
                      <p className="font-semibold text-gray-800">Высшее (в процессе)</p>
                      <p className="text-sm text-gray-600">Веб-технологии, кибербезопасность, программная инженерия</p>
                      <p className="text-xs text-gray-400">2025 г. +</p>
                    </div>
                  </div>
                </div>
                {/* Сертификаты и курсы */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center">
                    <i className="fas fa-certificate mr-3 text-green-600"></i> Сертификаты и курсы
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Сертификаты */}
                    <div className="bg-white rounded-xl shadow p-5">
                      <h4 className="font-bold text-lg text-green-700 mb-2">МинЦифры России</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> JavaScript — продвинутый уровень (2025-2026)</li>
                        <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> HTML — продвинутый уровень (2025-2026)</li>
                        <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> CSS — продвинутый уровень (2025-2026)</li>
                        <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> GIT — продвинутый уровень (2025-2026)</li>
                        <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> ООП — продвинутый уровень (2025-2026)</li>
                        <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> АСД — продвинутый уровень (2025-2026)</li>
                      </ul>
                    </div>
                    {/* Курсы */}
                    <div className="space-y-4">
                      {/* Хекслет */}
                      <div className="bg-white rounded-xl shadow p-5">
                        <h4 className="font-bold text-lg text-blue-700 mb-2">Хекслет</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start"><i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i> JavaScript — полный курс</li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i> HTML + CSS — полный курс</li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i> Python — полный курс</li>
                        </ul>
                      </div>
                      {/* Coddy */}
                      <div className="bg-white rounded-xl shadow p-5">
                        <h4 className="font-bold text-lg text-purple-700 mb-2">Coddy</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start"><i className="fas fa-check-circle text-purple-500 mt-1 mr-2"></i> Ежедневная практика JS, HTML, CSS</li>
                          <li className="flex items-start"><i className="fas fa-check-circle text-purple-500 mt-1 mr-2"></i> Алгоритмы и структуры данных</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Увлечения */}
            <section className="hobbies-modern">
              <div className="container">
                <h2 className="section-title">Мои увлечения</h2>
                <p className="section-subtitle">
                  То, что вдохновляет меня вне кода
                </p>
                {/* Галерея хобби */}
                <div className="hobbies-grid">
                  {/* Игры */}
                  <article className="hobby-card">
                    <div className="hobby-image">
                      <img src="/img/game.png" alt="Игры" />
                    </div>
                    <div className="hobby-content">
                      <h3>Игры</h3>
                      <p className="highlight">Любимая: The Witcher 3: Wild Hunt</p>
                      <p className="stat">6000+ часов, создание модов и механик.</p>
                      <Link href="/hobby-games" className="btn">Подробнее</Link>
                    </div>
                  </article>
                  {/* Книги */}
                  <article className="hobby-card">
                    <div className="hobby-image">
                      <img src="/img/books.jpg" alt="Книги" />
                    </div>
                    <div className="hobby-content">
                      <h3>Книги</h3>
                      <p className="highlight">Фаворит: «Учебник Логики» Г. Челпанов</p>
                      <p className="stat">50+ книг: фантастика, психология, техлит.</p>
                      <Link href="/hobby-books" className="btn">Подробнее</Link>
                    </div>
                  </article>
                  {/* Электроника */}
                  <article className="hobby-card">
                    <div className="hobby-image">
                      <img src="/img/electronics.jpg.png" alt="Электроника" />
                    </div>
                    <div className="hobby-content">
                      <h3>Электроника</h3>
                      <p className="highlight">Схемотехника, пайка, прошивка STM32</p>
                      <p className="stat">Самодельные IoT-датчики, дроны и ремонт техники</p>
                      <Link href="/hobby-electronics" className="btn">Подробнее</Link>
                    </div>
                  </article>
                  {/* Микробиология */}
                  <article className="hobby-card">
                    <div className="hobby-image">
                      <img src="/img/micro.jpg.png" alt="Микробиология" />
                    </div>
                    <div className="hobby-content">
                      <h3>Микробиология</h3>
                      <p className="highlight">Исследование микроорганизмов</p>
                      <p className="stat">Домашняя лаборатория и выращивание культур</p>
                      <Link href="/hobby-microbiology" className="btn">Подробнее</Link>
                    </div>
                  </article>
                  {/* Кибербезопасность */}
                  <article className="hobby-card">
                    <div className="hobby-image">
                      <img src="/img/cyber.jpg.png" alt="Кибербезопасность" />
                    </div>
                    <div className="hobby-content">
                      <h3>Кибербезопасность</h3>
                      <p className="highlight">Pentesting и анализ уязвимостей</p>
                      <p className="stat">Bug-bounty, CTF-игры, написание PoC, прохождение учебных машин на TryHackMe</p>
                      <Link href="/hobby-cybersecurity" className="btn">Подробнее</Link>
                    </div>
                  </article>
                  {/* Новое: геймдев */}
                  <article className="hobby-card">
                    <div className="hobby-image">
                      <img src="/img/gamedev.jpg.png" alt="Геймдев" />
                    </div>
                    <div className="hobby-content">
                      <h3>Геймдев</h3>
                      <p className="highlight">Собственные механики и движки</p>
                      <p className="stat">Прототипы на UE5, Phaser и чистом JS</p>
                      <Link href="/hobby-gamedev" className="btn">Подробнее</Link>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Gosloto. Все права НЕ защищены.</p>
        </div>
      </footer>

      <NewsTab />
      <StubbornButton />
    </div>
  );
}