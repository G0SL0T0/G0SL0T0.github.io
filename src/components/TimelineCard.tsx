// src/components/TimelineCard.tsx
'use client';
import { useState } from 'react';

interface TimelineCardProps {
  year: string;
  title: string;
  description: string;
  skills: string[];
  details?: {
    challenges?: string[];
    achievements?: string[];
    technologies?: string[];
  };
}

const TimelineCard = ({ year, title, description, skills, details }: TimelineCardProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="timeline-card">
      <span className="timeline-dot" data-year={year}></span>
      <h3>{title}</h3>
      <p>{description}</p>
      
      {/* Раздел с вызовами */}
      {details?.challenges && (
        <div className="card-section">
          <div 
            className="section-header" 
            onClick={() => toggleSection('challenges')}
          >
            <i className={`fas fa-chevron-${expandedSection === 'challenges' ? 'up' : 'down'}`}></i>
            <h4>Основные вызовы</h4>
          </div>
          {expandedSection === 'challenges' && (
            <div className="section-content">
              <ul className="challenge-list">
                {details.challenges.map((challenge, index) => (
                  <li key={index} className="challenge-item">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Раздел с достижениями */}
      {details?.achievements && (
        <div className="card-section">
          <div 
            className="section-header" 
            onClick={() => toggleSection('achievements')}
          >
            <i className={`fas fa-chevron-${expandedSection === 'achievements' ? 'up' : 'down'}`}></i>
            <h4>Достижения</h4>
          </div>
          {expandedSection === 'achievements' && (
            <div className="section-content">
              <ul className="achievement-list">
                {details.achievements.map((achievement, index) => (
                  <li key={index} className="achievement-item">
                    <i className="fas fa-trophy"></i>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Раздел с технологиями */}
      <div className="skills-container">
        <h4>Используемые технологии:</h4>
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
    </div>
  );
};

export default TimelineCard;