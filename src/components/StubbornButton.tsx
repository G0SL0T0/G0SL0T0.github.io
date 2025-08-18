// src/components/StubbornButton.tsx
'use client';
import { useState, useEffect, useRef } from 'react';

// Функции для работы с cookie
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Проверка, истек ли срок действия cookie
const isCookieExpired = (cookieValue: string): boolean => {
  try {
    const timestamp = parseInt(cookieValue);
    const now = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return (now - timestamp) > oneDayInMs;
  } catch (e) {
    return true; // Если не удалось распарсить, считаем истекшим
  }
};

export default function StubbornButton() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isStopped, setIsStopped] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const stopButtonRef = useRef<HTMLButtonElement>(null);

  // Устанавливаем флаг, что компонент монтирован на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Проверяем cookie при монтировании компонента
  useEffect(() => {
    if (!isClient) return;

    // Проверяем, поймана ли кнопка
    const caughtCookie = getCookie('stubbornButtonCaught');
    if (caughtCookie === 'true') {
      setIsHidden(true);
      return;
    }

    // Проверяем, была ли кнопка скрыта
    const closedCookie = getCookie('stubbornButtonClosed');
    if (closedCookie) {
      // Если cookie истек, удаляем его и показываем кнопку
      if (isCookieExpired(closedCookie)) {
        document.cookie = 'stubbornButtonClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    } else {
      setIsHidden(false);
    }
  }, [isClient]);

  // Движение кнопки
  const moveButton = () => {
    if (isStopped || isHidden) return;
    
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    setPosition({ x: newX, y: newY });
  };

  // Обработчик наведения на кнопку
  const handleMouseOver = () => {
    if (!isStopped && !isHidden) {
      moveButton();
    }
  };

  // Обработчик нажатия на кнопку (поймали)
  const handleClick = () => {
    setShowSpoiler(true);
    // Устанавливаем cookie, что кнопка поймана
    setCookie('stubbornButtonCaught', 'true', 365); // На год
    
    // Через 3 секунды скрываем кнопку
    setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  };

  // Обработчик нажатия на кнопку остановки
  const handleStopClick = () => {
    setShowConfirm(true);
  };

  // Подтверждение остановки и скрытия
  const confirmStop = () => {
    setIsStopped(true);
    setShowConfirm(false);
    
    // Устанавливаем cookie, что кнопка скрыта (текущая дата в виде timestamp)
    setCookie('stubbornButtonClosed', new Date().getTime().toString(), 1); // На день
    
    // Скрываем кнопки
    setTimeout(() => {
      setIsHidden(true);
    }, 1000);
  };

  // Отмена остановки
  const cancelStop = () => {
    setShowConfirm(false);
  };

  // Интервал для движения кнопки
  useEffect(() => {
    if (!isStopped && !isHidden && isClient) {
      const interval = setInterval(moveButton, 2000);
      return () => clearInterval(interval);
    }
  }, [isStopped, isHidden, isClient]);

  // Если кнопка скрыта или не на клиенте, не рендерим компонент
  if (!isClient || isHidden) {
    return null;
  }

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
          opacity: isStopped ? 0.7 : 1,
          transition: isStopped ? 'all 0.5s ease' : 'none',
        }}
        onMouseOver={handleMouseOver}
        onClick={handleClick}
        title={isStopped ? "Я остановился" : "Не пытайся..."}
      >
        🏃‍♂️ Поймай меня, если сможешь!
      </button>
      
      <button
        ref={stopButtonRef}
        id="stop-button"
        className="stop-button"
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 1001,
        }}
        onClick={handleStopClick}
        title="Остановить убегающую кнопку"
      >
        ✖️
      </button>
      
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <h3>Подтверждение</h3>
            <p>Вы уверены, что хотите скрыть кнопку на сегодня?</p>
            <div className="confirm-buttons">
              <button onClick={confirmStop} className="confirm-yes">
                Да, скрыть
              </button>
              <button onClick={cancelStop} className="confirm-no">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showSpoiler && (
        <div id="spoiler-modal" className="spoiler-modal">
          <div className="spoiler-content">
            <h3>🤯 Ты всё-таки поймал меня?!</h3>
            <p>Невероятно... вот твой приз:</p>
            <pre><code>console.log("🏆 Ты победил(а) систему!")</code></pre>
            <button onClick={() => setShowSpoiler(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
}