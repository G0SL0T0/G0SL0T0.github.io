// src/hooks/useGradientAnimation.ts
import { useEffect, useRef } from 'react';

export function useGradientAnimation() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHoveredRef = useRef(false);
  const animationPositionRef = useRef(0);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      // Получаем текущее состояние анимации
      const computedStyle = window.getComputedStyle(button);
      const animationName = computedStyle.animationName;
      
      if (animationName !== 'none') {
        // Сохраняем текущую позицию анимации
        const animationDelay = parseFloat(computedStyle.animationDelay) || 0;
        const animationDuration = parseFloat(computedStyle.animationDuration) || 20;
        
        // Рассчитываем текущий прогресс анимации
        const startTime = performance.now() - animationDelay * 1000;
        const elapsedTime = (performance.now() - startTime) % (animationDuration * 1000);
        animationPositionRef.current = elapsedTime / (animationDuration * 1000);
        
        // Меняем направление анимации
        button.style.animationDirection = 'reverse';
        
        // Устанавливаем задержку, чтобы анимация продолжилась с текущей позиции
        const reverseDelay = animationDuration * (1 - animationPositionRef.current);
        button.style.animationDelay = `-${reverseDelay}s`;
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      const button = buttonRef.current;
      if (!button) return;
      
      // Возвращаем исходное направление
      button.style.animationDirection = 'normal';
      
      // Устанавливаем задержку для продолжения анимации с текущей позиции
      const computedStyle = window.getComputedStyle(button);
      const animationDuration = parseFloat(computedStyle.animationDuration) || 20;
      const reverseDelay = animationDuration * animationPositionRef.current;
      button.style.animationDelay = `-${reverseDelay}s`;
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { buttonRef };
}