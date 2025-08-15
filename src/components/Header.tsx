// src/components/Header.tsx
'use client';

const Header = () => {
  return (
    <header className="w-full left-0 right-0 bg-[#343a40] text-white py-2 sticky top-0 z-100 shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
      <div className="header-container max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <a href="/" className="logo text-xl font-bold text-white no-underline">Иван - Gosloto</a>
        <div className="menu-toggle"></div>
        <nav className="flex gap-4">
          <a href="/about" className="active text-white no-underline relative py-2 text-sm transition-colors hover:text-[#adb5bd] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#007bff] after:to-[#66a3ff] after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Обо мне</a>
          <a href="/skills" className="text-white no-underline relative py-2 text-sm transition-colors hover:text-[#adb5bd] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#007bff] after:to-[#66a3ff] after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Навыки</a>
          <a href="/projects" className="text-white no-underline relative py-2 text-sm transition-colors hover:text-[#adb5bd] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#007bff] after:to-[#66a3ff] after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Проекты</a>
          <a href="/hobbies" className="text-white no-underline relative py-2 text-sm transition-colors hover:text-[#adb5bd] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#007bff] after:to-[#66a3ff] after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Хобби</a>
          <a href="/contact" className="text-white no-underline relative py-2 text-sm transition-colors hover:text-[#adb5bd] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#007bff] after:to-[#66a3ff] after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Контакты</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;