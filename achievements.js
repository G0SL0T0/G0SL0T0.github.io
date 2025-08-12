const ACH_DB = [
  /*  ┌ Название, игра, дата (в формате ISO), получено?, тип: achievement | challenge  */
  { name: '',     game: '',              date: 'null', unlocked: false,  type: 'achievement' },
  { name: 'Топ-100 в GTFO R8',                     game: 'GTFO',                               date: '2025-01-11', unlocked: true,  type: 'achievement' },
  { name: 'GTFO на 100% R1-8',                     game: 'GTFO',                               date: '2025-04-11', unlocked: true,  type: 'achievement' },
  { name: '10 KDA в EVE Frontier',                 game: 'EVE Frontier',                       date: '2025-07-02', unlocked: true,  type: 'achievement' },
  { name: 'Активный участник альфа-теста',         game: 'EVE Frontier',                       date: '2025-06-15', unlocked: true,  type: 'achievement' },
  { name: 'Построить мегабазу в EVE Frontier',     game: 'EVE Frontier',                       date: null,         unlocked: false, type: 'challenge' },
  { name: '10 killmarks на одном корабле',         game: 'EVE Frontier',                       date: null,         unlocked: false, type: 'challenge' },
  { name: 'Построить last принтер на месте дислокации',game: 'EVE Frontier',                   date: null,         unlocked: false, type: 'challenge' },
  { name: 'Открыть 5 секретных секторов',          game: 'EVE Frontier',                       date: null,         unlocked: false, type: 'challenge' },
  { name: 'Убить стационарными турелями',          game: 'EVE Frontier',                       date: '2025-07-01', unlocked: true,  type: 'achievement' },
  { name: 'Пройти кампанию за каждую фракцию',     game: 'Dawn of War - Soulstorm',            date: '2023-11-25', unlocked: true,  type: 'achievement' },
  { name: 'Используя определенных юнитов пройти кампанию',game: 'Dawn of War - Soulstorm',     date: '2024-01-12', unlocked: true,  type: 'challenge' },
  { name: 'Добится 70000 хп в шкале здоровья',     game: 'The Witcher 3: Wild Hunt',           date: '2024-08-19', unlocked: true,  type: 'achievement' },
  { name: 'Арбалет как основное оружие',           game: 'The Witcher 3: Wild Hunt',           date: '2023-08-15', unlocked: true,  type: 'achievement' },
  { name: 'Выполнить заказ бутафорским мечем',     game: 'The Witcher 3: Wild Hunt',           date: '2020-07-05', unlocked: true, type: 'achievement' },
  { name: 'Пройти The Witcher 3 без фаст-тревелов',game: 'The Witcher 3: Wild Hunt',           date:'2023-08-12',  unlocked:true,   type:'challenge' },
  { name: 'Пройти игру на базовом снаряжении',     game: 'The Witcher 3: Wild Hunt',           date: '2023-08-13', unlocked: true,  type: 'challenge' },
  { name: 'Лопата + магия = пройти игру',          game: 'The Witcher 3: Wild Hunt',           date: '2023-09-29', unlocked: true,  type: 'challenge' },
  { name: 'Пройти через: магию/алхимию/физ.дмг.',  game: 'The Witcher 3: Wild Hunt',           date: '2023-08-14', unlocked: true,  type: 'challenge' },
  { name: 'Пройти через: только мечи+только стартовые',game: 'The Witcher 3: Wild Hunt',       date: '2023-01-14', unlocked: true,  type: 'challenge' },
  { name: 'Ориенттироватся на местности',          game: 'The Witcher 3: Wild Hunt',           date: '2023-11-14', unlocked: true,  type: 'challenge' },
  { name: 'Пройти игру Игни + физ дмг.',           game: 'The Witcher 3: Wild Hunt',           date: '2021-09-24', unlocked: true,  type: 'challenge' },
  { name: '250 уровень торговца',                  game: 'TRADESMAN: Deal to Dealer',          date: '2025-07-23', unlocked: true,  type: 'achievement' },
  { name: 'Победить босса "Скелехорд"',            game: 'TRADESMAN: Deal to Dealer',          date: '2025-04-20', unlocked: true,  type: 'achievement' },
  { name: 'Рецепты дядюшки Весемира"',             game: 'TRADESMAN: Deal to Dealer',          date: '2024-11-20', unlocked: true,  type: 'achievement' },
  { name: '100000 и ещë 1000000 на подходе..."',   game: 'TRADESMAN: Deal to Dealer',          date: '2024-03-20', unlocked: true,  type: 'achievement' },
  { name: 'Получить на счет 1 млн валюты',         game: 'TRADESMAN: Deal to Dealer',          date: 'null',       unlocked: false, type: 'achievement' },
  { name: 'Tradesman 100 %',                       game: 'TRADESMAN: Deal to Dealer',          date: '2025-04-08', unlocked: true,  type: 'achievement' },
  { name: 'Первые 100 км пробег',                  game: 'Expeditions: A MudRunner Game',      date: '2025-07-17', unlocked: true,  type: 'achievement' },
  { name: 'Приобрести 10 автомобилей',             game: 'Expeditions: A MudRunner Game',      date: '2025-07-15', unlocked: true,  type: 'achievement' },
  { name: 'Заработать первый 1 млн валюты',        game: 'Expeditions: A MudRunner Game',      date: '2025-07-15', unlocked: true,  type: 'achievement' },
  { name: 'Завершить экспедицию с 1+ бонусной наградой',game: 'Expeditions: A MudRunner Game', date: '2025-07-05', unlocked: true,  type: 'achievement' },
  { name: 'Первые 200 км пробега',                 game: 'Expeditions: A MudRunner Game',      date: 'null',       unlocked: false, type: 'achievement' },
  { name: 'Закрыть полностью карту только на скаутах',game: 'Expeditions: A MudRunner Game',   date: null,         unlocked: false, type: 'challenge' },
  { name: 'Повредить колеса на скауте макс. скоростью',game: 'Expeditions: A MudRunner Game',  date: null,         unlocked: false, type: 'challenge' },
  { name: 'Эвакуация тяжелого вездехода скаутом',  game: 'Expeditions: A MudRunner Game',      date: null,         unlocked: false, type: 'challenge' },

{ name: 'Страйк - убить 9 мобов, 1 бомбой',      game: 'The Witcher 3: Wild Hunt', date: '2024-08-19', unlocked: true, type: 'achievement' },
{ name: 'Все вопросики на Скеллиге',             game: 'The Witcher 3: Wild Hunt', date: '2023-08-15', unlocked: true, type: 'achievement' },
{ name: 'Барон повесился 100 раз. Зачем?',       game: 'The Witcher 3: Wild Hunt', date: '2025-01-10', unlocked: true, type: 'achievement' },

{ name: 'Полный комплект прайм-фреймов',         game: 'Warframe',                 date: '2024-03-30', unlocked: true, type: 'achievement' },
{ name: 'Пройти весь стальной путь',             game: 'Warframe',                 date: '2025-02-12', unlocked: true, type: 'achievement' },
{ name: '10 часов на 1 ммиссии',                 game: 'Warframe',                 date: '2024-01-20', unlocked: true, type: 'achievement' },

{ name: 'Участие в убийстве первого КБТ',        game: 'EVE Online',               date: '2025-02-05', unlocked: true, type: 'achievement' },
{ name: 'Востановится в игру спустя 1+ год',     game: 'EVE Online',               date: '2024-03-18', unlocked: true, type: 'achievement' },
{ name: 'Дудосить "китайских" фармеров',         game: 'EVE Online',               date: '2025-04-01', unlocked: true, type: 'achievement' },

{ name: 'Достигнуть 62 уровня',                  game: 'Black Desert',             date: '2022-08-20', unlocked: true, type: 'achievement' },
{ name: 'Получить легендарный корабль',          game: 'Black Desert',             date: '2023-07-05', unlocked: true, type: 'achievement' },

{ name: 'Иметь бизнес в шутере',                 game: 'Counter-Strike 2',         date: '2025-00-00', unlocked: true, type: 'achievement' },
{ name: '1000-7 матчей в Premier',               game: 'Counter-Strike 2',         date: '2023-09-15', unlocked: true, type: 'achievement' },

{ name: 'Мастер-убийца (10 000 убийств)',        game: 'Apex Legends',             date: '2019-05-18', unlocked: true, type: 'achievement' },
{ name: 'Победа без помощи напарников',          game: 'Apex Legends',             date: '2019-04-30', unlocked: true, type: 'achievement' },

{ name: 'Получить престиж 100',                  game: 'Dead by Daylight',         date: '2025-05-25', unlocked: true, type: 'achievement' },
{ name: '1000 побед за выживших',                game: 'Dead by Daylight',         date: '2025-04-10', unlocked: true, type: 'achievement' },

{ name: 'Полный рейд «Король падших»',           game: 'Destiny 2',                date: '2023-04-22', unlocked: true, type: 'achievement' },
{ name: 'Коллекция экзотиков 100/100',           game: 'Destiny 2',                date: '2023-03-15', unlocked: true, type: 'achievement' },

{ name: '1000 побед на арене',                   game: 'Crossout',                 date: '2024-06-12', unlocked: true, type: 'achievement' },
{ name: 'Полный репутационный стандарт',         game: 'Crossout',                 date: '2023-05-01', unlocked: true, type: 'achievement' },

{ name: 'Получить 10 престижей',                 game: 'Hunt: Showdown 1896',      date: '2024-01-28', unlocked: true, type: 'achievement' },
{ name: '500 PvP-фрагов в QuickPlay',            game: 'Hunt: Showdown 1896',      date: '2024-12-11', unlocked: true, type: 'achievement' },

{ name: 'Спидран R8A1 - 6:07',                   game: 'GTFO',                     date: '2025-04-11', unlocked: true, type: 'achievement' },
{ name: 'Великий взломщик 100% журналов',        game: 'GTFO',                     date: '2025-08-02', unlocked: true, type: 'achievement' },
{ name: '100 % достижений GTFO',                 game: 'GTFO',                     date: '2025-04-11', unlocked: true, type: 'achievement' },

{ name: 'Победить Yog-Dzewa',                    game: 'Shattered Pixel Dungeon',  date: '2025-03-22', unlocked: true, type: 'achievement' },
{ name: 'Пройти игру на всех классах',           game: 'Shattered Pixel Dungeon',  date: '2025-02-18', unlocked: true, type: 'achievement' },

{ name: 'Получить 100 % Steam-достижений',       game: '枝江畔之梦',               date: '2024-09-15', unlocked: true, type: 'achievement' },
{ name: 'Полный саундтрек в коллекции',          game: '枝江畔之梦',               date: '2024-09-10', unlocked: true, type: 'achievement' },

{ name: '100 % достижений PAYDAY 2',             game: 'PAYDAY 2',                 date: '2024-12-01', unlocked: true, type: 'achievement' },
{ name: '1000 ограблений Death Sentence',        game: 'PAYDAY 2',                 date: '2024-11-20', unlocked: true, type: 'achievement' },

{ name: 'Победить всех фракций на сложности',    game: 'Dawn of War - Soulstorm',  date: '2023-11-25', unlocked: true, type: 'achievement' },
{ name: 'Пройти кампанию за некронов без потерь',game: 'Dawn of War - Soulstorm',  date: '2024-01-12', unlocked: true, type: 'challenge' },

{ name: '100 % достижений Generation Zero',      game: 'Generation Zero®',         date: '2024-06-28', unlocked: true, type: 'achievement' },
{ name: 'Уничтожить 1000 машин-роботов',         game: 'Generation Zero®',         date: '2024-06-15', unlocked: true, type: 'achievement' }
];

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

/* Очистка контейнера */
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

/* Фильтр по игре */
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