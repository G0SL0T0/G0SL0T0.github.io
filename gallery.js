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
  if (allImages.length) return;
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

/* ---------- Filters and Render ---------- */
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

function loadMore() {
  const chunk = filtered.slice(start, start + PER_PAGE);
  renderPage(chunk);
  start += PER_PAGE;
  moreBtn.style.display = start >= filtered.length ? 'none' : 'block';
}

moreBtn.onclick = loadMore;

function showFullscreenImage(imgElement) {
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen';
  overlay.innerHTML = `<img src="${imgElement.src}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />`;
  overlay.onclick = () => overlay.remove();
  overlay.style.zIndex = 10001;
  
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.appendChild(overlay);
    modal.style.display = 'flex';
  } else {
    document.body.appendChild(overlay);
  }
}

window.addEventListener('click', e => {
  if (e.target.matches('.modal-item img')) {
    showFullscreenImage(e.target);
  }
});

/* ---------- Button "Show more" ---------- */
moreBtn.onclick = loadMore;

/* ---------- Change Filters ---------- */
[gameSel, sortSel].forEach(el =>
  el.addEventListener('change', resetAndRender)
);