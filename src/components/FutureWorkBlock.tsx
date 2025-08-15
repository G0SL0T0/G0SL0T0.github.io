// src/components/FutureWorkBlock.tsx
'use client';
import { useState } from 'react';

interface FutureWorkBlockProps {
  year: string;
  title: string;
  description: string;
  skills: string[];
}

const FutureWorkBlock = ({ year, title, description, skills }: FutureWorkBlockProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="future-work-card">
      <div className="future-badge">Планы на будущее</div>
      <span className="timeline-dot" data-year={year}></span>
      <h3>{title}</h3>
      <p>{description}</p>
      
      {/* Раздел с ключевыми задачами */}
      <div className="card-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('tasks')}
        >
          <i className={`fas fa-chevron-${expandedSection === 'tasks' ? 'up' : 'down'}`}></i>
          <h4>Ключевые задачи</h4>
        </div>
        {expandedSection === 'tasks' && (
          <div className="section-content">
            <ul className="task-list">
              <li className="task-item">
                <i className="fas fa-rocket"></i>
                <span>Разработка масштабируемых микросервисных архитектур</span>
              </li>
              <li className="task-item">
                <i className="fas fa-code-branch"></i>
                <span>Внедрение практик CI/CD и DevOps</span>
              </li>
              <li className="task-item">
                <i className="fas fa-users-cog"></i>
                <span>Оптимизация командной разработки и процессов</span>
              </li>
              <li className="task-item">
                <i className="fas fa-shield-alt"></i>
                <span>Повышение безопасности приложений</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Раздел с ожидаемыми результатами */}
      <div className="card-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('results')}
        >
          <i className={`fas fa-chevron-${expandedSection === 'results' ? 'up' : 'down'}`}></i>
          <h4>Ожидаемые результаты</h4>
        </div>
        {expandedSection === 'results' && (
          <div className="section-content">
            <div className="result-item">
              <div className="result-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="result-text">
                <h5>Рост производительности</h5>
                <p>Увеличение скорости работы приложений на 40-60%</p>
              </div>
            </div>
            <div className="result-item">
              <div className="result-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="result-text">
                <h5>Командное развитие</h5>
                <p>Повышение эффективности командной работы на 30%</p>
              </div>
            </div>
            <div className="result-item">
              <div className="result-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="result-text">
                <h5>Инновации</h5>
                <p>Внедрение передовых технологий и практик</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Раздел с навыками */}
      <div className="skills-container">
        <h4>Ключевые навыки:</h4>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Раздел с преимуществами */}
      <div className="future-features">
        <div className="feature">
          <i className="fas fa-rocket"></i>
          <span>Инновационные проекты</span>
        </div>
        <div className="feature">
          <i className="fas fa-users"></i>
          <span>Сильная команда</span>
        </div>
        <div className="feature">
          <i className="fas fa-chart-line"></i>
          <span>Карьерный рост</span>
        </div>
      </div>
    </div>
  );
};

export default FutureWorkBlock;