// src/components/SkillCategory.tsx
import { SkillCategory } from '@/types/skills';
import SkillCard from './SkillCard';

interface SkillCategoryProps {
  category: SkillCategory;
}

const SkillCategoryComponent = ({ category }: SkillCategoryProps) => {
  return (
    <section className="skill-category" id={category.id}>
      <h2>{category.title}</h2>
      <div className="skills-grid">
        {category.skills.map(skill => (
          <SkillCard 
            key={skill.id} 
            skill={skill} 
            category={category.id} 
          />
        ))}
      </div>
    </section>
  );
};

export default SkillCategoryComponent;