'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsSection from '@/components/NewsSection';
import StubbornButton from '@/components/StubbornButton';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Проекты</h1>
          
          <div className="max-w-6xl mx-auto">
            {/* Введение */}
            <section className="mb-16 text-center">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Здесь представлены некоторые из моих проектов. Каждый проект отражает 
                мои навыки и опыт в различных технологиях и подходах к разработке.
              </p>
            </section>
            
            {/* Проекты */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectCard
                  title="SKYT — трекер времени"
                  description="MVP в разработке: базовый учёт задач, таймеры и экспорт CSV уже работают. Следующий релиз добавит аналитику и мобильную версию."
                  image="/images/skyt-logo.png"
                  demoUrl="/SKYT/index.html"
                  detailsUrl="#"
                  metrics={[
                    { icon: "fas fa-tools", text: "Текущая стадия: MVP" },
                    { icon: "fas fa-rocket", text: "Релиз PWA: Декабрь 2025" }
                  ]}
                />
                
                <ProjectCard
                  title="Пиксельная Экосистема"
                  description="Интерактивная симуляция с различными сущностями и их взаимодействием. Полностью переписана с React на чистый JavaScript для улучшения производительности."
                  image="/images/pixel-eco-logo.png"
                  demoUrl="/#pixel-ecosystem-game"
                  detailsUrl="#"
                  metrics={[
                    { icon: "fas fa-tachometer-alt", text: "Производительность: +40%" },
                    { icon: "fas fa-code", text: "Размер кода: -70%" }
                  ]}
                />
                
                <ProjectCard
                  title="SentinelGuard"
                  description="Администратор сети для мониторинга и управления сетевой безопасностью. Автоматизация рутинных задач и сканирование уязвимостей."
                  image="/images/sentinel-logo.png"
                  demoUrl="/sentinelguard/index.html"
                  detailsUrl="#"
                  metrics={[
                    { icon: "fas fa-shield-alt", text: "Автоматизация: 80%" },
                    { icon: "fas fa-network-wired", text: "Сканирование сети" }
                  ]}
                />
                
                <ProjectCard
                  title="Корпоративный портал"
                  description="Внутренний портал для крупной компании с системой управления задачами, документооборотом и системой уведомлений."
                  image="/images/portal-logo.png"
                  demoUrl="#"
                  detailsUrl="#"
                  metrics={[
                    { icon: "fas fa-users", text: "Пользователей: 500+" },
                    { icon: "fas fa-tasks", text: "Задач в день: 1000+" }
                  ]}
                />
              </div>
            </section>
            
            {/* Технологии */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Используемые технологии</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">⚛️</div>
                  <h3 className="font-semibold">React</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🟢</div>
                  <h3 className="font-semibold">Vue.js</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🔺</div>
                  <h3 className="font-semibold">Angular</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🟨</div>
                  <h3 className="font-semibold">JavaScript</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🟦</div>
                  <h3 className="font-semibold">TypeScript</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🐍</div>
                  <h3 className="font-semibold">Python</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🟢</div>
                  <h3 className="font-semibold">Node.js</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🗄️</div>
                  <h3 className="font-semibold">PostgreSQL</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🍃</div>
                  <h3 className="font-semibold">MongoDB</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🐳</div>
                  <h3 className="font-semibold">Docker</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">🎨</div>
                  <h3 className="font-semibold">Tailwind</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">📱</div>
                  <h3 className="font-semibold">Next.js</h3>
                </div>
              </div>
            </section>
            
            {/* Процесс работы */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Как я работаю</h2>
              
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Планирование</h3>
                    <p className="text-gray-600">
                      Анализ требований, проектирование архитектуры, 
                      выбор технологий и оценка сроков
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Разработка</h3>
                    <p className="text-gray-600">
                      Написание чистого кода, тестирование, 
                      регулярные коммиты и code review
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Внедрение</h3>
                    <p className="text-gray-600">
                      Деплой, мониторинг, оптимизация 
                      производительности и поддержка
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