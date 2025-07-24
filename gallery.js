const ROOT_JSON = 'screenshots.json';
const PER_PAGE  = 12;

let allImages = [];
let filtered  = [];
let start     = 0;

// ---------- DOM ----------
const openBtn = document.getElementById('openGalleryBtn');
const closeBtn= document.querySelector('.close');
const modal   = document.getElementById('galleryModal');
const gameSel = document.getElementById('gameSel');
const sortSel = document.getElementById('sortSel');
const grid    = document.getElementById('modalGrid');
const moreBtn = document.getElementById('modalMoreBtn');

// ---------- OPEN / CLOSE ----------
openBtn.onclick = () => { document.body.appendChild(modal); modal.style.display='flex'; loadData(); };
closeBtn.onclick= () => { modal.style.display='none'; };

// ---------- LOAD ----------
async function loadData() {
  if (allImages.length) return;
  const res = await fetch(ROOT_JSON);
    if (!res.ok) throw new Error(`Не удалось загрузить JSON: ${res.status}`);
  allImages = await res.json();
  populateGameFilter();
  applyFilters();
}

function populateGameFilter() {
  const games = [...new Set(allImages.map(i => i.game))].sort();
  games.forEach(g=>{
    const opt=document.createElement('option'); opt.value=g; opt.textContent=g;
    gameSel.appendChild(opt);
  });
}

function applyFilters() {
  grid.innerHTML=''; start=0;
  let temp=[...allImages];
  console.log('before filter', temp.length);

  if (gameSel.value !== 'all') temp = temp.filter(i=>i.game===gameSel.value);
  console.log('after game filter', temp.length);

  const dir = sortSel.value === 'date-asc' ? 1 : -1;
  temp.sort((a,b)=>dir*(a.date-b.date));
  console.log('after sort', temp.length);

  filtered=temp;
  renderPage(temp.slice(0,PER_PAGE));
  start=PER_PAGE;
  moreBtn.style.display=start>=filtered.length?'none':'block';
}

function renderPage(list) {
  console.log('renderPage', list.length, list); // <— добавь
  list.forEach(img=>{
    const div=document.createElement('div');
    div.className='modal-item';
    div.innerHTML=`<img src="${img.url}" loading="lazy"><div class="modal-info"><strong>${img.game}</strong></div>`;
    grid.appendChild(div);
  });
}
moreBtn.onclick=()=>{
  renderPage(filtered.slice(start,start+PER_PAGE));
  console.table(list.slice(0,6));
  start+=PER_PAGE;
  moreBtn.style.display=start>=filtered.length?'none':'block';
};

document.addEventListener('click', e=>{
  if(!e.target.matches('.gallery-item img, .modal-item img')) return;
  const overlay=document.createElement('div');
  overlay.className='fullscreen';
  overlay.innerHTML='<img src="'+e.target.src+'">';
  overlay.onclick=()=>overlay.remove();
  document.body.appendChild(overlay);
});

[gameSel,sortSel].forEach(el=>el.addEventListener('change', applyFilters));