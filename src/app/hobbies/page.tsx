'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsSection from '@/components/NewsSection';
import StubbornButton from '@/components/StubbornButton';

export default function HobbiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Хобби</h1>
          
          <div className="max-w-6xl mx-auto">
            {/* Введение */}
            <section className="mb-16 text-center">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Помимо программирования, у меня есть множество увлечений, которые помогают 
                мне развиваться как личность и находить вдохновение для новых идей.
              </p>
            </section>
            
            {/* Хобби */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Книги */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">📚</div>
                      <h3 className="text-xl font-bold">Книги</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Люблю читать как художественную, так и техническую литературу. 
                      Фантастика и научная фантастика помогают развивать воображение, 
                      а книги по программированию — постоянно учиться новому.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Фантастика</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Техническая литература</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Психология</span>
                    </div>
                  </div>
                </div>
                
                {/* Видеоигры */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">🎮</div>
                      <h3 className="text-xl font-bold">Видеоигры</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Игры — это не только отдых, но и источник вдохновения. 
                      Люблю исследовать игровые миры, анализировать геймдизайн 
                      и иногда даже пробовать создавать простые игры.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">RPG</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Стратегии</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Инди</span>
                    </div>
                  </div>
                </div>
                
                {/* Музыка */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">🎵</div>
                      <h3 className="text-xl font-bold">Музыка</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Музыка помогает сосредоточиться во время работы и расслабиться после. 
                      Слушаю разные жанры — от классики до современной электроники.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Рок</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Электроника</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Классика</span>
                    </div>
                  </div>
                </div>
                
                {/* Путешествия */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">✈️</div>
                      <h3 className="text-xl font-bold">Путешествия</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Люблю открывать для себя новые места и культуры. 
                      Путешествия расширяют кругозор и дают возможность 
                      посмотреть на мир под другим углом.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Горы</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Море</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Города</span>
                    </div>
                  </div>
                </div>
                
                {/* Фотография */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">📷</div>
                      <h3 className="text-xl font-bold">Фотография</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Фотография учит видеть красоту в деталях и замечать моменты, 
                      которые другие упускают. Нравится экспериментировать 
                      с композицией и обработкой.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Пейзаж</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Уличная фотография</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Макро</span>
                    </div>
                  </div>
                </div>
                
                {/* Кулинария */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">👨‍🍳</div>
                      <h3 className="text-xl font-bold">Кулинария</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Готовка — это творческий процесс, похожий на программирование. 
                      Люблю экспериментировать с рецептами и создавать 
                      что-то новое из простых ингредиентов.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Итальянская кухня</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Азиатская кухня</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Выпечка</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Как хобби помогают в работе */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Как хобби помогают в работе</h2>
              
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">Развитие креативности</h3>
                    <p className="text-gray-600">
                      Разнообразные увлечения помогают развивать креативное мышление, 
                      которое необходимо для поиска нестандартных решений 
                      в программировании и дизайне.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-600">Снижение стресса</h3>
                    <p className="text-gray-600">
                      Хобби — отличный способ снять напряжение после сложного 
                      рабочего дня. Отдых и переключение внимания помогают 
                      поддерживать работоспособность и избегать выгорания.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-600">Новые перспективы</h3>
                    <p className="text-gray-600">
                      Каждое увлечение открывает новые горизонты и знакомит 
                      с разными сообществами. Это дает возможность смотреть 
                      на проблемы под разными углами.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-orange-600">Баланс жизни</h3>
                    <p className="text-gray-600">
                      Хобби помогают поддерживать баланс между работой и личной 
                      жизнью, что важно для долгосрочной продуктивности 
                      и общего благополучия.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
      <NewsSection />
      <StubbornButton />
    </div>
  );
}