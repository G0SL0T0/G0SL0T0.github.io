// src/components/projects/ProjectAccordionCard.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';
import Button from '@/components/ui/button';

interface ProjectAccordionCardProps {
  project: Project;
  openModal: (src: string) => void;
}

const ProjectAccordionCard = ({ project, openModal }: ProjectAccordionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderLogo = () => {
    if (project.logoType === 'li') {
      return (
        <div className="li-logo" aria-label="LI">
          <span>SMf</span>
        </div>
      );
    } else if (project.logoType === 'pixel') {
      return (
        <div className="pixel-logo" aria-label="PR">
          <span>PR</span>
        </div>
      );
    } else if (project.logoType === 'uc') {
      return (
        <div className="uc-logo" aria-label="UC">
          <span>UC</span>
        </div>
      );
    } else {
      return (
        <Image 
          src={project.thumbnail} 
          alt={project.title} 
          width={60}
          height={60}
          className="project-thumbnail" 
        />
      );
    }
  };

  return (
    <div className="project-item">
      <input 
        type="checkbox" 
        id={`project-${project.id}`} 
        className="project-checkbox" 
        checked={isOpen}
        onChange={toggleOpen}
      />
      <label 
        htmlFor={`project-${project.id}`} 
        className="project-header"
      >
        <div className="project-title">
          {renderLogo()}
          <h2>
            {project.title}
            {project.badge && <span className="badge">{project.badge}</span>}
            {project.comingSoon && <span className="badge coming">скоро</span>}
          </h2>
        </div>
        <i className={`fas fa-chevron-down project-icon ${isOpen ? 'open' : ''}`}></i>
      </label>
      <div className={`project-content ${isOpen ? 'open' : ''}`}>
        <div className="project-details">
          <div className="project-description">
            <h3>Описание проекта</h3>
            <p>{project.description}</p>
            <div className="project-features">
              <h4>Основные функции:</h4>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature.text}</li>
                ))}
              </ul>
            </div>
            <div className="project-actions">
              {project.demoUrl && (
                <Button asChild className="project-view-btn">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Посмотреть проект <i className="fas fa-external-link-alt"></i>
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" className="project-view-btn">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i> Код на GitHub
                  </a>
                </Button>
              )}
              {project.comingSoon && (
                <Button disabled className="project-view-btn" style={{cursor:'not-allowed',opacity:.5}}>
                  <i className="fas fa-hourglass-half"></i> Demo скоро
                </Button>
              )}
            </div>
          </div>
          <div className="project-tech">
            <h3>Использованные технологии</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech.name}</span>
              ))}
            </div>
          </div>
          {project.screenshots.length > 0 && (
            <div className="project-screenshots">
              <h4>Скриншоты проекта:</h4>
              <div className="screenshots-grid">
                {project.screenshots.map((screenshot, index) => (
                  <Image 
                    key={index}
                    src={screenshot.src} 
                    alt={screenshot.alt}
                    width={300}
                    height={200}
                    onClick={() => openModal(screenshot.src)}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAccordionCard;