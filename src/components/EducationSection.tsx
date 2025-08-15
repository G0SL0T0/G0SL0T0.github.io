// src/components/EducationSection.tsx
'use client';
const EducationSection = () => {
  return (
    <section className="education-section">
      <div className="education-container">
        <h2 className="education-title">Образование и сертификаты</h2>
        
        {/* Образование */}
        <div className="education-block">
          <h3 className="education-subtitle">
            <i className="fas fa-graduation-cap education-icon"></i> Образование
          </h3>
          <div className="education-grid">
            <div className="education-card">
              <div className="education-card-header">
                <span className="education-type">Среднее профессиональное</span>
                <h4 className="education-degree">Техник по компьютерным системам</h4>
              </div>
              <div className="education-card-body">
                <p className="education-institution">
                  ГПОУ «Воркутинский арктический горно-политехнический колледж»
                </p>
                <p className="education-year">2025г.</p>
                <a href="/assets/diploma.rar" download className="education-link">
                  <i className="fas fa-award education-link-icon"></i>
                  <span>Диплом с отличием</span>
                  <span className="education-file-info">(22.5 МБ, RAR)</span>
                </a>                             
              </div>
            </div>
            <div className="education-card">
              <div className="education-card-header">
                <span className="education-type education-type-future">Высшее</span>
                <h4 className="education-degree">Веб-технологии, кибербезопасность, программная инженерия</h4>
              </div>
              <div className="education-card-body">
                <p className="education-institution">В процессе получения</p>
                <p className="education-year education-year-future">2025 г. +</p>
                <div className="education-progress">
                  <div className="education-progress-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Сертификаты и курсы */}
        <div className="certificates-block">
          <h3 className="education-subtitle">
            <i className="fas fa-certificate education-icon education-icon-certificate"></i> Сертификаты и курсы
          </h3>
          <div className="certificates-grid">
            {/* Сертификаты */}
            <div className="certificates-card certificates-card-mincenter">
              <div className="certificates-card-header">
                <h4 className="certificates-title">МинЦифры России</h4>
                <div className="certificates-badge">В процессе</div>
              </div>
              <div className="certificates-card-body">
                <ul className="certificates-list">
                  <li className="certificates-item">
                    <div className="certificates-item-content">
                      <i className="fas fa-check-circle certificates-icon certificates-icon-js"></i>
                      <span>JavaScript — продвинутый уровень</span>
                    </div>
                    <div className="certificates-item-actions">
                      <span className="certificates-year">2025-2026</span>
                      <a 
                        href="/assets/certificates/JS.pdf" 
                        download 
                        className="certificate-download-link"
                      >
                        <i className="fas fa-download"></i>
                        <span>PDF</span>
                      </a>
                    </div>
                  </li>
                  <li className="certificates-item">
                    <div className="certificates-item-content">
                      <i className="fas fa-check-circle certificates-icon certificates-icon-html"></i>
                      <span>HTML — продвинутый уровень</span>
                    </div>
                    <div className="certificates-item-actions">
                      <span className="certificates-year">2025-2026</span>
                      <a 
                        href="/assets/certificates/HTML.pdf" 
                        download 
                        className="certificate-download-link"
                      >
                        <i className="fas fa-download"></i>
                        <span>PDF</span>
                      </a>
                    </div>
                  </li>
                  <li className="certificates-item">
                    <div className="certificates-item-content">
                      <i className="fas fa-check-circle certificates-icon certificates-icon-css"></i>
                      <span>CSS — продвинутый уровень</span>
                    </div>
                    <div className="certificates-item-actions">
                      <span className="certificates-year">2025-2026</span>
                      <a 
                        href="/assets/certificates/CSS.pdf" 
                        download 
                        className="certificate-download-link"
                      >
                        <i className="fas fa-download"></i>
                        <span>PDF</span>
                      </a>
                    </div>
                  </li>
                  <li className="certificates-item">
                    <div className="certificates-item-content">
                      <i className="fas fa-check-circle certificates-icon certificates-icon-git"></i>
                      <span>GIT — продвинутый уровень</span>
                    </div>
                    <div className="certificates-item-actions">
                      <span className="certificates-year">2025-2026</span>
                      <a 
                        href="/assets/certificates/GIT.pdf" 
                        download 
                        className="certificate-download-link"
                      >
                        <i className="fas fa-download"></i>
                        <span>PDF</span>
                      </a>
                    </div>
                  </li>
                  <li className="certificates-item">
                    <div className="certificates-item-content">
                      <i className="fas fa-check-circle certificates-icon certificates-icon-oop"></i>
                      <span>ООП — продвинутый уровень</span>
                    </div>
                    <div className="certificates-item-actions">
                      <span className="certificates-year">2025-2026</span>
                      <a 
                        href="/assets/certificates/OOP.pdf" 
                        download 
                        className="certificate-download-link"
                      >
                        <i className="fas fa-download"></i>
                        <span>PDF</span>
                      </a>
                    </div>
                  </li>
                  <li className="certificates-item">
                    <div className="certificates-item-content">
                      <i className="fas fa-check-circle certificates-icon certificates-icon-asd"></i>
                      <span>АСД — продвинутый уровень</span>
                    </div>
                    <div className="certificates-item-actions">
                      <span className="certificates-year">2025-2026</span>
                      <a 
                        href="/assets/certificates/ADS.pdf" 
                        download 
                        className="certificate-download-link"
                      >
                        <i className="fas fa-download"></i>
                        <span>PDF</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Курсы */}
            <div className="certificates-courses">
              {/* Хекслет */}
              <div className="certificates-card certificates-card-hexlet">
                <div className="certificates-card-header">
                  <h4 className="certificates-title">Хекслет</h4>
                  <div className="certificates-badge certificates-badge-completed">Завершено</div>
                </div>
                <div className="certificates-card-body">
                  <ul className="certificates-list">
                    <li className="certificates-item">
                      <div className="certificates-item-content">
                        <i className="fas fa-check-circle certificates-icon certificates-icon-js"></i>
                        <span>JavaScript — полный курс</span>
                      </div>
                    </li>
                    <li className="certificates-item">
                      <div className="certificates-item-content">
                        <i className="fas fa-check-circle certificates-icon certificates-icon-html"></i>
                        <span>HTML + CSS — полный курс</span>
                      </div>
                    </li>
                    <li className="certificates-item">
                      <div className="certificates-item-content">
                        <i className="fas fa-check-circle certificates-icon certificates-icon-python"></i>
                        <span>Python — полный курс</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Coddy */}
              <div className="certificates-card certificates-card-coddy">
                <div className="certificates-card-header">
                  <h4 className="certificates-title">Coddy</h4>
                  <div className="certificates-badge certificates-badge-ongoing">В процессе</div>
                </div>
                <div className="certificates-card-body">
                  <ul className="certificates-list">
                    <li className="certificates-item">
                      <div className="certificates-item-content">
                        <i className="fas fa-check-circle certificates-icon certificates-icon-js"></i>
                        <span>Ежедневная практика JS, HTML, CSS</span>
                      </div>
                    </li>
                    <li className="certificates-item">
                      <div className="certificates-item-content">
                        <i className="fas fa-check-circle certificates-icon certificates-icon-algorithm"></i>
                        <span>Алгоритмы и структуры данных</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EducationSection;