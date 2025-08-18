// src/components/HorizontalScrollSection.tsx
'use client';
import { useEffect, useRef } from 'react';

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
}

const HorizontalScrollSection = ({ children }: HorizontalScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    
    if (!section || !track) return;
    
    const handleScroll = () => {
      // Получаем общую ширину трека
      const trackWidth = track.scrollWidth;
      // Получаем видимую ширину секции
      const sectionWidth = section.clientWidth;
      
      // Проверяем, достигли ли мы конца горизонтального скролла
      if (section.scrollLeft < trackWidth - sectionWidth) {
        // Если нет, предотвращаем вертикальный скролл
        section.style.overflowY = 'hidden';
      } else {
        // Если да, разрешаем вертикальный скролл
        section.style.overflowY = 'auto';
      }
    };
    
    // Добавляем обработчик события скролла
    section.addEventListener('scroll', handleScroll);
    
    // Инициализируем состояние
    handleScroll();
    
    // Очищаем обработчик при размонтировании компонента
    return () => {
      section.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="horizontal-scroll-section"
      style={{ 
        overflowX: 'auto', 
        overflowY: 'hidden',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none' /* IE и Edge */
      }}
    >
      <div ref={trackRef} className="timeline-track">
        {children}
      </div>
    </div>
  );
};

export default HorizontalScrollSection;