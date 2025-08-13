/* ========== STATIC DATA  ========== */
const newsData = [
  {
    date: '2025-08-13',
    version: 'v3.4',
    text: 'Добавлен блок "новости" на каждую из страниц, парсинг JS новостей.'
  },
  {
    date: '2025-08-12',
    version: 'v3.3',
    text: 'Обработана и улучшена кнопка "скачать резюме" -сейчас выбор из 4-х резюме.'
  },
  {
    date: '2025-08-3',
    version: 'v3.2',
    text: 'Добавление нового раздела хобби "книги", большой фикс раздела "Обо мне".'
  },
  {
    date: '2025-08-01',
    version: 'v3.1',
    text: 'Фикс раздела "контакты" - отправка mail почты работает нормально. + Обновление данных пользователя.'
  },
  {
    date: '2025-07-27',
    version: 'v3.0',
    text: 'Глобальные изменения! Задетые разделы: "Навыки", "Проекты", "Главная страничка".'
  },
  {
    date: '2025-07-22',
    version: 'v2.9',
    text: 'Раздел "игры" - Большое изменение - библиотека скриншотов, перечень достижений и ачивок.'
  },
  {
    date: '2025-07-15',
    version: 'v2.2',
    text: 'Фиксы Главной страницы, добавление "Пиксельной Экосистемы" в footer сайта.'
  },
  {
    date: '2025-07-22',
    version: 'v2.0',
    text: 'Рефакторинг Главной страницы, добавление разделов кейсов на страницу.'
  }
];

/* ========== helpers ========== */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

/* ========== render ========== */
function renderLatestNews(count = 4) {
  const list = document.querySelector('.news-timeline');
  if (!list) return;

  const latest = newsData.slice(0, count);
  list.innerHTML = latest.map(item => `
    <li>
      <time>${formatDate(item.date)}</time>
      <p><strong>${item.version}</strong> — ${item.text}</p>
    </li>
  `).join('');
}

function renderAllNews() {
  const list = document.querySelector('#allNewsList');
  if (!list) return;

  list.innerHTML = newsData.map(item => `
    <li>
      <time>${formatDate(item.date)}</time>
      <span class="news-version">${item.version}</span>
      <p>${item.text}</p>
    </li>
  `).join('');
}

/* ========== init ========== */
document.addEventListener('DOMContentLoaded', () => {
  renderLatestNews();
  renderAllNews();
});

let page = 0;
const perPage = 6;

function renderAllNews(loadNext = false) {
  const list = document.getElementById('allNewsList');
  const btn  = document.getElementById('loadPrevBtn');
  if (!list) return;

  const start = page * perPage;
  const slice = newsData.slice(start, start + perPage);

  if (!loadNext) list.innerHTML = '';
  slice.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <time>${formatDate(item.date)}</time>
      <span class="news-version">${item.version}</span>
      <p>${item.text}</p>
    `;
    list.appendChild(li);
  });

  page++;
  btn.style.display = (page * perPage >= newsData.length) ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  renderLatestNews(4);
  document.getElementById('loadPrevBtn')
          ?.addEventListener('click', () => renderAllNews(true));
});