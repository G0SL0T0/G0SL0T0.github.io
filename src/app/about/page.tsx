// src/app/about/page.tsx
'use client';
import { useState, useEffect } from 'react';
import '@/styles/experience-section.css';
import '@/styles/professional-growth.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Timeline from '@/components/Timeline';
import StubbornButton from '@/components/StubbornButton';
import NewsTab from '@/components/NewsTab';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import FutureWorkBlock from '@/components/FutureWorkBlock';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer';
import TimelineCard from '@/components/TimelineCard';
import { experienceData } from '@/data/experience';
import HobbyCard from '@/components/HobbyCard';
import ScrollToTop from '@/components/ScrollToTop';

interface Hobby {
  id: number;
  title: string;
  highlight: string;
  stat: string;
  image: string;
  link: string;
}

const AboutPage = () => {
  const [showNewsModal, setShowNewsModal] = useState(false);
  
  const hobbies: Hobby[] = [
    {
      id: 1,
      title: "Игры",
      highlight: "Любимая: The Witcher 3: Wild Hunt",
      stat: "6000+ часов, создание модов и механик.",
      image: "/img/game.png",
      link: "/hobby-games"
    },
    {
      id: 2,
      title: "Книги",
      highlight: "Фаворит: «Учебник Логики» Г. Челпанов",
      stat: "50+ книг: фантастика, психология, техлит.",
      image: "/img/books.jpg",
      link: "/hobby-books"
    },
    {
      id: 3,
      title: "Электроника",
      highlight: "Схемотехника, пайка, прошивка STM32",
      stat: "Самодельные IoT-датчики, дроны и ремонт техники",
      image: "/img/electronics.jpg.png",
      link: "/hobby-electronics"
    },
    {
      id: 4,
      title: "Микробиология",
      highlight: "Исследование микроорганизмов",
      stat: "Домашняя лаборатория и выращивание культур",
      image: "/img/micro.jpg.png",
      link: "/hobby-microbiology"
    },
    {
      id: 5,
      title: "Кибербезопасность",
      highlight: "Pentesting и анализ уязвимостей",
      stat: "Bug-bounty, CTF-игры, написание PoC, прохождение учебных машин на TryHackMe",
      image: "/img/cyber.jpg.png",
      link: "/hobby-cybersecurity"
    },
    {
      id: 6,
      title: "Геймдев",
      highlight: "Собственные механики и движки",
      stat: "Прототипы на UE5, Phaser и чистом JS",
      image: "/img/gamedev.jpg.png",
      link: "/hobby-gamedev"
    }
  ];

  const timelineData = [
    {
      year: "2025",
      title: "IT-компетенции",
      description: "Саморазвитие и подтверждение навыков на ГосУслугах.",
      skills: ["HTML+CSS 95%", "JS 85%", "Node 50%"],
      details: {
        challenges: [
          "Подготовка к комплексному экзамену по веб-разработке",
          "Изучение продвинутых паттернов проектирования",
          "Освоение современных фреймворков и библиотек"
        ],
        achievements: [
          "Получение сертификатов гос. образца",
          "Создание портфолио с лучшими работами",
          "Участие в открытых source проектах"
        ]
      }
    },
    {
      year: "2024-25",
      title: "Личные проекты & Legacy",
      description: "SPA на React + Vite, SSR-эксперименты на Next.js, Telegram-боты на Node.js. Поддержка и рефакторинг legacy-кода (jQuery → React).",
      skills: ["React 70%", "Node.js 65%", "VanillaJS 85%", "Legacy 65%"],
      details: {
        challenges: [
          "Рефакторинг устаревшего кода без потери функциональности",
          "Интеграция современных инструментов в существующие системы",
          "Оптимизация производительности legacy-приложений"
        ],
        achievements: [
          "Успешная миграция 3 проектов на современные технологии",
          "Ускорение работы приложений в 2-3 раза",
          "Внедрение практик тестирования в legacy-код"
        ]
      }
    },
    {
      year: "2022-24",
      title: "Full-stack Developer",
      description: "Полный цикл разработки веб-приложений.",
      skills: ["Vue 55%", "Python 75%", "HTML/CSS 75%"],
      details: {
        challenges: [
          "Разработка сложных бизнес-логик для enterprise-приложений",
          "Интеграция с внешними API и сервисами",
          "Обеспечение безопасности данных"
        ],
        achievements: [
          "Запуск 5+ крупных проектов в производство",
          "Сокращение времени отклика системы на 40%",
          "Получение положительных отзывов от клиентов"
        ]
      }
    },
    {
      year: "2021-23",
      title: "Фриланс-разработчик",
      description: "Адаптивные интерфейсы, API, оптимизация.",
      skills: ["Python 40%", "JS+HTML+CSS 35%", "SQL 35%"],
      details: {
        challenges: [
          "Работа с разными клиентами и их требованиями",
          "Соблюдение сроков при ограниченных ресурсах",
          "Поддержка проектов после сдачи"
        ],
        achievements: [
          "Выполнение 20+ проектов для различных клиентов",
          "Получение рейтинга 5 звезд на фриланс-платформах",
          "Построение долгосрочных отношений с клиентами"
        ]
      }
    }
  ];

  useEffect(() => {
    // Обработка закрытия модального окна по Escape
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowNewsModal(false);
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div>
      <Header />
      
      <main>
        {/* Секция "Обо мне" */}
        <section className="about-modern">
          <div className="container">
            <div className="about-top">
              <img src="/Logo.png" alt="Иван" className="about-photo" />
              <h2 className="about-title">Привет, я Иван</h2>
            </div>
            
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
                <a href="/contact" className="btn btn-primary">Связаться</a>
                <a href="/assets/cv.pdf" download className="btn btn-secondary">
                  <i className="fas fa-download"></i> Скачать CV
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Секция "Опыт работы" */}
        <ExperienceSection experiences={experienceData} />
        
        {/* Секция "Профессиональный рост" */}
        <section className="professional-growth">
          <div className="growth-container">
            <h2 className="section-title">Профессиональный рост</h2>
                                        
              <HorizontalScrollContainer scrollSpeed={3}>
                {/* Специальный блок для 2025-2026+ */}
                <FutureWorkBlock 
                  year="2025-2026+"
                  title="Работа в лучшей компании"
                  description="Развитие в области современных веб-технологий, работа над сложными проектами и командная разработка."
                  skills={["React", "TypeScript", "Node.js", "Next.js", "GraphQL", "Docker"]}
                />
                
                {/* Остальные элементы таймлайна с использованием нового компонента */}
                {timelineData.map((item, index) => (
                  <TimelineCard
                    key={index}
                    year={item.year}
                    title={item.title}
                    description={item.description}
                    skills={item.skills}
                    details={item.details}
                  />
                ))}
              </HorizontalScrollContainer>
          </div>
        </section>
        
        {/* Секция "Образование и сертификаты" */}
        <EducationSection />
        
        {/* Секция "Увлечения" */}
        <section className="hobbies-section">
          <div className="container">
            <h2 className="section-title">Мои увлечения</h2>
            <p className="section-subtitle">
              То, что вдохновляет меня вне кода
            </p>
            
            <div className="hobbies-grid">
              {hobbies.map(hobby => (
                <HobbyCard key={hobby.id} hobby={hobby} />
              ))}
            </div>
            
            <div className="hobbies-quote">
              <i className="fas fa-quote-left"></i>
              <p>
                "Увлечения — это топливо для креативности. Каждое мое хобби 
                привносит что-то новое в мою работу как разработчика."
              </p>
              <i className="fas fa-quote-right"></i>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Компоненты интерактивных элементов */}
      <NewsTab showModal={showNewsModal} setShowModal={setShowNewsModal} />
      <StubbornButton />
      <ScrollToTop />
    </div>
  );
};

export default AboutPage;