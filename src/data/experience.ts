// src/data/experience.ts
export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
  technologies?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    company: "БАРС Груп",
    position: "Frontend Developer",
    period: "09.2024 – 05.2025",
    responsibilities: [
      "Поддержка и рефакторинг legacy-кода на React/Next.js, Vue/Nuxt.js, Angular",
      "Менторство команды, code-review",
      "Внедрение TDD и лучших практик разработки"
    ],
    technologies: ["React", "Next.js", "Vue", "Nuxt.js", "Angular", "TypeScript", "Jest", "Cypress"]
  },
  {
    id: 2,
    company: "АО НПК 'УралВагонЗавод'",
    position: "Инженер программист",
    period: "09.2021 – 05.2024",
    responsibilities: [
      "Разработка enterprise-приложений на Angular, React, Vue",
      "Внедрение Git и CI/CD процессов",
      "Поддержка и оптимизация legacy-систем",
      "Документирование кода и менторство новых разработчиков"
    ],
    technologies: ["Angular", "React", "Vue", "TypeScript", "Git", "Docker", "CI/CD"]
  }
];