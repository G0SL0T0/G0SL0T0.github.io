const ROOT_JSON = 'screenshots.json';
const PER_PAGE  = 12;

let allImages = [];
let filtered  = [];
let start     = 0;
let viewer    = null;

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
  if (allImages.length) return;
  const res = await fetch(ROOT_JSON);
  if (!res.ok) throw new Error(res.status);
  allImages = await res.json();
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

/* ---------- Filters ---------- */
function resetAndRender() {
  start   = 0;
  grid.innerHTML = '';

  filtered = [...allImages];
  if (gameSel.value !== 'all')
    filtered = filtered.filter(i => i.game === gameSel.value);

  const dir = sortSel.value === 'date-asc' ? 1 : -1;
  filtered.sort((a, b) => dir * (a.date - b.date));

  loadMore();
}

/* ---------- "Show more" ---------- */
function loadMore() {
  const chunk = filtered.slice(start, start + PER_PAGE);
  renderGrid(chunk);
  start += PER_PAGE;
  moreBtn.style.display = start >= filtered.length ? 'none' : 'block';
}

/* ---------- Render grid items ---------- */
function renderGrid(list) {
  list.forEach(img => {
    const div = document.createElement('div');
    div.className = 'modal-item';
    div.innerHTML = `
      <img src="${img.url}" loading="lazy" alt="">
      <div class="modal-info"><strong>${img.game}</strong></div>
    `;
    grid.appendChild(div);
    div.onclick = () => openViewer(img.url);
  });
}

/* ---------- Inline viewer ---------- */
function openViewer(src) {
  if (viewer) viewer.remove();

  viewer = document.createElement('div');
  viewer.className = 'viewer';
  viewer.innerHTML = `
    <button class="viewer-back">← Назад</button>
    <img src="${src}" alt="">
  `;

  const modalContent = modal.querySelector('.modal-content');
  modalContent.appendChild(viewer);

  viewer.querySelector('.viewer-back').onclick = closeViewer;
}

function closeViewer() {
  if (viewer) {
    viewer.remove();
    viewer = null;
  }
}

/* ---------- Delegated click on grid ---------- */
grid.addEventListener('click', e => {
  if (e.target.closest('.modal-item')) return;
});

/* ---------- Filters & Button ---------- */
[gameSel, sortSel].forEach(el =>
  el.addEventListener('change', resetAndRender)
);
moreBtn.onclick = loadMore;