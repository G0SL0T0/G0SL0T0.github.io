const fs = require('fs');
const path = require('path');

const ROOT = 'img/screenshot';
const OUT  = 'screenshots.json';

// полное название → ключ папки
const GAME_NAMES = {
  ''          : 'Общие',
  witcher     : 'The Witcher 3: Wild Hunt',
  gtfo        : 'GTFO',
  eve         : 'EVE Frontier',
  expeditions : 'Expeditions: A MudRunner Game',
  skyrim      : 'The Elder Scrolls V: Skyrim',
  tradesman   : 'TRADESMAN: Deal to Dealer',
  warframe    : 'Warframe',
  dbd         : 'Dead by Daylight',
  everyone    : 'Разные игры'
};

let data = [];

// 1. удаляем старый файл
if (fs.existsSync(OUT)) fs.unlinkSync(OUT);

// 2. сканируем папки
Object.entries(GAME_NAMES).forEach(([folderKey, gameName]) => {
  const dir = folderKey ? path.join(ROOT, folderKey) : ROOT;
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .forEach(file => {
      const stat = fs.statSync(path.join(dir, file));
      data.push({
        url: `img/screenshot/${folderKey ? folderKey + '/' : ''}${file}`,
        game: gameName,
        date: stat.mtime.getTime()
      });
    });
});

// 3. пишем новый файл
fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`Собрано ${data.length} скриншотов`);