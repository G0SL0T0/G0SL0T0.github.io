'use client';

import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Последний проект</h2>
        
        <div className="max-w-4xl mx-auto">
          <ProjectCard
            title="SKYT — трекер времени"
            description="MVP в разработке: базовый учёт задач, таймеры и экспорт CSV уже работают. Следующий релиз добавит аналитику и мобильную версию."
            image="/images/skyt-logo.png"
            demoUrl="/SKYT/index.html"
            detailsUrl="/projects"
            metrics={[
              { icon: "fas fa-tools", text: "Текущая стадия: MVP" },
              { icon: "fas fa-rocket", text: "Релиз PWA: Декабрь 2025" }
            ]}
          />
        </div>
      </div>
    </section>
  );
}