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
openBtn.onclick = () => { modal.style.display='flex'; loadData(); };
closeBtn.onclick= () => { modal.style.display='none'; };

// ---------- LOAD ----------
async function loadData() {
  if (allImages.length) return;
  const res = await fetch(ROOT_JSON);
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
  if (gameSel.value !== 'all') temp = temp.filter(i=>i.game===gameSel.value);
  const dir = sortSel.value === 'date-asc' ? 1 : -1;
  temp.sort((a,b)=>dir*(a.date-b.date));
  filtered=temp;
  renderPage(temp.slice(0,PER_PAGE));
  start=PER_PAGE;
  moreBtn.style.display=start>=filtered.length?'none':'block';
}

function renderPage(list) {
  list.forEach(img=>{
    const div=document.createElement('div');
    div.className='modal-item';
    div.innerHTML=`<img src="${img.url}" loading="lazy"><div class="modal-info"><strong>${img.game}</strong></div>`;
    grid.appendChild(div);
  });
}
moreBtn.onclick=()=>{
  renderPage(filtered.slice(start,start+PER_PAGE));
  start+=PER_PAGE;
  moreBtn.style.display=start>=filtered.length?'none':'block';
};

/* before showing the modal, move it to <body> */
openBtn.onclick = () => {
  document.body.appendChild(modal);   // detach & attach to body
  modal.style.display = 'flex';
};

/* optional: move it back to the sidebar when closed */
closeBtn.onclick = () => {
  modal.style.display = 'none';
  // if you want to keep DOM order, re-append to sidebar here
};
// любой скриншот → полный экран
document.addEventListener('click', e=>{
  if(!e.target.matches('.gallery-item img, .modal-item img')) return;
  const overlay=document.createElement('div');
  overlay.className='fullscreen';
  overlay.innerHTML='<img src="'+e.target.src+'">';
  overlay.onclick=()=>overlay.remove();
  document.body.appendChild(overlay);
});

[gameSel,sortSel].forEach(el=>el.addEventListener('change', applyFilters));