// src/components/games/GamesSidebar.tsx
'use client';

export default function GamesSidebar() {
  return (
    <div className="hobby-sidebar">
      <div className="sidebar-inner space-y-6">
        {/* Жанры */}
        <div className="sidebar-block bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-tags"></i> Предпочитаемые жанры
          </h3>
          <ul className="genre-list space-y-2">
            <li 
              className="relative p-2 border-b border-gray-200 hover:bg-gray-50 rounded cursor-help"
              title="Большие онлайн-миры с прокачкой и экономикой, где есть контент на года игры (но без ограничений - не как генш,zzz,WW и т.д.)"
            >
              MMO, прогрессивные ММО
            </li>
            <li 
              className="relative p-2 border-b border-gray-200 hover:bg-gray-50 rounded cursor-help"
              title="Игры о космосе и космических путешествиях, использование физики в играх (космической), а так же фантастика - тоже космическая"
            >
              Космические тематики и космо-RPG
            </li>
            <li 
              className="relative p-2 border-b border-gray-200 hover:bg-gray-50 rounded cursor-help"
              title="Пошаговые, реального времени и RTS, про космос - других фаворитов не нашел пока"
            >
              Стратегии (X3 - X4, Dawn of War)
            </li>
            <li 
              className="relative p-2 border-b border-gray-200 hover:bg-gray-50 rounded cursor-help"
              title="Вождения - только Saber Interactive, космо, фэнтези, фантастика. Множество ограничений на этот жанр"
            >
              Симуляторы
            </li>
            <li 
              className="relative p-2 hover:bg-gray-50 rounded cursor-help"
              title="Глубокие сюжеты и развитие персонажа, психологические и детективные сюжеты, сюжеты с малой выдачей информации."
            >
              Сюжетные RPG
            </li>
          </ul>
        </div>

        {/* Платформы */}
        <div className="sidebar-block bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-desktop"></i> Платформы
          </h3>
          <div className="platforms flex flex-wrap gap-2">
            <span className="platform-tag bg-gray-800 text-white px-3 py-1 rounded-full text-sm" title="PC">
              <i className="fas fa-desktop mr-1"></i>PC
            </span>
            <span className="platform-tag bg-gray-800 text-white px-3 py-1 rounded-full text-sm" title="Steam">
              <i className="fab fa-steam mr-1"></i>Steam
            </span>
            <span className="platform-tag bg-gray-800 text-white px-3 py-1 rounded-full text-sm" title="Mobile">
              <i className="fas fa-mobile-alt mr-1"></i>Mobile
            </span>
          </div>
        </div>

        {/* Достижения */}
        <div className="sidebar-block bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-trophy"></i> Последние достижения
          </h3>
          <ul className="achievements-list space-y-2">
            <li className="flex items-center gap-2 p-2 border-b border-gray-200">
              <span className="text-yellow-500">🏆</span>
              <span className="text-sm">Мастер Witcher 3</span>
            </li>
            <li className="flex items-center gap-2 p-2 border-b border-gray-200">
              <span className="text-yellow-500">🏆</span>
              <span className="text-sm">Выживший GTFO</span>
            </li>
            <li className="flex items-center gap-2 p-2">
              <span className="text-yellow-500">🏆</span>
              <span className="text-sm">Стратег Dawn of War</span>
            </li>
          </ul>
          <button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
            <i className="fas fa-list mr-2"></i> Все достижения
          </button>
        </div>

        {/* Контакты */}
        <div className="sidebar-block bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-user"></i> Контакты
          </h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://steamcommunity.com/id/Gosloto/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                title="Steam - Gosloto. Никнейм - (S)Gosloto"
              >
                <i className="fab fa-steam"></i> Steam профиль
              </a>
            </li>
            <li>
              <a 
                href="https://discord.gg/gosloto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-2"
              >
                <i className="fab fa-discord"></i> Мой Discord: gosloto
              </a>
            </li>
          </ul>
        </div>

        {/* Скриншоты */}
        <div className="mini-gallery bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-images"></i> Скриншоты
          </h2>
          <div className="mini-grid grid grid-cols-3 gap-2 mb-3">
            <img 
              src="/img/screenshot/screenshot1.jpg" 
              alt="Скриншот 1" 
              className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              loading="lazy"
            />
            <img 
              src="/img/screenshot/screenshot2.jpg" 
              alt="Скриншот 2" 
              className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              loading="lazy"
            />
            <img 
              src="/img/screenshot/screenshot3.jpg" 
              alt="Скриншот 3" 
              className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              loading="lazy"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
            <i className="fas fa-external-link-alt mr-2"></i> Показать все
          </button>
        </div>
      </div>
    </div>
  );
}