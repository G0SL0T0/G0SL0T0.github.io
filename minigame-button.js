// --- УБЕГАЮЩАЯ КНОПКА (stubbornButton) ---
const stubbornButton = document.getElementById('stubborn-button');
const spoilerModal = document.getElementById('spoiler-modal');
let teleportCooldown = false;

const taunts = [
  "Не дотронешься!",
  "Телепорт!",
  "Я тут, а потом — нет.",
  "Пшшш... исчез.",
  "Касание = провал.",
  "Ты слишком близко.",
  "Это сокрость? Вот это скорость!"
];

function randomTaunt() {
  const taunt = taunts[Math.floor(Math.random() * taunts.length)];
  stubbornButton.title = taunt;
  console.log(`🧠 Кнопка: "${taunt}"`);
}

function clampPosition(x, y) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const buttonWidth = 200;
  const buttonHeight = 50;
  let newX = x;
  let newY = y;

  if (x < 0 || x > screenWidth - buttonWidth || y < 0 || y > screenHeight - buttonHeight) {
    newX = Math.random() * (screenWidth - buttonWidth);
    newY = Math.random() * (screenHeight - buttonHeight);
    console.warn("🌀 Кнопка телепортировалась обратно!");
  }
  return { x: newX, y: newY };
}

function teleportRandom() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const x = Math.random() * (screenWidth - 200);
  const y = Math.random() * (screenHeight - 50);
  const { x: clampedX, y: clampedY } = clampPosition(x, y);
  stubbornButton.style.transition = 'none';
  stubbornButton.style.left = `${clampedX}px`;
  stubbornButton.style.top = `${clampedY}px`;
  setTimeout(() => {
    stubbornButton.style.transition = 'left 0.08s, top 0.08s';
  }, 10);
  randomTaunt();
}

const mouseMoveHandler = (e) => {
  const buttonRect = stubbornButton.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const isOverlapping = !(
    mouseX < buttonRect.left ||
    mouseX > buttonRect.right ||
    mouseY < buttonRect.top ||
    mouseY > buttonRect.bottom
  );
  if (isOverlapping && !teleportCooldown) {
    teleportRandom();
    teleportCooldown = true;
    setTimeout(() => (teleportCooldown = false), 100);
  }
};

document.addEventListener('mousemove', mouseMoveHandler);
document._mousemoveHandler = mouseMoveHandler;

stubbornButton.addEventListener('click', () => {
  spoilerModal.classList.remove('hidden');
});
function closeSpoiler() {
  spoilerModal.classList.add('hidden');
  teleportRandom();
}
spoilerModal.addEventListener('click', (e) => {
  if (e.target === spoilerModal) closeSpoiler();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSpoiler();
});
setInterval(() => {
  if (Math.random() < 0.25) teleportRandom();
}, 2000);

// --- СТОП-КНОПКА (stopButton) ---
const stopButton = document.getElementById('stop-button');
stopButton.style.position = 'fixed';
stopButton.style.bottom = '30px';
stopButton.style.right = '30px';
stopButton.style.width = '60px';
stopButton.style.height = '60px';
stopButton.style.background = '#ff4d4d';
stopButton.style.color = 'white';
stopButton.style.border = 'none';
stopButton.style.borderRadius = '50%';
stopButton.style.fontSize = '24px';
stopButton.style.cursor = 'pointer';
stopButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
stopButton.style.zIndex = '1002';

stopButton.addEventListener('click', () => {
  stubbornButton.style.display = 'none';
  stopButton.style.display = 'none';
  if (document._mousemoveHandler) {
    document.removeEventListener('mousemove', document._mousemoveHandler);
  }
  console.log('🛑 Убегающая кнопка остановлена навсегда');
});