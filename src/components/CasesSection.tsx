// src/components/CasesSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CasesSection() {
  const [slideStates, setSlideStates] = useState<{[key: number]: number}>({});
  
  const cases = [
    {
      title: "SKYT - Трекер времени",
      description: "Программа для контроля своего времени с интуитивным интерфейсом и подробной статистикой.",
      stats: [
        { label: "Результат:", value: "Повышение продуктивности пользователей на 30%" },
        { label: "Технологии:", value: "JavaScript, Vue.js, Node.js, PostgreSQL" },
        { label: "Функции:", value: "Учет времени, графики продуктивности, экспорт данных" }
      ],
      images: [
        "/img/skyt-screen1.png",
        "/img/skyt-screen2.png",
        "/img/Skyt-screenshot_1.png"
      ],
      link: "/SKYT"
    },
    {
      title: "Оптимизация Пиксельной Экосистемы",
      description: "Полный рефакторинг и переписывание игры с React на чистый JavaScript для улучшения производительности и уменьшения размера кода.",
      stats: [
        { label: "Результат:", value: "Увеличение производительности и скорость загрузки на 40%, уменьшение размера кода на 70%" },
        { label: "Технологии:", value: "JavaScript (ES6+), Canvas API, Web Workers" },
        { label: "Особенности:", value: "Полная переработка архитектуры, оптимизация алгоритмов" },
        { label: "Сложность:", value: "Адаптация React-логики к императивному стилю" }
      ],
      images: [
        "/img/pixel-eco-1.png",
        "/img/pixel-eco-2.png"
      ],
      link: "/#pixel-ecosystem-game",
      isSpecial: true
    },
    {
      title: "SentinelGuard - Сетевой администратор",
      description: "Администратор сети для мониторинга и управления сетевой безопасностью.",
      stats: [
        { label: "Результат:", value: "Автоматизация 80% рутинных задач" },
        { label: "Технологии:", value: "Python, NMap, Network Security, Bash" },
        { label: "Функции:", value: "Сканирование сети, обнаружение уязвимостей, отчеты" }
      ],
      images: [
        "/img/sentinel-screen1.png",
        "/img/sentinel-screen2.png"
      ],
      link: "/sentinelguard"
    }
  ];

  const nextSlide = (caseIndex: number) => {
    setSlideStates(prev => ({
      ...prev,
      [caseIndex]: (prev[caseIndex] || 0) === cases[caseIndex].images.length - 1 
        ? 0 
        : (prev[caseIndex] || 0) + 1
    }));
  };

  const prevSlide = (caseIndex: number) => {
    setSlideStates(prev => ({
      ...prev,
      [caseIndex]: (prev[caseIndex] || 0) === 0 
        ? cases[caseIndex].images.length - 1 
        : (prev[caseIndex] || 0) - 1
    }));
  };

  const goToSlide = (caseIndex: number, slideIndex: number) => {
    setSlideStates(prev => ({
      ...prev,
      [caseIndex]: slideIndex
    }));
  };
return (
    <section className="cases">
      <div className="container">
        <h2 style={{textAlign: "center"}}>Кейсы и результаты</h2>
        
        {cases.map((caseItem, index) => {
          const currentSlide = slideStates[index] || 0;
          
          return (
            <div key={index} className={`case-card ${caseItem.isSpecial ? 'special-case' : ''}`}>
              <div className="case-description">
                <h3>{caseItem.title}</h3>
                <p>{caseItem.description}</p>
                
                {caseItem.isSpecial && (
                  <div className="rewrite-info">
                    <h4><i className="fas fa-code"></i> Рефакторинг кода</h4>
                    <p>Переписал сложную React-игру (3000+ строк кода) на чистый Vanilla JS, сохранив всю функциональность, но значительно улучшив производительность.</p>
                    <div className="rewrite-stats">
                      <div className="rewrite-stat">
                        <i className="fas fa-file-code"></i>
                        <span className="number">-70%</span>
                        <span className="label">Объема кода</span>
                      </div>
                      <div className="rewrite-stat">
                        <i className="fas fa-tachometer-alt"></i>
                        <span className="number">+40%</span>
                        <span className="label">Производительности</span>
                      </div>
                      <div className="rewrite-stat">
                        <i className="fas fa-weight-hanging"></i>
                        <span className="number">-85%</span>
                        <span className="label">Зависимостей</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <ul className="case-stats">
                  {caseItem.stats.map((stat, statIndex) => (
                    <li key={statIndex}>
                      <strong>{stat.label}</strong> {stat.value}
                    </li>
                  ))}
                </ul>
                
                {/* Заменяем класс кнопки */}
                <Link href={caseItem.link} className="btn btn-primary">
                  {caseItem.isSpecial ? "Запустить симуляцию" : "Посмотреть проект"}
                </Link>
              </div>
              
              <div className="case-demo">
                {caseItem.images.length > 1 ? (
                  <>
                    <div className="case-images" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      {caseItem.images.map((image, imgIndex) => (
                        <Image 
                          key={imgIndex}
                          src={image} 
                          alt={`Скриншот ${caseItem.title} ${imgIndex + 1}`}
                          className="case-image"
                          width={400}
                          height={300}
                        />
                      ))}
                    </div>
                    
                    <div className="case-nav">
                      <button 
                        className="case-nav-button prev-button" 
                        onClick={() => prevSlide(index)}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button 
                        className="case-nav-button next-button" 
                        onClick={() => nextSlide(index)}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                    
                    <div className="case-pagination">
                      {caseItem.images.map((_, dotIndex) => (
                        <div 
                          key={dotIndex}
                          className={`case-pagination-dot ${dotIndex === currentSlide ? 'active' : ''}`}
                          onClick={() => goToSlide(index, dotIndex)}
                        ></div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="case-images-grid">
                    {caseItem.images.map((image, imgIndex) => (
                      <Image 
                        key={imgIndex}
                        src={image} 
                        alt={`Скриншот ${caseItem.title} ${imgIndex + 1}`}
                        className="case-image"
                        width={400}
                        height={300}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}