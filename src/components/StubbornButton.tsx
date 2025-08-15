// src/components/StubbornButton.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function StubbornButton() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isStopped, setIsStopped] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    if (isStopped) return;

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseOver = () => {
    if (!isStopped) {
      moveButton();
    }
  };

  const handleClick = () => {
    setShowSpoiler(true);
  };

  const stopButton = () => {
    setIsStopped(true);
  };

  useEffect(() => {
    if (!isStopped) {
      const interval = setInterval(moveButton, 2000);
      return () => clearInterval(interval);
    }
  }, [isStopped]);

  return (
    <>
      <button
        ref={buttonRef}
        id="stubborn-button"
        className="stubborn-button"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
        }}
        onMouseOver={handleMouseOver}
        onClick={handleClick}
        title="Не пытайся..."
      >
        🏃‍♂️ Поймай меня, если сможешь!
      </button>

      <button
        id="stop-button"
        className="stop-button"
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 1001,
        }}
        onClick={stopButton}
        title="Остановить убегающую кнопку"
      >
        ✖️
      </button>

      {showSpoiler && (
        <div id="spoiler-modal" className="spoiler-modal">
          <div className="spoiler-content">
            <h3>🤯 Ты всё-таки поймал меня?!</h3>
            <p>Невероятно... вот твой приз:</p>
            <pre>🏆 Ты победил систему!</pre>
            <button onClick={() => setShowSpoiler(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
}