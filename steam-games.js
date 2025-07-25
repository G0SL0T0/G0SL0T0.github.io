/* === 100 % STATIC DATA  === */
const games = [
  { name: 'The Witcher 3: Wild Hunt',     hours: 6945, lastLaunch: '22 июн.',  achievements: '78/78', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg' },
  { name: 'Warframe',                    hours: 5206, lastLaunch: '30 июн.',  achievements: '193/193', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/230410/header.jpg' },
  { name: 'EVE Online',                  hours: 4807, lastLaunch: '4 апр.',   achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/8500/header.jpg' },
  { name: 'Black Desert',                hours: 1950, lastLaunch: '28 авг. 2023', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582660/header.jpg' },
  { name: 'Counter-Strike 2',            hours: 1923, lastLaunch: '18 нояб. 2023', achievements: '1/1', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg' },
  { name: 'Apex Legends',                hours: 1884, lastLaunch: '19 мая 2024', achievements: '2/12', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg' },
  { name: 'Dead by Daylight',            hours: 1701, lastLaunch: '26 мая',  achievements: '227/279', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg' },
  { name: 'Destiny 2',                   hours: 1598, lastLaunch: '6 мая 2023', achievements: '23/23', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg' },
  { name: 'Crossout',                    hours: 1361, lastLaunch: '29 мая',  achievements: '193/193', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/386180/header.jpg' },
  { name: 'Hunt: Showdown 1896',         hours: 1357, lastLaunch: '1 февр.',  achievements: '36/36', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/594650/header.jpg' },
  { name: 'GTFO',                        hours: 976,  lastLaunch: 'Активная игра',    achievements: '56/57', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/493520/header.jpg' },
  { name: 'Shattered Pixel Dungeon',     hours: 876,  lastLaunch: '3 апр.',   achievements: '83/97', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1769170/header.jpg' },
  { name: '枝江畔之梦',                   hours: 871,  lastLaunch: '15 сент. 2024', achievements: '20/20', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1827680/header.jpg' },
  { name: 'PAYDAY 2',                    hours: 836,  lastLaunch: '15 мар. 2024', achievements: '1302/1328', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/218620/header.jpg' },
  { name: 'Dawn of War - Soulstorm',     hours: 794,  lastLaunch: '29 нояб. 2024', achievements: '', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/9450/header.jpg' },
  { name: 'Generation Zero®',            hours: 632,  lastLaunch: '28 июн. 2024', achievements: '72/72', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/704270/header.jpg' },
  { name: 'Palia',                       hours: 628,  lastLaunch: '5 апр.',  achievements: '52/52', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2707930/header.jpg' },
  { name: 'Ropuka\'s Idle Island',       hours: 597,  lastLaunch: '14 июл.',  achievements: '30/31', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3416070/header.jpg' },
  { name: 'Frostpunk',                   hours: 576,  lastLaunch: '6 нояб. 2023', achievements: '0/115', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323190/header.jpg' },
  { name: 'ARK: Survival Evolved',       hours: 545,  lastLaunch: '12 февр. 2023', achievements: '32/32', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg' },
  { name: 'SCP: Secret Laboratory',      hours: 493,  lastLaunch: '6 мая 2023', achievements: '35/52', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/700330/header.jpg' },
  { name: 'Albion Online',               hours: 485,  lastLaunch: '27 апр. 2023', achievements: '0/154', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/761890/header.jpg' },
  { name: 'Northgard',                   hours: 474,  lastLaunch: '11 янв.',  achievements: '0/289', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/466560/header.jpg' },
  { name: 'TRADESMAN: Deal to Dealer',   hours: 417,  lastLaunch: 'Активная игра',  achievements: 'Скоро будут ;)', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2555430/header.jpg' },
  { name: 'Rogue Company',               hours: 409,  lastLaunch: '6 мая 2023', achievements: '20/20', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/872200/header.jpg' },
  { name: 'RimWorld',                    hours: 314,  lastLaunch: '19 дек. 2023', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/294100/header.jpg' },
  { name: 'Asphalt Legends Unite',       hours: 262,  lastLaunch: '25 июн.',  achievements: '39/42', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1815780/header.jpg' },
  { name: 'Warhammer 40,000: Gladius',   hours: 254,  lastLaunch: '23 апр. 2024', achievements: '97/166', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/489630/header.jpg' },
  { name: 'DEATH STRANDING DIRECTOR\'S CUT', hours: 251, lastLaunch: '16 июн. 2024', achievements: '31/63', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/header.jpg' },
  { name: 'The First Descendant',        hours: 198,  lastLaunch: '17 мая',  achievements: '24/24', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2074920/header.jpg' },
  { name: 'Volcanoids',                  hours: 198,  lastLaunch: '10 мая 2024', achievements: '21/40', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/951440/header.jpg' },
  { name: 'Darkest Dungeon®',            hours: 169,  lastLaunch: '23 сент. 2023', achievements: '120/120', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/262060/header.jpg' },
  { name: 'Deep Rock Galactic',          hours: 155,  lastLaunch: '18 мая',  achievements: '53/69', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/548430/header.jpg' },
  { name: 'Paladins',                    hours: 152,  lastLaunch: '16 дек. 2022', achievements: '58/58', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/444090/header.jpg' },
  { name: 'V Rising',                    hours: 147,  lastLaunch: '10 мая 2024', achievements: '0/49', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1604030/header.jpg' },
  { name: 'Beholder',                    hours: 143,  lastLaunch: '2 мар. 2023', achievements: '60/60', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/475550/header.jpg' },
  { name: 'SCP: Containment Breach Multiplayer', hours: 124, lastLaunch: '23 нояб. 2022', achievements: '41/41', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1782380/header.jpg' },
  { name: 'Crusader Kings II',           hours: 90,   lastLaunch: '9 дек. 2023', achievements: '161/161', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/203770/header.jpg' },
  { name: 'Warhammer 40,000: Dawn of War III', hours: 88, lastLaunch: '15 июн.', achievements: '84/84', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/285190/header.jpg' },
  { name: 'MudRunner',                   hours: 82,   lastLaunch: '14 июн.',  achievements: '60/62', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/675010/header.jpg' },
  { name: 'DR LIVESEY ROM AND DEATH EDITION', hours: 78, lastLaunch: '15 сент. 2024', achievements: '96/130', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2181930/header.jpg' },
  { name: 'Aimlabs',                     hours: 74,   lastLaunch: '15 янв. 2024', achievements: '100/100', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/714010/header.jpg' },
  { name: 'Geometry Dash',               hours: 62,   lastLaunch: '22 июн.',  achievements: '31/120', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/322170/header.jpg' },
  { name: 'Among Us',                    hours: 57,   lastLaunch: '9 авг. 2023', achievements: '33/33', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg' },
  { name: 'Expeditions: A MudRunner Game', hours: 45, lastLaunch: 'Активная игра',  achievements: '11/20', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2477340/header.jpg' },
  { name: 'KEO',                         hours: 41,   lastLaunch: '16 июн. 2022', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1424910/header.jpg' },
  { name: 'Foxhole',                     hours: 37,   lastLaunch: '21 июн. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/505460/header.jpg' },
  { name: 'Once Human',                  hours: 37,   lastLaunch: '27 июл. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2139460/header.jpg' },
  { name: 'Will To Live Online',         hours: 34,   lastLaunch: '9 мая 2023', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/707010/header.jpg' },
  { name: 'Hue',                         hours: 33,   lastLaunch: '30 авг. 2023', achievements: '10/13', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/383270/header.jpg' },
  { name: 'Lethal Company',              hours: 32,   lastLaunch: '27 янв. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header.jpg' },
  { name: 'Tiny Glade',                  hours: 29,   lastLaunch: '6 окт. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2198150/header.jpg' },
  { name: 'Scrap Mechanic',              hours: 26,   lastLaunch: '2 мар. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/387990/header.jpg' },
  { name: 'Fallout Shelter',             hours: 23,   lastLaunch: '20 июл. 2023', achievements: '35/35', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/588430/header.jpg' },
  { name: 'URBO',                        hours: 17,   lastLaunch: '17 мая',  achievements: '24/29', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2141770/header.jpg' },
  { name: 'RIPOUT',                      hours: 13,   lastLaunch: '12 янв.',  achievements: '36/69', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1558830/header.jpg' },
  { name: 'ASTRONEER',                   hours: 10,   lastLaunch: '10 мая 2024', achievements: '19/56', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/361420/header.jpg' },
  { name: 'Warhammer 40,000: Dawn of War - Anniversary Edition', hours: 10, lastLaunch: '25 сент. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/4570/header.jpg' },
  { name: 'REDkit для игры «Ведьмак 3»', hours: 10,   lastLaunch: '16 июл. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2684660/header.jpg' },
  { name: 'The Forest',                  hours: 9,    lastLaunch: '25 нояб. 2023', achievements: '10/45', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg' },
  { name: 'WRC 7',                       hours: 8,    lastLaunch: '25 июл. 2024', achievements: '7/41', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/621830/header.jpg' },
  { name: 'Masterplan Tycoon',           hours: 7,    lastLaunch: '8 июл. 2024', achievements: '8/16', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1644500/header.jpg' },
  { name: 'Soundfall',                   hours: 6,    lastLaunch: '27 окт. 2024', achievements: '19/45', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1608700/header.jpg' },
  { name: 'The Forever Winter',          hours: 5,    lastLaunch: '31 окт. 2024', achievements: '-', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2828860/header.jpg' },
  { name: 'EVE Frontier',                hours: 48,    lastLaunch: 'Активная игра', achievements: '-', image: 'img/eve-frontier.jpg' }
];

/* ===== TOP-5 ===== */
(() => {
  const TOP_NAMES = [
    'The Witcher 3: Wild Hunt',
    'GTFO',
    'Warhammer 40,000: Dawn of War - Soulstorm',
    'Dawn of War - Soulstorm',
    'TRADESMAN: Deal to Dealer',
    'EVE Frontier'
  ];

  const container = document.querySelector('.top-vertical');
  if (!container) return;

  container.innerHTML = '';

  TOP_NAMES.forEach(name => {
    const g = games.find(game => game.name === name);
    if (!g) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'top-card-wrapper';

    // карточка
    const card = document.createElement('div');
    card.className = 'top-card';
    /*card.style.backgroundImage = `url(${g.image})`;*/
    card.innerHTML = `
      <div class="top-card" style="background-image:url(${g.image})">
        <div class="top-card-overlay">
          <h3>${g.name}</h3>
          <p class="details">${g.hours}+ ч · Топ-5</p>
        </div>
      </div>
    `;

    // drawer
    const drawer = document.createElement('div');
    drawer.className = 'top-card-drawer';
    drawer.innerHTML = `
      <h2>${g.name}</h2>
      <p><strong>Часы в Steam:</strong> ${g.hours} ч</p>
      <p><strong>Последний запуск:</strong> ${g.lastLaunch}</p>
      <p><strong>Достижения:</strong> ${g.achievements}</p>
      ${buildAchievementsDrawer(g.name)} <!-- ВОТ ЭТО -->
      <button class="btn-screens" data-game="${g.name}">
        <i class="fas fa-images"></i> Посмотреть скриншоты
      </button>
    `;

    wrapper.appendChild(card);
    wrapper.appendChild(drawer);
    container.appendChild(wrapper);

    /* переключение */
    card.addEventListener('click', () => {
      const open = wrapper.classList.contains('open');
      document.querySelectorAll('.top-card-wrapper').forEach(w => w.classList.remove('open'));
      if (!open) wrapper.classList.add('open');
    });

    /* кнопка «скриншоты» */
    drawer.querySelector('.btn-screens').addEventListener('click', e => {
      e.stopPropagation();

      const gameTitle = e.target.dataset.game;

      /* 1. открыть общее модальное окно */
      const modal = document.getElementById('galleryModal');
      document.body.appendChild(modal);
      modal.style.display = 'flex';

      /* 2. загрузить данные, если ещё не загружены */
      if (!window.allImages?.length) {
        window.loadData();          // функция из gallery.js
      }

      /* 3. выбрать нужную игру в фильтре */
      const gameSel = document.getElementById('gameSel');
      gameSel.value = gameTitle;

      /* 4. перерисовать галерею */
      window.resetAndRender();      // функция из gallery.js
    });
  });
})();

document.querySelector('.current-games-section').addEventListener('click', e => {
  const header = e.target.closest('.current-game-header');
  if (!header) return;

  const item = header.closest('.accordion-item');
  const open = item.classList.contains('open');

  /* закрыть все */
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
});
document.addEventListener('click', e => {
  const item = e.target.closest('.current-game');
  if (!item) return;
  item.classList.toggle('open');
});

/* ===============  ДОСТИЖЕНИЯ =============== */
function buildAchievementsDrawer(gameName) {
  const achs   = ACH_DB.filter(a => a.game === gameName && a.name);
  const done   = achs.filter(a => a.unlocked && a.type === 'achievement');
  const chall  = achs.filter(a => a.type === 'challenge');
  const locked = achs.filter(a => !a.unlocked && a.type === 'achievement');

  return /* html */`
    <div class="ach-drawer">
      ${done.length ? `
        <h4><i class="fas fa-trophy"></i> Достижения</h4>
        ${done.map(a => `
          <div class="ach-mini done">
            <i class="fas fa-check-circle" style="color:#28a745;"></i>
            <span>${a.name}</span>
          </div>
        `).join('')}
      ` : ''}

      ${chall.length ? `
        <h4><i class="fas fa-bullseye"></i> Челленджи</h4>
        ${chall.map(a => `
          <div class="ach-mini ${a.unlocked ? 'done' : 'pending'}">
            <i class="fas ${a.unlocked ? 'fa-check-circle' : 'fa-hourglass-half'}" 
               style="color:${a.unlocked ? '#28a745' : '#dc3545'};"></i>
            <span>${a.name}</span>
          </div>
        `).join('')}
      ` : ''}

      ${locked.length ? `
        <h4><i class="fas fa-lock"></i> Не получено</h4>
        ${locked.map(a => `
          <div class="ach-mini locked">
            <i class="fas fa-lock" style="color:#6c757d;"></i>
            <span>${a.name}</span>
          </div>
        `).join('')}
      ` : ''}
    </div>
  `;
}

/* === RENDER === */
const UL = document.getElementById('steamGamesList');
const TOGGLE_BTN = document.getElementById('toggleSteam');
const LIST = document.getElementById('steamList');

function renderList() {
  UL.innerHTML = '';
  games.forEach(g => {
    const li = document.createElement('li');
    li.className = 'steam-item';
    li.innerHTML = `
      <img src="${g.image}" alt="${g.name}">
      <h4>${g.name}</h4>
      <span class="hours">${g.hours} ч</span>
    `;
    li.addEventListener('click', () => openModal(g));
    UL.appendChild(li);
  });
}

/* === MODAL === */
const MODAL = document.getElementById('steamModal');
const MODAL_BODY = document.getElementById('steamModalBody');
const CLOSE_BTN = document.querySelector('.steam-modal-close');

function openModal(game) {
  MODAL_BODY.innerHTML = `
    <h2>${game.name}</h2>
    <img src="${game.image}" alt="${game.name}" style="width:100%;border-radius:8px;margin-bottom:1rem">
    <p><strong>Общее время:</strong> ${game.hours} ч</p>
    <p><strong>Последний запуск:</strong> ${game.lastLaunch}</p>
    <p><strong>Достижения:</strong> ${game.achievements}</p>
    ${buildAchievementsDrawer(game.name)} <!-- ⬅ ВОТ ЭТО -->
    <button class="btn-screens" data-game="${game.name}">
      <i class="fas fa-images"></i> Посмотреть скриншоты
    </button>
  `;               
  MODAL.classList.remove('hidden');
}

CLOSE_BTN.addEventListener('click', () => MODAL.classList.add('hidden'));
window.addEventListener('click', e => e.target === MODAL && MODAL.classList.add('hidden'));

/* === INIT === */
renderList();
TOGGLE_BTN.addEventListener('click', () => LIST.classList.toggle('hidden'));

