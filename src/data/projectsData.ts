// src/data/projectsData.ts
import { Project } from '@/types/project';
export const projectsData: Project[] = [
  {
    id: 'skyt',
    title: 'SKYT - Трекер времени',
    description: 'Программа для контроля своего времени с интуитивным интерфейсом и подробной статистикой. Помогает эффективно планировать и отслеживать затраты времени.',
    features: [
      { text: 'Учет времени по проектам и задачам' },
      { text: 'Графики и отчеты по продуктивности' },
      { text: 'Экспорт данных в CSV' },
      { text: 'Настраиваемые категории и теги' }
    ],
    technologies: [
      { name: 'JavaScript' },
      { name: 'Vue.js' },
      { name: 'Node.js' },
      { name: 'PostgreSQL' }
    ],
    screenshots: [
      { src: '/img/skyt-screen1.png', alt: 'SKYT_1' },
      { src: '/img/skyt-screen2.png', alt: 'SKYT_2' }
    ],
    demoUrl: '/SKYT/index.html',
    thumbnail: '/img/skyt.png',
    badge: 'BEST'
  },
  {
    id: 'sentinelguard',
    title: 'SentinelGuard - Сетевой администратор',
    description: 'Администратор сети, разработанный на Python и NMap. Предназначен для мониторинга и управления сетевой безопасностью.',
    features: [
      { text: 'Сканирование сети и устройств' },
      { text: 'Обнаружение открытых портов' },
      { text: 'Мониторинг активности в сети' },
      { text: 'Генерация отчетов о безопасности' }
    ],
    technologies: [
      { name: 'Python' },
      { name: 'NMap' },
      { name: 'Network Security' },
      { name: 'Bash' }
    ],
    screenshots: [
      { src: '/img/sentinel-screen1.png', alt: 'SentinelGuard интерфейс' },
      { src: '/img/sentinel-screen2.png', alt: 'SentinelGuard отчет' }
    ],
    demoUrl: '/sentinelguard/index.html',
    thumbnail: '/img/shield-icon.png',
    badge: 'BEST'
  },
  {
    id: 'pixel-ecosystem',
    title: 'Оптимизация Пиксельной Экосистемы',
    description: 'Полный рефакторинг и переписывание игры с React (3000+ строк) на чистый Vanilla JS. Цель — улучшить производительность, сократить время загрузки и убрать зависимости.',
    features: [
      { text: 'Уменьшение размера бандла на 85% (без React + Webpack)' },
      { text: 'Ускорение первой отрисовки на 40% за счёт отказа от VDOM' },
      { text: 'Архитектура «Entity–Component–System» на чистых классах ES6' },
      { text: 'Анимация через requestAnimationFrame и Canvas 2D' },
      { text: 'Локальное хранилище состояния без сторонних библиотек' }
    ],
    technologies: [
      { name: 'JavaScript ES6+' },
      { name: 'Canvas 2D API' },
      { name: 'Web Workers' },
      { name: 'CSS Custom Properties' }
    ],
    screenshots: [
      { src: '/img/pixel-eco-1.png', alt: 'До оптимизации (React)' },
      { src: '/img/pixel-eco-2.png', alt: 'После оптимизации (Vanilla JS)' }
    ],
    demoUrl: '/index.html#pixel-ecosystem-game',
    thumbnail: '/img/pixel.png',
    badge: 'BEST'
  },
  {
    id: 'static-markforge',
    title: 'Static MarkForge - генератор сайтов (не ИИ)',
    description: 'Браузерный генератор статических сайтов из Markdown. Drag-and-drop файл → получаем готовый HTML-сайт за 60 секунд, без серверов.',
    features: [
      { text: 'Pure JavaScript (ES2023)' },
      { text: 'Live-preview и instant ZIP-экспорт' },
      { text: 'Responsive тема + SEO meta-теги' },
      { text: 'Работает офлайн, вес < 150 KB' }
    ],
    technologies: [
      { name: 'Vanilla JS ES2023' },
      { name: 'Marked.js' },
      { name: 'FileSaver.js' },
      { name: 'CSS Grid/Flex' },
      { name: 'PWA-ready' }
    ],
    screenshots: [],
    demoUrl: '/static-site-gen/index.html',
    githubUrl: 'https://github.com/G0SL0T0/static-site-gen-js',
    logoType: 'li',
    thumbnail: '/img/casein.png'
  },
  {
    id: 'remote-installer',
    title: 'Практический кейс испытания (Лига Рабочих Специальностей)',
    description: 'Внутренний сервис для деплоя ПО в закрытых сетях. Python-backend отправляет плейбуки Ansible по SSH и отслеживает статус установки на каждом хосте в реальном времени.',
    features: [
      { text: 'REST API: /deploy, /status, /logs' },
      { text: 'Ansible-роли для SAP, Docker, PostgreSQL, Nginx' },
      { text: 'WebSocket-стрим логов установки' },
      { text: 'JWT-авторизация и RBAC' }
    ],
    technologies: [
      { name: 'Python 3.12' },
      { name: 'FastAPI' },
      { name: 'Ansible Core' },
      { name: 'SSH Paramiko' },
      { name: 'Redis' },
      { name: 'WebSocket' }
    ],
    screenshots: [
      { src: '/img/Case_screenshot_1.png', alt: 'Dashboard' },
      { src: '/img/Case_screenshot_2.png', alt: 'Real-time log' }
    ],
    demoUrl: '/case/remote-admin.html',
    thumbnail: '/img/case.png'
  },
  {
    id: 'python-scripts',
    title: 'Python-скриптотека',
    description: 'Личный репозиторий «Python-скриптотека», который я собирал для себя и теперь делюсь с сообществом. Начинается с самых базовых логических операций и заканчивается алгоритмическими паттернами.',
    features: [
      { text: '100+ примеров от if/else до рекурсивных деревьев' },
      { text: 'Готовые паттерны: «обход графа», «декораторы», «генераторы», «кэш»' },
      { text: 'Пошаговые комментарии + playground-файлы' },
      { text: 'Zero-dependency: запускается в любом Python ≥ 3.8' }
    ],
    technologies: [
      { name: 'Python 3.10+' },
      { name: 'Jupyter' },
      { name: 'MkDocs' },
      { name: 'Rich CLI' },
      { name: 'PyTest' }
    ],
    screenshots: [],
    githubUrl: 'https://github.com/G0SL0T0/P-thon_members_lessons',
    thumbnail: '/img/case1_python.png'
  },
  {
    id: 'js-game',
    title: 'Js - game',
    description: 'Мини игра с не Мини сюжетом. Сюжет игры из личной вселенной, исторически сложенный. Процедурная генерация, продвинутая физика (логика). Файловое сохранение - без серверной части.',
    features: [
      { text: 'Дизайн - в разработке' },
      { text: 'Ключевая механика - в разработке' },
      { text: 'Физика - в разработке' },
      { text: 'Работает на всех устройствасх - vanila JS, без привязки к типу устройств' }
    ],
    technologies: [
      { name: 'Canvas 2D' },
      { name: 'Web Audio API' },
      { name: 'requestAnimationFrame' },
      { name: 'localStorage' }
    ],
    screenshots: [],
    comingSoon: true,
    thumbnail: '/img/case1_python.png',
    logoType: 'li'
  },
  {
    id: 'future-projects',
    title: 'Дальше куда?',
    description: 'Здесь появятся новые кейсы после рефакторинга: React → Vanilla JS и другие миграции. Следите за обновлениями',
    features: [
      { text: 'Zero-dependency миграции' },
      { text: 'Performance-сравнения' },
      { text: 'Шаблоны и гайды в code-ing' },
      { text: 'Различное - нужное и не очень' }
    ],
    technologies: [],
    screenshots: [],
    comingSoon: true,
    thumbnail: '/img/lerr.png',
    logoType: 'uc'
    
  }
];