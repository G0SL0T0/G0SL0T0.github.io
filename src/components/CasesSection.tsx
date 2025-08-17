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
      title: "Пиксельная Экосистема",
      description: "Интерактивная симуляция экосистемы с различными сущностями, которые взаимодействуют между собой по сложным правилам поведения. Система включает эволюцию, физику столкновений и интеллектуальное поведение ИИ.",
      stats: [
        { label: "Результат:", value: "Создана увлекательная экосистема с реалистичным поведением сущностей" },
        { label: "Технологии:", value: "TypeScript, React, Canvas API" },
        { label: "Особенности:", value: "Сложное поведение ИИ, физика столкновений, эволюция сущностей" }
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
                    <h4><i className="fas fa-gamepad"></i> Интерактивная симуляция</h4>
                    <p>Полноценная экосистема с различными типами сущностей, каждая из которых обладает уникальным поведением и способностью к эволюции.</p>
                    <div className="rewrite-stats">
                      <div className="rewrite-stat">
                        <i className="fas fa-microchip"></i>
                        <span className="number">4</span>
                        <span className="label">Типа сущностей</span>
                      </div>
                      <div className="rewrite-stat">
                        <i className="fas fa-brain"></i>
                        <span className="number">ИИ</span>
                        <span className="label">Поведение</span>
                      </div>
                      <div className="rewrite-stat">
                        <i className="fas fa-atom"></i>
                        <span className="number">Физика</span>
                        <span className="label">Столкновения</span>
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
                
                {/* Кнопка с улучшенным стилем для специального кейса */}
                <Link 
                  href={caseItem.link} 
                  className={`btn ${caseItem.isSpecial ? 'btn-primary btn-game' : 'btn-primary'}`}
                >
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