// src/components/SkillsPreview.tsx
'use client';

import '@/styles/skills-preview.css';
import { useState } from 'react';
import { skillsData } from '@/data/skillsData';
import SkillCard from './SkillCard';
import Link from 'next/link';

const SkillsPreview = () => {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showGit, setShowGit] = useState(false);
  const [showDocker, setShowDocker] = useState(false);

  const openGift = () => {
    setIsGiftOpened(true);
    // Появление Git и Code Commit одновременно с открытием подарка
    setShowGit(true);
    // Появление Docker и Containerize с задержкой
    setTimeout(() => setShowDocker(true), 800);
  };

  // Явно указываем ID навыков в нужном порядке
  const targetSkillIds = ['js', 'typescript', 'react', 'vue', 'angular', 'git', 'docker'];
  
  // Находим нужные навыки в данных
  const previewSkills = skillsData
    .flatMap(category => 
      category.skills
        .filter(skill => targetSkillIds.includes(skill.id))
        .map(skill => ({
          ...skill,
          category: category.id
        }))
    )
    // Сортируем в нужном порядке (как в targetSkillIds)
    .sort((a, b) => {
      return targetSkillIds.indexOf(a.id) - targetSkillIds.indexOf(b.id);
    });

  return (
    <section className="skills-preview">
      <div className="container">
        <h2>Мои ключевые навыки</h2>
        <p className="skills-intro">
          Краткий обзор моих основных компетенций. Полный список навыков доступен на отдельной странице.
        </p>
        
        <div className="skills-grid">
          {/* JavaScript и TypeScript */}
          {previewSkills.filter(skill => ['js', 'typescript'].includes(skill.id)).map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              category={skill.category} 
            />
          ))}
          
          {/* Разделитель для фреймворков */}
          <div className="frameworks-divider">Фреймворки</div>
          
          {/* Фреймворки */}
          {previewSkills.filter(skill => ['react', 'vue', 'angular'].includes(skill.id)).map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              category={skill.category} 
            />
          ))}
          
          {/* Подарочный контейнер для Git и Docker */}
          <div className="tools-showcase">
            {/* Заглушка (подарок) */}
            {!isGiftOpened && (
              <div className="gift-container" onClick={openGift}>
                <div className="gift-paper">
                  <div className="gift-ribbon"></div>
                  <div className="gift-bow">
                    <div className="bow-left"></div>
                    <div className="bow-right"></div>
                    <div className="bow-center"></div>
                  </div>
                  <div className="gift-label">
                    <span>Дополнительно</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Контент (после открытия) */}
            {isGiftOpened && (
              <div className="gift-content">
                <div className="tools-container">
                  {/* Git и Code Commit - появляются сразу */}
                  {showGit && (
                    <div className="tools-row animate-item-1">
                      {previewSkills.filter(skill => skill.id === 'git').map(skill => (
                        <SkillCard 
                          key={skill.id} 
                          skill={skill} 
                          category={skill.category} 
                        />
                      ))}
                      <div className="step-card git-step">
                        <div className="step-icon">
                          <i className="fab fa-git-alt"></i>
                        </div>
                        <div className="step-content">
                          <h4>Code Commit</h4>
                          <p>Версионный контроль с помощью Git</p>
                          <div className="step-details">
                            <span>Коммиты кода</span>
                            <span>Ветвление</span>
                            <span>Слияние изменений</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Соединитель - появляется с задержкой */}
                  {showDocker && (
                    <div className="tools-connector animate-item-2">
                      <div className="connector-line"></div>
                      <div className="connector-arrow">
                        <i className="fas fa-arrow-down"></i>
                      </div>
                    </div>
                  )}
                  
                  {/* Docker и Containerize - появляются с задержкой */}
                  {showDocker && (
                    <div className="tools-row animate-item-3">
                      {previewSkills.filter(skill => skill.id === 'docker').map(skill => (
                        <SkillCard 
                          key={skill.id} 
                          skill={skill} 
                          category={skill.category} 
                        />
                      ))}
                      <div className="step-card docker-step">
                        <div className="step-icon">
                          <i className="fab fa-docker"></i>
                        </div>
                        <div className="step-content">
                          <h4>Containerize</h4>
                          <p>Контейнеризация с помощью Docker</p>
                          <div className="step-details">
                            <span>Создание образа</span>
                            <span>Настройка окружения</span>
                            <span>Развертывание</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* CI/CD Pipeline - появляется после Docker */}
                {showDocker && (
                  <div className="pipeline-container animate-item-4">
                    <div className="pipeline-header">
                      <i className="fas fa-cogs"></i>
                      <h3>CI/CD Pipeline</h3>
                    </div>
                  </div>
                )}
                
                {/* Production Ready - появляется после CI/CD */}
                {showDocker && (
                  <div className="pipeline-footer animate-item-5">
                    <div className="status-badge success">
                      <i className="fas fa-check-circle"></i>
                      <span>Production Ready</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="skills-actions">
          <Link href="/skills" className="button">
            Все навыки
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;