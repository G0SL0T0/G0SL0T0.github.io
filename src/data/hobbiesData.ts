// src/data/hobbiesData.ts
import { Hobby } from '@/types/hobby';

export const hobbiesData: Hobby[] = [
  {
    id: 'games',
    title: 'Игры',
    highlight: 'The Witcher 3: Wild Hunt',
    stats: '6000+ часов',
    image: '/img/game.png',
    link: '/hobby-games',
    description: 'Глубокие RPG, стратегии и инди-игры',
    icon: 'fas fa-gamepad',
    color: '#FF6B6B'
  },
  {
    id: 'books',
    title: 'Книги',
    highlight: '"Учебник Логики" Челпанов Георгий',
    stats: '50+ книг',
    image: '/img/books.jpg',
    link: '/hobby-books',
    description: 'Фантастика, психология, техническая литература',
    icon: 'fas fa-book',
    color: '#4D96FF'
  },
  {
    id: 'electronics',
    title: 'Электроника',
    highlight: 'Схемотехника и прошивка микроконтроллеров',
    stats: 'Статистика неизвестна',
    image: '/img/electronics.jpg.png',
    link: '/hobby-electronics',
    description: 'Создание устройств, ремонт, разработка плат',
    icon: 'fas fa-microchip',
    color: '#6BCB77'
  },
  {
    id: 'microbiology',
    title: 'Микробиология',
    highlight: 'Исследование микроорганизмов',
    stats: 'Статистика неизвестна',
    image: '/img/micro.jpg.png',
    link: '/hobby-microbiology',
    description: 'Домашняя лаборатория, выращивание культур',
    icon: 'fas fa-microscope',
    color: '#9C51E0'
  },
  {
    id: 'cybersecurity',
    title: 'Кибербезопасность',
    highlight: 'Анализ уязвимостей и pentesting',
    stats: 'Статистика неизвестна',
    image: '/img/cyber.jpg.png',
    link: '/hobby-cybersecurity',
    description: 'Bug-bounty, CTF-игры, написание PoC',
    icon: 'fas fa-shield-alt',
    color: '#FFD93D'
  },
  {
    id: 'gamedev',
    title: 'Геймдев',
    highlight: 'Собственные механики и движки',
    stats: 'Прототипы на UE5, Phaser и чистом JS',
    image: '/img/gamedev.jpg.png',
    link: '/hobby-gamedev',
    description: 'Разработка игр, создание механик, прототипирование',
    icon: 'fas fa-code',
    color: '#FF6B6B'
  }
];