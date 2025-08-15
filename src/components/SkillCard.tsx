// src/components/SkillCard.tsx
import { useState, useEffect } from 'react'; // Добавляем импорт хуков
import { Skill } from '@/types/skills';

interface SkillCardProps {
  skill: Skill;
  category?: string;
}

const SkillCard = ({ skill, category }: SkillCardProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Анимация прогресс-бара после монтирования компонента
    const timer = setTimeout(() => {
      setProgress(skill.percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [skill.percentage]);

  const cardClass = category === 'soft' ? 'soft-skill-card' : 'skill-card';

  return (
    <div className={cardClass} data-tooltip={skill.tooltip}>
      <i className={skill.icon}></i>
      <h3>{skill.name}</h3>
      <div className="skill-percentage">{skill.percentage}%</div>
      <div className="skill-progress">
        <div 
          className="skill-progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillCard;