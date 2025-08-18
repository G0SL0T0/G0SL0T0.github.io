'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  scrollSpeed?: number;
}

const HorizontalScrollContainer = ({ 
  children, 
  scrollSpeed = 3
}: HorizontalScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(scrollSpeed);
  const lastUpdateTimeRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  
  // Обновляем ref при изменении scrollSpeed
  useEffect(() => {
    scrollSpeedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  // Оптимизированный обработчик прокрутки с использованием requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const now = performance.now();
    // Ограничиваем частоту обновлений состояния до 60 раз в секунду
    if (now - lastUpdateTimeRef.current > 16) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft >= maxScrollLeft - 1);
      lastUpdateTimeRef.current = now;
    }
  }, []);

  // Улучшенный обработчик колеса мыши
  const handleWheel = useCallback((e: WheelEvent) => {
    const now = performance.now();
    // Игнорируем события, которые происходят слишком быстро
    if (now - lastWheelTimeRef.current < 50) return;
    lastWheelTimeRef.current = now;
    
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    if (!elementUnderCursor) return;
    
    // Проверяем, находится ли курсор над одной из карточек или над контейнером
    const card = elementUnderCursor.closest('.timeline-card, .future-work-card');
    const isOverContainer = elementUnderCursor.closest('.horizontal-scroll-track');
    
    if (card || isOverContainer) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      // Определяем направление скролла
      const delta = Math.sign(e.deltaY);
      
      // Если мы в начале и пытаемся скроллить влево, или в конце и пытаемся скроллить вправо - ничего не делаем
      if ((delta < 0 && scrollLeft <= 0) || (delta > 0 && scrollLeft >= maxScrollLeft)) {
        return;
      }
      
      // Используем requestAnimationFrame для плавной прокрутки
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        if (containerRef.current) {
          // Увеличиваем скорость скролла для лучшей отзывчивости
          const scrollAmount = e.deltaY * scrollSpeedRef.current * 1.5;
          containerRef.current.scrollLeft += scrollAmount;
        }
      });
    }
  }, []);

  // Оптимизированный обработчик движения мыши - обновляем только карточку под курсором
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    if (!elementUnderCursor) return;
    
    const card = elementUnderCursor.closest('.timeline-card, .future-work-card, .skill-item, .feature');
    
    if (card) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    }
  }, []);

  // Добавляем обработчики для наведения на контейнер
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Инициализация состояния
    handleScroll();
    
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 10000);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
      
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, handleWheel, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`horizontal-scroll-container ${isHovered ? 'hovered' : ''}`}>
      <div 
        ref={containerRef} 
        className="horizontal-scroll-track"
      >
        {children}
      </div>
      
      {!isAtStart && (
        <button 
          className="scroll-indicator left"
          onClick={() => scroll('left')}
          aria-label="Прокрутить влево"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      
      {!isAtEnd && (
        <button 
          className="scroll-indicator right"
          onClick={() => scroll('right')}
          aria-label="Прокрутить вправо"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
      
      {showHint && (
        <div className="scroll-hint">
          <i className="fas fa-mouse"></i>
          <span>Наведите на карточки и используйте колесико мыши</span>
        </div>
      )}
    </div>
  );
};

export default HorizontalScrollContainer;