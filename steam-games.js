const TOGGLE_BTN  = document.getElementById('toggleSteam');
const LIST        = document.getElementById('steamList');
const UL          = document.getElementById('steamGamesList');
const LOAD_MORE   = document.getElementById('loadMoreGamesBtn');

let allGames  = [];
let startIdx  = 0;
const STEP    = 10;

/* 1. Steam Web API (замените ключ и steamid) */
const STEAM_API = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'
                + '?key=F6F02C073AA8F7021A3EB00AB8C67FE5'
                + '&steamid=76561198263312345'
                + '&include_appinfo=1&format=json';

TOGGLE_BTN.addEventListener('click', () => LIST.classList.toggle('hidden'));

async function fetchGames() {
  try {
    const res = await fetch(STEAM_API);
    const data = await res.json();
    allGames = data.response.games || [];
  } catch (e) {
    allGames = [
      {name:'The Witcher 3', playtime_forever: 409 * 60, img_icon_url:'3e77c41368aea83154676e71e4de03d627163607'},
      {name:'GTFO', playtime_forever: 900 * 60, img_icon_url:'20920/f765457ea5fe20875b40799e458f370f2ac36908'},
      {name:'EVE Frontier', playtime_forever: 50 * 60, img_icon_url:'eve-icon.jpg'}
    ];
  }
  renderChunk();
}

function renderChunk() {
  const slice = allGames.slice(startIdx, startIdx + STEP);
  slice.forEach(g => {
    const li = document.createElement('li');
    li.className = 'steam-item';
    li.innerHTML = `
      <img src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg" alt="${g.name}">
      <h4>${g.name}</h4>
      <span class="hours">${Math.floor(g.playtime_forever / 60)} ч</span>
    `;
    UL.appendChild(li);
  });
  startIdx += STEP;
  LOAD_MORE.style.display = startIdx >= allGames.length ? 'none' : 'block';
}

LOAD_MORE.addEventListener('click', renderChunk);
fetchGames();