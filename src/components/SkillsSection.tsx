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
            <a href="#frontend" className="btn btn-primary">Фронтенд</a>
            <a href="#backend" className="btn btn-primary">Бэкенд</a>
            <a href="#tools" className="btn btn-primary">Инструменты</a>
            <a href="#testing" className="btn btn-primary">Тестирование</a>
            <a href="#devops" className="btn btn-primary">DevOps</a>
            <a href="#additional" className="btn btn-primary">Доп. технологии</a>
            <a href="#soft" className="btn btn-secondary">Soft Skills</a>
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