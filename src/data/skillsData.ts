// src/data/skillsData.ts
import { SkillCategory } from '@/types/skills';

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Фронтенд-разработка',
    skills: [
      {
        id: 'html',
        name: 'HTML5',
        icon: 'fab fa-html5',
        percentage: 95,
        tooltip: 'Семантическая верстка, доступность, современные API'
      },
      {
        id: 'css',
        name: 'CSS3',
        icon: 'fab fa-css3-alt',
        percentage: 90,
        tooltip: 'Flexbox, Grid, анимации, препроцессоры'
      },
      {
        id: 'js',
        name: 'JavaScript',
        icon: 'fab fa-js',
        percentage: 85,
        tooltip: 'ES6+, асинхронное программирование, паттерны'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: 'fas fa-code',
        percentage: 80,
        tooltip: 'Статическая типизация, интерфейсы, дженерики'
      },
      {
        id: 'angular',
        name: 'Angular',
        icon: 'fab fa-angular',
        percentage: 70,
        tooltip: 'Components, Services, RxJS'
      },
      {
        id: 'vue',
        name: 'Vue.js',
        icon: 'fab fa-vuejs',
        percentage: 70,
        tooltip: 'Vuex, Vue Router, Composition API'
      },
      {
        id: 'react',
        name: 'React',
        icon: 'fab fa-react',
        percentage: 65,
        tooltip: 'Hooks, Context API, Redux, Next.js'
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: 'fas fa-layer-group',
        percentage: 60,
        tooltip: 'SSR, SSG, API Routes, Middleware'
      },
      {
        id: 'nuxtjs',
        name: 'Nuxt.js',
        icon: 'fas fa-layer-group',
        percentage: 60,
        tooltip: 'Vue SSR, статическая генерация, модули'
      },
      {
        id: 'pwa',
        name: 'PWA',
        icon: 'fas fa-mobile-alt',
        percentage: 65,
        tooltip: 'Service Workers, Web App Manifest, оффлайн-режим'
      },
      {
        id: 'webgl',
        name: 'WebGL',
        icon: 'fas fa-cube',
        percentage: 55,
        tooltip: '3D-графика, шейдеры, Three.js'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Бэкенд-разработка',
    skills: [
      {
        id: 'python',
        name: 'Python',
        icon: 'fab fa-python',
        percentage: 75,
        tooltip: 'Django, Flask, скрипты, автоматизация, боты'
      },
      {
        id: 'node',
        name: 'Node.js',
        icon: 'fab fa-node-js',
        percentage: 55,
        tooltip: 'Express, REST API, аутентификация'
      },
      {
        id: 'express',
        name: 'Express.js',
        icon: 'fas fa-server',
        percentage: 50,
        tooltip: 'REST API, middleware, шаблонизация'
      },
      {
        id: 'fastapi',
        name: 'FastAPI',
        icon: 'fas fa-bolt',
        percentage: 45,
        tooltip: 'Современный фреймворк, автоматическая документация'
      },
      {
        id: 'flask',
        name: 'Flask',
        icon: 'fas fa-flask',
        percentage: 40,
        tooltip: 'Микрофреймворк, расширения, REST API'
      },
      {
        id: 'db',
        name: 'Базы данных',
        icon: 'fas fa-database',
        percentage: 70,
        tooltip: 'PostgreSQL, SQLite, MongoDB'
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: 'fas fa-database',
        percentage: 65,
        tooltip: 'Реляционная БД, индексы, запросы'
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: 'fas fa-leaf',
        percentage: 60,
        tooltip: 'NoSQL, документоориентированная БД'
      },
      {
        id: 'api',
        name: 'API дизайн',
        icon: 'fas fa-plug',
        percentage: 70,
        tooltip: 'REST, GraphQL, документация'
      },
      {
        id: 'websocket',
        name: 'WebSocket',
        icon: 'fas fa-exchange-alt',
        percentage: 60,
        tooltip: 'Реальное время, сокеты, события'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Инструменты разработки',
    skills: [
      {
        id: 'git',
        name: 'Git',
        icon: 'fab fa-git-alt',
        percentage: 85,
        tooltip: 'Git, GitHub, контроль версий'
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: 'fab fa-github',
        percentage: 80,
        tooltip: 'Репозитории, Issues, Actions, Pages'
      },
      {
        id: 'gitlab',
        name: 'GitLab',
        icon: 'fab fa-gitlab',
        percentage: 70,
        tooltip: 'CI/CD, репозитории, DevOps'
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: 'fab fa-docker',
        percentage: 50,
        tooltip: 'Контейнеризация, Docker Compose'
      },
      {
        id: 'nginx',
        name: 'Nginx',
        icon: 'fas fa-server',
        percentage: 55,
        tooltip: 'Веб-сервер, реверс-прокси, балансировка'
      },
      {
        id: 'vite',
        name: 'Vite',
        icon: 'fas fa-bolt',
        percentage: 70,
        tooltip: 'Сборщик проектов, HMR, оптимизация'
      },
      {
        id: 'eslint',
        name: 'ESLint',
        icon: 'fas fa-check-circle',
        percentage: 75,
        tooltip: 'Линтинг кода, правила, автоправка'
      },
      {
        id: 'prettier',
        name: 'Prettier',
        icon: 'fas fa-code',
        percentage: 75,
        tooltip: 'Форматирование кода, стили'
      },
      {
        id: 'figma',
        name: 'Figma',
        icon: 'fab fa-figma',
        percentage: 65,
        tooltip: 'Дизайн интерфейсов, прототипы, компоненты'
      },
      {
        id: 'storybook',
        name: 'Storybook',
        icon: 'fas fa-book',
        percentage: 60,
        tooltip: 'Документация компонентов, тестирование UI'
      }
    ]
  },
  {
    id: 'testing',
    title: 'Тестирование',
    skills: [
      {
        id: 'jest',
        name: 'Jest',
        icon: 'fas fa-vial',
        percentage: 70,
        tooltip: 'Юнит-тесты, моки, покрытие кода'
      },
      {
        id: 'rtl',
        name: 'React Testing Library',
        icon: 'fab fa-react',
        percentage: 65,
        tooltip: 'Тестирование React компонентов'
      },
      {
        id: 'cypress',
        name: 'Cypress',
        icon: 'fas fa-vial',
        percentage: 60,
        tooltip: 'E2E тестирование, интеграционные тесты'
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        icon: 'fas fa-vial',
        percentage: 55,
        tooltip: 'BDD тесты, спеки'
      },
      {
        id: 'karma',
        name: 'Karma',
        icon: 'fas fa-vial',
        percentage: 50,
        tooltip: 'Тест раннер, браузеры'
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    skills: [
      {
        id: 'ci-cd',
        name: 'CI/CD',
        icon: 'fas fa-cogs',
        percentage: 60,
        tooltip: 'Непрерывная интеграция и доставка'
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        icon: 'fab fa-github',
        percentage: 65,
        tooltip: 'Автоматизация workflows, деплой'
      },
      {
        id: 'monorepo',
        name: 'Монорепозитории',
        icon: 'fas fa-project-diagram',
        percentage: 55,
        tooltip: 'Управление несколькими проектами'
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: 'fas fa-dharmachakra',
        percentage: 40,
        tooltip: 'Оркестрация контейнеров, сервисы'
      },
      {
        id: 'ansible',
        name: 'Ansible',
        icon: 'fas fa-cogs',
        percentage: 45,
        tooltip: 'Автоматизация конфигурации, деплой'
      }
    ]
  },
  {
    id: 'additional',
    title: 'Дополнительные технологии',
    skills: [
      {
        id: 'threejs',
        name: 'Three.js',
        icon: 'fas fa-cube',
        percentage: 50,
        tooltip: '3D-графика в браузере, сцены, материалы'
      },
      {
        id: 'canvas',
        name: 'Canvas API',
        icon: 'fas fa-paint-brush',
        percentage: 65,
        tooltip: '2D-графика, анимации, игры'
      },
      {
        id: 'chartjs',
        name: 'Chart.js',
        icon: 'fas fa-chart-bar',
        percentage: 60,
        tooltip: 'Графики, диаграммы, визуализация данных'
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        icon: 'fas fa-wind',
        percentage: 70,
        tooltip: 'Utility-first CSS, компоненты'
      },
      {
        id: 'styled-components',
        name: 'Styled Components',
        icon: 'fas fa-palette',
        percentage: 65,
        tooltip: 'CSS-in-JS, темы, компоненты'
      },
      {
        id: 'rxjs',
        name: 'RxJS',
        icon: 'fas fa-stream',
        percentage: 60,
        tooltip: 'Реактивное программирование, потоки'
      },
      {
        id: 'angular-material',
        name: 'Angular Material',
        icon: 'fas fa-layer-group',
        percentage: 55,
        tooltip: 'UI компоненты для Angular'
      },
      {
        id: 'pinia',
        name: 'Pinia',
        icon: 'fas fa-database',
        percentage: 60,
        tooltip: 'State менеджмент для Vue 3'
      }
    ]
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    skills: [
      {
        id: 'communication',
        name: 'Коммуникация',
        icon: 'fas fa-comments',
        percentage: 90,
        tooltip: 'Чёткое и дружелюбное объяснение технических вещей'
      },
      {
        id: 'teamwork',
        name: 'Командная работа',
        icon: 'fas fa-users',
        percentage: 85,
        tooltip: 'Code-review, митинги, кросс-функциональные команды'
      },
      {
        id: 'timemanagement',
        name: 'Тайм-менеджмент',
        icon: 'fas fa-clock',
        percentage: 99,
        tooltip: 'Грамотное планирование и соблюдение дедлайнов'
      },
      {
        id: 'creativity',
        name: 'Креативность',
        icon: 'fas fa-lightbulb',
        percentage: 75,
        tooltip: 'Нестандартные решения и улучшение UX/UI'
      },
      {
        id: 'responsibility',
        name: 'Ответственность',
        icon: 'fas fa-shield-alt',
        percentage: 95,
        tooltip: 'Внимание к качеству кода и деталям проекта'
      },
      {
        id: 'selflearning',
        name: 'Самообучение',
        icon: 'fas fa-book-open',
        percentage: 100,
        tooltip: 'Постоянное изучение новых технологий'
      },
      {
        id: 'criticalthinking',
        name: 'Критическое мышление',
        icon: 'fas fa-bullseye',
        percentage: 80,
        tooltip: 'Анализ проблем и обоснование решений'
      },
      {
        id: 'empathy',
        name: 'Эмпатия',
        icon: 'fas fa-handshake',
        percentage: 85,
        tooltip: 'Понимание пользователей и коллег'
      },
      {
        id: 'flexibility',
        name: 'Гибкость',
        icon: 'fas fa-adjust',
        percentage: 80,
        tooltip: 'Адаптация к изменениям и приоритетам'
      },
      {
        id: 'organization',
        name: 'Организованность',
        icon: 'fas fa-tasks',
        percentage: 85,
        tooltip: 'Чёткая структура задач, документация и порядок в работе'
      },
      {
        id: 'mentoring',
        name: 'Менторство',
        icon: 'fas fa-chalkboard-teacher',
        percentage: 75,
        tooltip: 'Обучение коллег, передача знаний'
      },
      {
        id: 'agile',
        name: 'Agile/Scrum',
        icon: 'fas fa-sync-alt',
        percentage: 80,
        tooltip: 'Гибкие методологии, спринты, ретроспективы'
      },
      {
        id: 'planning',
        name: 'Стратегическое планирование',
        icon: 'fas fa-chess',
        percentage: 75,
        tooltip: 'Долгосрочное планирование, приоритизация'
      }
    ]
  }
];