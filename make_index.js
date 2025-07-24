const fs = require('fs');
const path = require('path');

const ROOT = 'img/screenshot';
const OUT  = 'screenshots.json';

// полное название → ключ папки
const GAME_NAMES = {
  ''          : 'Общие',
  "1witcher"     : 'The Witcher 3: Wild Hunt',
  "5gtfo"        : 'GTFO',
  "4eve"         : 'EVE Frontier',
  "3expeditions" : 'Expeditions: A MudRunner Game',
  "6skyrim"      : 'The Elder Scrolls V: Skyrim',
  "2tradesman"   : 'TRADESMAN: Deal to Dealer',
  "4warframe"    : 'Warframe',
  "7dbd"         : 'Dead by Daylight',
  "8everyone"    : 'Разные игры'
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