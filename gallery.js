const ROOT_JSON = 'screenshots.json';
const PER_PAGE  = 12;

let allImages = [];
let filtered  = [];
let start     = 0;

const modal   = document.getElementById('galleryModal');
const openBtn = document.getElementById('openGalleryBtn');
const closeBtn= document.querySelector('.close');
const gameSel = document.getElementById('gameSel');
const sortSel = document.getElementById('sortSel');
const grid    = document.getElementById('modalGrid');
const moreBtn = document.getElementById('modalMoreBtn');

// модальное окно
openBtn.onclick = () => { modal.style.display='flex'; loadData(); };
closeBtn.onclick= () => { modal.style.display='none'; };

async function loadData() {
  if (allImages.length) return; // уже загружено
  const res = await fetch(ROOT_JSON);
  allImages = await res.json();
  populateGameFilter();
  applyFilters();
}

function populateGameFilter() {
  const games = [...new Set(allImages.map(i => i.game))].sort();
  games.forEach(g=>{
    const opt=document.createElement('option');
    opt.value=g;
    opt.textContent=g;
    gameSel.appendChild(opt);
  });
}

function applyFilters() {
  grid.innerHTML='';
  start=0;
  let temp=[...allImages];

  // фильтр по игре
  if (gameSel.value !== 'all') temp = temp.filter(i=>i.game===gameSel.value);

  // сортировка по времени
  const dir = sortSel.value === 'date-asc' ? 1 : -1;
  temp.sort((a,b)=>dir*(a.date-b.date));

  filtered=temp;
  loadMore();
}

function loadMore() {
  const slice=filtered.slice(start,start+PER_PAGE);
  slice.forEach(img=>{
    const div=document.createElement('div');
    div.className='modal-item';
    div.innerHTML=`
      <img src="${img.url}" loading="lazy">
      <div class="modal-info">
        <span>${img.game}</span>
      </div>`;
    grid.appendChild(div);
  });
  start+=PER_PAGE;
  moreBtn.style.display=start>=filtered.length?'none':'block';
}

gameSel.addEventListener('change', applyFilters);
sortSel.addEventListener('change', applyFilters);
moreBtn.addEventListener('click', loadMore);