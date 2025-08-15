// src/components/SkillsSection.tsx
'use client';

import Link from 'next/link';

export default function SkillsSection() {
  const skills = [
    {
      name: "JavaScript",
      description: "Современный стек ES6+, TypeScript, Tree-shaking, Webpack&nbsp;5.",
      level: 90,
      icon: (
        <svg viewBox="0 0 256 256" className="w-10 h-10">
          <path fill="#f7df1e" d="M0 0h256v256H0z"/>
          <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.884 36.259-19.245 0-30.416-9.967-36.087-21.995M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.465-11.514 10.31 0 7.217 4.465 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.607-17.012 33.51-39.867 33.51-22.339.001-36.774-10.654-43.819-24.574" fill="#000"/>
        </svg>
      )
    },
    {
      name: "React",
      description: "Hooks, Context, Next.js, SSR, PWA, Redux&nbsp;Toolkit.",
      level: 85,
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1.03-.84 1.87-1.87 1.87-1.03 0-1.87-.84-1.87-1.87 0-1.03.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29.51c.75 1.4 1.69 2.71 2.73 3.81.23-.5.44-1.01.62-1.53-.91-.78-1.87-1.59-2.94-2.43M12 6.53c-3.35 0-6.07 1.3-6.07 2.9 0 1.6 2.72 2.9 6.07 2.9 3.35 0 6.07-1.3 6.07-2.9 0-1.6-2.72-2.9-6.07-2.9M12 22c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4m0-7.47c-1.93 0-3.5 1.57-3.5 3.5 0 1.93 1.57 3.5 3.5 3.5 1.93 0 3.5-1.57 3.5-3.5 0-1.93-1.57-3.5-3.5-3.5z" fill="#61dafb"/>
        </svg>
      )
    },
    {
      name: "Vue.js",
      description: "Composition API, Vue&nbsp;3, SSR, миграция Vue&nbsp;2 → 3.",
      level: 70,
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M3.89 3.46L12 12.57l8.11-9.11L12 0 3.89 3.46zm0 17.08L12 24l8.11-3.46V6.92L12 12.57 3.89 6.92v13.62z" fill="#4fc08d"/>
        </svg>
      )
    },
    {
      name: "Angular",
      description: "RxJS, корпоративные приложения, SEO, Angular&nbsp;Universal.",
      level: 70,
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 2L0 4l1.9 15.4L12 22l10.1-2.6L24 4z" fill="#dd0031"/>
          <path d="M12 2v20l10.1-2.6L24 4z" fill="#c3002f"/>
        </svg>
      )
    }
  ];

  return (
    <section className="skills" style={{background:'#f8f9fa', padding:'4rem 0'}}>
      <div className="container">
        <h2>Ключевые навыки</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card" 
              data-tooltip={skill.description}
            >
              <div className="skill-icon">
                {skill.icon}
              </div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
              <div className="skill-progress">
                <div 
                  className="skill-progress-bar" 
                  style={{width: `${skill.level}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:'2rem'}}>
          <Link href="/skills" className="button">Все навыки</Link>
        </div>
      </div>
    </section>
  );
}