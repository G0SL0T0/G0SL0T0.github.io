// src/components/PixelEcosystem.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function PixelEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Простая инициализация холста
    const initCanvas = () => {
      ctx.fillStyle = '#212529';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6c757d';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Пиксельная экосистема', canvas.width/2, canvas.height/2);
    };
    
    initCanvas();
    
    // Обработчики событий для кнопок
    const startButton = document.getElementById('start-game');
    const resetButton = document.getElementById('reset-game');
    
    const handleStart = () => {
      setIsRunning(true);
      ctx.fillStyle = '#28a745';
      ctx.fillText('Симуляция запущена!', canvas.width/2, canvas.height/2);
    };
    
    const handleReset = () => {
      setIsRunning(false);
      initCanvas();
      ctx.fillStyle = '#dc3545';
      ctx.fillText('Нажмите "Запустить" для начала', canvas.width/2, canvas.height/2);
    };
    
    if (startButton) startButton.addEventListener('click', handleStart);
    if (resetButton) resetButton.addEventListener('click', handleReset);
    
    return () => {
      if (startButton) startButton.removeEventListener('click', handleStart);
      if (resetButton) resetButton.removeEventListener('click', handleReset);
    };
  }, [isRunning]);

  return (
    <section className="game-container">
      <div className="game-wrapper">
        <h2>Пиксельная Экосистема</h2>
        <p>Интерактивная симуляция экосистемы с различными сущностями</p>
        
        <div className="game-controls">
          <button id="start-game" className="game-button start">
            <i className="fas fa-play"></i> Запустить
          </button>
          <button id="reset-game" className="game-button reset">
            <i className="fas fa-redo"></i> Сброс
          </button>
        </div>
        
        <canvas 
          ref={canvasRef} 
          width="800" 
          height="400"
          className="game-canvas"
        ></canvas>
        
        <div className="game-instructions">
          <p>Управление: ЛКМ - добавить сущность, ПКМ - удалить сущность</p>
        </div>
      </div>
    </section>
  );
}