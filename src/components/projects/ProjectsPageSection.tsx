// src/components/projects/ProjectsPageSection.tsx
'use client';

import { useState } from 'react';
import { projectsData } from '@/data/projectsData';
import ProjectAccordionCard from './ProjectAccordionCard';
import ProjectScreenshotModal from './ProjectScreenshotModal';

const ProjectsPageSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  const openModal = (src: string) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Вводная секция с улучшенным дизайном */}
      <section className="projects-prelude">
        <div className="container">
          <div className="prelude-header">
            <h2 className="prelude-title">Кейсы и проекты</h2>
            <p className="prelude-subtitle">Список постоянно обновляется</p>
          </div>
          
          <p className="prelude-lead">
            Ниже собраны живые примеры интерфейсов и мини-игр, которые я разрабатывал «с нуля» без бэкенда и сторонних CMS.  
            Все кейсы открываются в браузере, работают офлайн и демонстрируют именно фронтенд-часть: верстку, логику, анимацию и производительность.
          </p>
          
          <div className="prelude-grid">
            <div className="prelude-card">
              <div className="card-icon">
                <i className="fas fa-palette"></i>
              </div>
              <h3>UI / UX детали</h3>
              <p>Тонкая настройка цвета, тени, микро-анимаций и фидбеков на каждое действие.</p>
            </div>
            
            <div className="prelude-card">
              <div className="card-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Производительность</h3>
              <p>Метрики Lighthouse, FPS-каунтеры и «чистый» бандл без лишних килобайт.</p>
            </div>
            
            <div className="prelude-card">
              <div className="card-icon">
                <i className="fas fa-gamepad"></i>
              </div>
              <h3>Интерактив</h3>
              <p>Canvas, WebGL, drag-n-drop и игровые механики на чистом JavaScript.</p>
            </div>
            
            <div className="prelude-card">
              <div className="card-icon">
                <i className="fas fa-file-export"></i>
              </div>
              <h3>Экспорт данных</h3>
              <p>Генерация CSV, JSON или изображений прямо в браузере без сервера.</p>
            </div>
          </div>
          
          <div className="prelude-note">
            <p>
              👉 Нажмите «Посмотреть проект», чтобы открыть демо в новой вкладке.  
              Исходный код каждого кейса доступен на GitHub по запросу.
            </p>
          </div>
        </div>
      </section>
      
      {/* Разделитель с анимированной иконкой */}
      <div className="prelude-divider">
        <i className="fas fa-chevron-down fa-2x"></i>
      </div>
      
      {/* Секция с проектами */}
      <section className="projects">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Проекты и выполненные Кейсы</h1>
          </div>
          
          <div className="project-accordion">
            {projectsData.map((project) => (
              <ProjectAccordionCard 
                key={project.id} 
                project={project} 
                openModal={openModal}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Модальное окно для скриншотов */}
      <ProjectScreenshotModal 
        isOpen={modalOpen}
        imageSrc={modalImageSrc}
        onClose={closeModal}
      />
    </>
  );
};

export default ProjectsPageSection;