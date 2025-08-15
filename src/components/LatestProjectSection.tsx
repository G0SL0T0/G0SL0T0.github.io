// src/components/LatestProjectSection.tsx
'use client';

import Link from 'next/link';
export default function LatestProjectSection() {
  return (
    <section className="latest-project-wrapper">
      <div className="container">
        <h2 className="section-title text-white">Последний проект</h2>
        <div className="latest-project-card text-white">
          <div className="project-logo">
            <div className="skyt-logo-new">
              <div className="layer layer-outer"></div>
              <div className="layer layer-glass"></div>
              <div className="layer layer-typo">
                <span className="s-letter">S</span>
                <span className="kyt">KYT</span>
              </div>
              <div className="icon-ring">
                <i className="fas fa-rocket"></i>
                <i className="fas fa-clock"></i>
                <i className="fas fa-chart-line"></i>
                <i className="fas fa-bolt"></i>
              </div>
            </div>
          </div>
          <div className="project-info">
            <h3>SKYT — трекер времени</h3>
            <p>
              MVP в разработке: базовый учёт задач, таймеры и экспорт CSV уже работают.<br />
              Следующий релиз добавит аналитику и мобильную версию.
            </p>
            <ul className="project-metric">
              <li><i className="fas fa-tools"></i> Текущая стадия: MVP</li>
              <li><i className="fas fa-rocket"></i> Релиз PWA: Декабрь 2025</li>
            </ul>
            <div className="project-actions">
              <Link href="/SKYT" className="button">Попробовать демо</Link>
              <Link href="/projects" className="button secondary">Все кейсы</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}