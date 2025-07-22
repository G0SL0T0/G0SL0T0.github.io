/* ---------- MAP ПАПКА → ЧЕЛОВЕЧЕСКОЕ НАЗВАНИЕ ---------- */
const GAME_NAMES = {
  dbd:        'Dead by Daylight',
  eve:        'EVE Frontier',
  expeditions:'Expeditions: A MudRunner Game',
  gtfo:       'GTFO',
  skyrim:     'The Elder Scrolls V: Skyrim',
  tradesman:  'TRADESMAN: Deal to Dealer',
  warframe:   'Warframe',
  witcher:    'The Witcher 3: Wild Hunt',
  everyone:   'Разные игры'
};

/* ---------- CONFIG ---------- */
const ROOT_PATH = 'img/screenshot/';
const PER_PAGE  = 15;

/* ---------- STATE ---------- */
let allImages = [];
let filtered  = [];
let start     = 0;

/* ---------- UTIL ---------- */
async function fetchImageList() {
  /* 1. описываем файлы вручную (если сервера нет)
     2. можно заменить на fetch('json/list.json') */
  const folders = ['', 'dbd', 'eve', 'expeditions', 'gtfo', 'skyrim', 'tradesman', 'warframe', 'witcher', 'everyone'];
  const images  = [];

  folders.forEach(folder => {
    const files = folder === '' ? ['screenshot1.jpg', 'screenshot2.jpg', 'screenshot3.jpg'] :
                  folder === 'everyone' ? ['misc-001.jpg', 'misc-002.jpg'] :
                  [`${folder}-001.jpg`, `${folder}-002.jpg`];
    files.forEach(file => {
      images.push({
        url: `${ROOT_PATH}${folder ? folder + '/' : ''}${file}`,
        folder,
        game: GAME_NAMES[folder] || 'общие',
        date: Date.now() - Math.random()*1e10  // имитация
      });
    });
  });
  return images;
}

/* ---------- DOM ---------- */
const modal       = document.getElementById('galleryModal');
const openBtn     = document.getElementById('openGalleryBtn');
const closeBtn    = document.querySelector('.close');
const gameSel     = document.getElementById('gameSel');
const sortSel     = document.getElementById('sortSel');
const grid        = document.getElementById('modalGrid');
const moreBtn     = document.getElementById('modalMoreBtn');

/* ---------- OPEN / CLOSE ---------- */
openBtn.onclick = () => { modal.style.display = 'flex'; applyFilters(); };
closeBtn.onclick = () => { modal.style.display = 'none'; };

/* ---------- RENDER ---------- */
function render(list) {
  list.forEach(img => {
    const div = document.createElement('div');
    div.className = 'modal-item';
    div.innerHTML = `
      <img src="${img.url}" loading="lazy">
      <div class="modal-info">
        <span>${img.game}</span>
      </div>`;
    grid.appendChild(div);
  });
}

function applyFilters() {
  grid.innerHTML = '';
  start = 0;
  let temp = [...allImages];

  // фильтр по игре
  const game = gameSel.value;
  if (game !== 'all') temp = temp.filter(i => i.game === game);

  // сортировка по времени
  const sort = sortSel.value;
  temp.sort((a,b) => sort === 'date-desc' ? b.date - a.date : a.date - b.date);

  filtered = temp;
  loadMore();
}

function loadMore() {
  const slice = filtered.slice(start, start + PER_PAGE);
  render(slice);
  start += PER_PAGE;
  moreBtn.style.display = start >= filtered.length ? 'none' : 'block';
}

/* ---------- INIT ---------- */
(async () => {
  allImages = await fetchImageList();
  // заполняем список игр
  const games = [...new Set(allImages.map(i => i.game))].sort();
  games.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    gameSel.appendChild(opt);
  });

  [gameSel, sortSel].forEach(el => el.addEventListener('change', applyFilters));
  moreBtn.addEventListener('click', loadMore);
})();