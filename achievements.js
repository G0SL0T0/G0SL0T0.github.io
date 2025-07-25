const ACH_DB = [
  /*  ┌ Название, игра, дата (в формате ISO), получено?, тип: achievement | challenge  */
  { name: '',     game: '',              date: 'null', unlocked: false,  type: 'achievement' },
  { name: 'Топ-100 в GTFO R8',                     game: 'GTFO',                               date: '2025-01-11', unlocked: true,  type: 'achievement' },
  { name: 'GTFO на 100% R1-8',                     game: 'GTFO',                               date: '2025-04-11', unlocked: true,  type: 'achievement' },
  { name: '10 KDA в EVE Frontier',                 game: 'EVE Frontier',                       date: '2025-07-02', unlocked: true,  type: 'achievement' },
  { name: 'Активный участник альфа-теста',         game: 'EVE Frontier',                       date: '2025-06-15', unlocked: true,  type: 'achievement' },
  { name: 'Построить мегабазу в EVE Frontier',     game: 'EVE Frontier',                       date: null,         unlocked: false, type: 'challenge' },
  { name: '10 killmarks на одном корабле',         game: 'EVE Frontier',                       date: 'null',       unlocked: false, type: 'challenge' },
  { name: 'Пройти кампанию за каждую фракцию',     game: 'Dawn of War - Soulstorm',            date: '2023-11-25', unlocked: true,  type: 'achievement' },
  { name: 'Используя определенных юнитов пройти кампанию',game: 'Dawn of War - Soulstorm',     date: '2024-01-12', unlocked: true,  type: 'challenge' },
  { name: 'Добится 70000 хп в шкале здоровья',     game: 'The Witcher 3: Wild Hunt',           date: '2024-08-19', unlocked: true,  type: 'achievement' },
  { name: 'Арбалет как основное оружие',           game: 'The Witcher 3: Wild Hunt',           date: '2023-08-15', unlocked: true,  type: 'achievement' },
  { name: 'Пройти The Witcher 3 без фаст-тревелов',game: 'The Witcher 3: Wild Hunt',           date:'2023-08-12',  unlocked:true,   type:'challenge' },
  { name: 'Пройти игру на базовом снаряжении',     game: 'The Witcher 3: Wild Hunt',           date: '2023-08-13', unlocked: true,  type: 'challenge' },
  { name: 'Лопата + магия = пройти игру',          game: 'The Witcher 3: Wild Hunt',           date: '2023-09-29', unlocked: true,  type: 'challenge' },
  { name: 'Пройти через: магию/алхимию/физ.дмг.',  game: 'The Witcher 3: Wild Hunt',           date: '2023-08-14', unlocked: true,  type: 'challenge' },
  { name: '250 уровень торговца',                  game: 'TRADESMAN: Deal to Dealer',          date: '2025-07-23', unlocked: true,  type: 'achievement' },
  { name: 'Победить босса "Скелехорд"',            game: 'TRADESMAN: Deal to Dealer',          date: '2025-04-20', unlocked: true,  type: 'achievement' },
  { name: 'Получить на счет 1 млн валюты',         game: 'TRADESMAN: Deal to Dealer',          date: 'null',       unlocked: false, type: 'achievement' },
  { name: 'Tradesman 100 %',                       game: 'TRADESMAN: Deal to Dealer',          date: '2025-04-08', unlocked: true,  type: 'achievement' },
  { name: 'Первые 100 км пробег',                  game: 'Expeditions: A MudRunner Game',      date: '2025-07-17', unlocked: true,  type: 'achievement' },
  { name: 'Приобрести 10 автомобилей',             game: 'Expeditions: A MudRunner Game',      date: '2025-07-15', unlocked: true,  type: 'achievement' },
  { name: 'Заработать первый 1 млн валюты',        game: 'Expeditions: A MudRunner Game',      date: '2025-07-15', unlocked: true,  type: 'achievement' },
  { name: 'Завершить экспедицию с 1+ бонусной наградой',game: 'Expeditions: A MudRunner Game', date: '2025-07-05', unlocked: true,  type: 'achievement' },
  { name: 'Первые 200 км пробега',                 game: 'Expeditions: A MudRunner Game',      date: 'null', unlocked: false,  type: 'achievement' },
];

/* 🎨 Генератор авто-иконки: 2 буквы + цвет по имени игры */
function gameIcon(gameName) {
  const colors = [
    '#ff6b6b', '#f9844a', '#ee6c4d', '#c9184a', '#560bad', '#7209b7',
    '#3a0ca3', '#4361ee', '#4895ef', '#4cc9f0', '#06ffa5', '#52b788'
  ];
  const idx = [...gameName].reduce((a,c)=>a+c.charCodeAt(0),0) % colors.length;
  const text = gameName.slice(0, 2).toUpperCase();
  return `<span class="game-icon" style="background:${colors[idx]}">${text}</span>`;
}

/* Список всех игр (без дубликатов) */
const steamGames = window.games || [];
const steamGameTitles = [...new Set(steamGames.map(g => g.name))];
const allGames = [...new Set([
  ...steamGameTitles,
  ...ACH_DB.map(a => a.game)
])].sort();

/* 🧹 Очистка контейнера */
const $ = sel => document.querySelector(sel);

function renderLatest() {
  const container = $('#latestAchievements');
  if (!container || !ACH_DB?.length) return;

  const latest = ACH_DB
    .filter(a => a.unlocked && a.name && a.game)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  container.innerHTML = latest.map(a => `
    <li>
      <span class="ach-name">${a.name}</span>
      <small class="ach-meta">${a.game} — ${new Date(a.date).toLocaleDateString('ru-RU')}</small>
    </li>
  `).join('');
}
/* Отрисовка списка с фильтром */
function renderAll(filterGame = 'все') {
  const container = $('#allAchievementsList');
  if (!container) return;

  const list = ACH_DB
    .filter(a => filterGame === 'все' || a.game === filterGame)
    .sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

  container.innerHTML = list.map(a => `
    <div class="ach-item ${a.unlocked ? 'unlocked' : 'locked'}">
      ${gameIcon(a.game)}
      <div class="ach-body">
        <strong>${a.name}</strong>
        <small>${a.game} · ${a.type === 'challenge' ? 'Челлендж' : 'Достижение'}</small>
        ${a.unlocked ? `<span class="ach-date">${new Date(a.date).toLocaleDateString('ru-RU')}</span>` : ''}
      </div>
    </div>
  `).join('');
}

/* 🎛️ Фильтр по игре */
function buildFilter() {
  const sel = $('#achGameFilter');
  if (!sel) return;
  sel.innerHTML = '<option value="все">Все игры</option>';
  allGames.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', e => renderAll(e.target.value));
}

/* Открытие/закрытие модалки */
$('#openAllAchievements')?.addEventListener('click', () => {
  renderAll();
  $('#achievementsModal').style.display = 'flex';
});

$('.achievements-modal .close')?.addEventListener('click', () => {
  $('#achievementsModal').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  renderLatest();   // 5 последних
  buildFilter();    // выпадающий фильтр
});