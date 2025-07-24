const ROOT_JSON = 'screenshots.json';
const PER_PAGE  = 12;

let allImages = [];
let filtered  = [];
let start     = 0;

/* ---------- DOM ---------- */
const openBtn  = document.getElementById('openGalleryBtn');
const closeBtn = document.querySelector('.close');
const modal    = document.getElementById('galleryModal');
const gameSel  = document.getElementById('gameSel');
const sortSel  = document.getElementById('sortSel');
const grid     = document.getElementById('modalGrid');
const moreBtn  = document.getElementById('modalMoreBtn');

/* ---------- OPEN / CLOSE ---------- */
openBtn.onclick = () => {
  document.body.appendChild(modal);
  modal.style.display = 'flex';
  loadData();
};
closeBtn.onclick = () => (modal.style.display = 'none');

/* ---------- LOAD ---------- */
async function loadData() {
  if (allImages.length) return;               // уже загружено
  const res  = await fetch(ROOT_JSON);
  if (!res.ok) throw new Error(res.status);
  allImages  = await res.json();
  populateGameFilter();
  resetAndRender();
}

function populateGameFilter() {
  const games = [...new Set(allImages.map(i => i.game))].sort();
  games.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    gameSel.appendChild(opt);
  });
}

/* ---------- фильтры и рендер ---------- */
function resetAndRender() {
  start   = 0;
  grid.innerHTML = '';

  filtered = [...allImages];
  if (gameSel.value !== 'all')
    filtered = filtered.filter(i => i.game === gameSel.value);

  const dir = sortSel.value === 'date-asc' ? 1 : -1;
  filtered.sort((a, b) => dir * (a.date - b.date));

  loadMore();                // первую порцию
}

function loadMore() {
  const chunk = filtered.slice(start, start + PER_PAGE);
  renderPage(chunk);
  start += PER_PAGE;
  moreBtn.style.display = start >= filtered.length ? 'none' : 'block';
}

function renderPage(list) {
  list.forEach(img => {
    const div = document.createElement('div');
    div.className = 'modal-item';

    div.innerHTML = `
      <img src="${img.url}" loading="lazy">
      <div class="modal-info"><strong>${img.game}</strong></div>
    `;

    grid.appendChild(div);
  });
}

window.addEventListener('click', e => {
  if (e.target.matches('.modal-item img')) {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen';
    overlay.innerHTML = `<img src="${e.target.src}" alt="">`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  }
});



/* ---------- кнопка "Показать ещё" ---------- */
moreBtn.onclick = loadMore;

/* ---------- изменение фильтров ---------- */
[gameSel, sortSel].forEach(el =>
  el.addEventListener('change', resetAndRender)
);