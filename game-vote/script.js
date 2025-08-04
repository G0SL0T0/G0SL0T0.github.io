// ---------- 1. Базовый JSON (встроен) ----------
const GAMES_BASE = [
  {
    id: "wildgate",
    name: "Wildgate",
    image: "https://via.placeholder.com/300x200/4CAF50/fff?text=Wildgate",
    description: "Онлайн-симулятор дикой природы с выживанием и кооперативом.",
    tags: ["MMO", "Выживание", "Кооператив"],
    votes: 0
  },
  {
    id: "snowrunner",
    name: "SnowRunner",
    image: "https://via.placeholder.com/300x200/2196F3/fff?text=SnowRunner",
    description: "Реалистичный симулятор вождения по бездорожью и снегу.",
    tags: ["Симулятор", "Авто", "Физика"],
    votes: 0
  },
  {
    id: "peak",
    name: "Peak",
    image: "https://via.placeholder.com/300x200/FF9800/fff?text=Peak",
    description: "Приключенческая головоломка в горах с погодными катастрофами.",
    tags: ["Головоломка", "Приключение", "Погода"],
    votes: 0
  },
  {
    id: "panicore",
    name: "Panicore",
    image: "https://via.placeholder.com/300x200/9C27B0/fff?text=Panicore",
    description: "Кооперативный хоррор с элементами стелса и разумными монстрами.",
    tags: ["Хоррор", "Кооператив", "Стелс"],
    votes: 0
  }
];

// ---------- 2. Хранение в localStorage ----------
let games = [];
let votesLeft = 3;

function loadData() {
  const saved = JSON.parse(localStorage.getItem('games')) || GAMES_BASE;
  games = saved.map(base => ({
    ...base,
    votes: base.votes || 0
  }));
  votesLeft = parseInt(localStorage.getItem('votesLeft') || 3);
}

function saveData() {
  localStorage.setItem('games', JSON.stringify(games));
  localStorage.setItem('votesLeft', votesLeft);
}

// ---------- 3. Рендер ----------
function renderAll() {
  const grid = document.getElementById('gamesGrid');
  grid.innerHTML = '';
  games.forEach(game => {
    const imgSrc = game.steamId
      ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamId}/header.jpg`
      : game.image;
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${game.name}" onerror="this.src='fallback.jpg'">
      <div class="content">
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <div class="tags">${game.tags.map(t => `<span>#${t}</span>`).join('')}</div>
        <div class="votes-count">${game.votes} голос(а)</div>
      </div>
    `;
    card.onclick = () => vote(game.id);
    grid.appendChild(card);
  });

  const list = document.getElementById('resultsList');
  list.innerHTML = '';
  games.filter(g => g.votes > 0)
       .sort((a, b) => b.votes - a.votes)
       .forEach(({ name, votes }) => {
         list.innerHTML += `<li><span>${name}</span><span>${votes}</span></li>`;
       });

  updateCounter();
}

// ---------- 4. Голосование ----------
function vote(id) {
  if (votesLeft <= 0) return;
  const game = games.find(g => g.id === id);
  game.votes++;
  votesLeft--;
  saveData();
  renderAll();
}

// ---------- 5. Сброс ----------
function resetVotes() {
  games.forEach(g => g.votes = 0);
  votesLeft = 3;
  saveData();
  renderAll();
}

// ---------- 6. Добавление через Steam ----------
function addSteamGame() {
  if (votesLeft <= 0) return;
  const name = document.getElementById('steamName').value.trim();
  const url = document.getElementById('steamUrl').value.trim();
  if (!name || !url) return;

  const match = url.match(/\/app\/(\d+)/);
  if (!match) { alert('Неверная ссылка Steam'); return; }

  const appid = match[1];
  const id = name.toLowerCase().replace(/\s+/g, '-');

  games.push({
    id,
    name,
    steamId: appid,
    image: null,
    description: 'Добавлено через Steam',
    tags: ['Steam'],
    votes: 0
  });
  saveData();
  renderAll();
  document.getElementById('steamName').value = '';
  document.getElementById('steamUrl').value = '';
}

// ---------- 7. Старт ----------
function updateCounter() {
  document.getElementById('counter').textContent = `Осталось голосов: ${votesLeft}`;
}

loadData();
renderAll();