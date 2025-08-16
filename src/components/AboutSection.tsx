// src/components/AboutSection.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect, memo } from 'react';
import styles from './AboutSection.module.css';

// Мемоизированный компонент модального окна
const ResumeModal = memo(({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  // Обработка клавиши Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modalOverlayLight} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.modalClose} 
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          <i className="fas fa-times"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <div className={styles.modalIcon}>
            <i className="fas fa-file-download"></i>
          </div>
          <h3 id="modal-title">Выберите тип резюме</h3>
          <p className={styles.modalSubtitle}>Разные версии резюме для разных вакансий</p>
        </div>
        
        <div className={styles.resumeOptions}>
          <a href="/assets/cv.pdf" download className={styles.resumeCard}>
            <div className={styles.resumeIcon}>
              <i className="fas fa-file-alt"></i>
            </div>
            <div className={styles.resumeDetails}>
              <h4>Общее резюме</h4>
              <p>Все навыки и опыт</p>
            </div>
            <div className={styles.resumeIndicator}></div>
          </a>
          
          <a href="/assets/cv-react.pdf" download className={styles.resumeCard}>
            <div className={`${styles.resumeIcon} ${styles.resumeIconReact}`}>
              <i className="fab fa-react"></i>
            </div>
            <div className={styles.resumeDetails}>
              <h4>React-специалист</h4>
              <p>Фокус на React и экосистеме</p>
            </div>
            <div className={styles.resumeIndicator}></div>
          </a>
          
          <a href="/assets/cv-vue.pdf" download className={styles.resumeCard}>
            <div className={`${styles.resumeIcon} ${styles.resumeIconVue}`}>
              <i className="fab fa-vuejs"></i>
            </div>
            <div className={styles.resumeDetails}>
              <h4>Vue-разработчик</h4>
              <p>Опыт с Vue и Nuxt</p>
            </div>
            <div className={styles.resumeIndicator}></div>
          </a>
          
          <a href="/assets/cv-angular.pdf" download className={styles.resumeCard}>
            <div className={`${styles.resumeIcon} ${styles.resumeIconAngular}`}>
              <i className="fab fa-angular"></i>
            </div>
            <div className={styles.resumeDetails}>
              <h4>Angular-эксперт</h4>
              <p>Enterprise решения</p>
            </div>
            <div className={styles.resumeIndicator}></div>
          </a>
        </div>
      </div>
    </div>
  );
});

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Закрытие модального окна по клику на фон
  const handleOverlayClick = () => closeModal();
  
  // Анимация появления при прокрутке
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.querySelector(`.${styles.about}`);
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section className={`${styles.about} ${isVisible ? styles.animateFadeIn : ''}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Обо мне</h2>
          <div className={styles.sectionDivider}></div>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              Frotend разработчик с наклонностями Бэкенда и <span className={styles.accent}>4+ годами</span> опыта в создании 
              веб-приложений. Специализируюсь на разработке интуитивных и 
              эффективных решений для бизнеса, развлечений и повседневных задач.
            </p>
            <p>
              Моя философия — писать чистый, поддерживаемый код и создавать продукты, 
              которые приносят реальную пользу пользователям.
            </p>
          </div>
          
          <div className={styles.aboutActions}>
            <Link href="/about" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>Подробнее обо мне</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
            
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={openModal}>
              <i className="fas fa-file-download"></i>
              <span>Резюме</span>
            </button>
          </div>
        </div>
      </div>
      
      <ResumeModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}