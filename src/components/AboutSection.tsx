// src/components/AboutSection.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="about">
      <div className="container">
        <h2>Коротко обо мне</h2>
        <div className="about-content">
          <div className="about-text boxed">
            <p>
              Я — full-stack веб-разработчик с&nbsp;<span className="accent">4+ годами</span>
              коммерческого опыта.
              Специализируюсь на&nbsp;<strong>React, Angular, Vue&nbsp;и&nbsp;Node.js</strong>.
            </p>
            <p>
              Создаю не просто «сайты», а&nbsp;инструменты, которые решают задачи бизнеса
              и&nbsp;экономят часы пользователей.
            </p>
            <ul className="feature-cards">
              <li>
                <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                <span>4+ лет опыта</span>
              </li>
              <li>
                <i className="fas fa-project-diagram" aria-hidden="true"></i>
                <span>8+ проектов</span>
              </li>
              <li>
                <i className="fas fa-smile" aria-hidden="true"></i>
                <span>100 % довольных клиентов</span>
              </li>
            </ul>
            <div className="about-actions">
              <Link href="/about" className="button">Подробнее</Link>
              <div className="resume-dropdown">
                <button className="button secondary" onClick={openModal}>📄 Скачать резюме</button>
                
                {isModalOpen && (
                  <div id="resumeModal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                      <h2 className="text-2xl font-bold mb-6 text-center">Выберите нужное</h2>
                      <div className="flex flex-col gap-3">
                        <a className="resume-choice resume-main" href="/assets/cv.pdf" download>📄 Общие навыки и увлечения</a>
                        <a className="resume-choice resume-react" href="/assets/cv-react.pdf" download>⚛️ React-специалист</a>
                        <a className="resume-choice resume-vue" href="/assets/cv-vue.pdf" download>🟢 Vue-разработчик</a>
                        <a className="resume-choice resume-angular" href="/assets/cv-angular.pdf" download>🔺 Angular-эксперт</a>
                      </div>
                      <button 
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="about-visual">
            <svg className="code-window" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="200" rx="12" fill="#1e293b"/>
              <rect x="0" y="0" width="300" height="24" fill="#0f172a" rx="12 12 0 0"/>
              <circle cx="16" cy="12" r="4" fill="#f43f5e"/>
              <circle cx="30" cy="12" r="4" fill="#f59e0b"/>
              <circle cx="44" cy="12" r="4" fill="#10b981"/>
              <g fontFamily="monospace" fontSize="11" fill="#e2e8f0">
                <text x="20" y="44">import developer from 'ivan';</text>
                <text x="20" y="58">developer.skills = {'{'}</text>
                <text x="32" y="72">frontend: ['React','Vue','Angular'],</text>
                <text x="32" y="86">backend : ['Node','Python','PostgreSQL'],</text>
                <text x="32" y="100">result : 'fast &amp; clean',</text>
                <text x="20" y="114">{'}'}</text>
              </g>
              <rect id="cursor" x="210" y="101" width="8" height="12" fill="#10b981">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
              </rect>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}