// src/components/SkillsSection.tsx
import { skillsData } from '@/data/skillsData';
import SkillCategoryComponent from './SkillCategory';

const SkillsSection = () => {
  return (
    <>
      <section className="intro-skills">
        <div className="container">
          <h1>Мои навыки и компетенции</h1>
          <p>
            На этой странице собраны ключевые технические и поведенческие навыки, которые я использую в работе.  
            Каждый элемент включает иконку, название, процент владения и краткое описание при наведении.  
            Данные регулярно обновляются по мере роста опыта и освоения новых инструментов.
          </p>
          <div className="intro-actions">
            <a href="#frontend" className="button">Фронтенд</a>
            <a href="#backend" className="button">Бэкенд</a>
            <a href="#tools" className="button">Инструменты</a>
            <a href="#testing" className="button">Тестирование</a>
            <a href="#devops" className="button">DevOps</a>
            <a href="#additional" className="button">Доп. технологии</a>
            <a href="#soft" className="button secondary">Soft Skills</a>
          </div>
        </div>  
      </section>
      
      {skillsData.map(category => (
        <SkillCategoryComponent key={category.id} category={category} />
      ))}
    </>
  );
};

export default SkillsSection;