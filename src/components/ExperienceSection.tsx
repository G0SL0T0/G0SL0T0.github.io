// src/components/ExperienceSection.tsx
'use client';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
  technologies?: string[];
}

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <section className="experience">
      <div className="container">
        <h2>Опыт работы</h2>
        
        <div className="experience-list">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-position">{experience.position}</h3>
                <p className="experience-company">{experience.company}</p>
                <span className="experience-period">{experience.period}</span>
              </div>
              
              <div className="experience-body">
                <h4 className="experience-section-title">
                  <i className="fas fa-tasks"></i> Обязанности:
                </h4>
                <ul className="experience-list">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                
                {experience.technologies && experience.technologies.length > 0 && (
                  <>
                    <h4 className="experience-section-title">
                      <i className="fas fa-code"></i> Используемые технологии:
                    </h4>
                    <div className="experience-tech-list">
                      {experience.technologies.map((tech, index) => (
                        <span key={index} className="experience-tech-item">{tech}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;