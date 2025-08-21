// src/components/HobbyCard.tsx
'use client';
import { useState } from 'react';

interface Hobby {
  id: number;
  title: string;
  highlight: string;
  stat: string;
  image: string;
  link: string;
}

interface HobbyCardProps {
  hobby: Hobby;
}

const HobbyCard = ({ hobby }: HobbyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`hobby-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hobby-image-container">
        <img 
          src={hobby.image} 
          alt={hobby.title} 
          className="hobby-image"
        />
        <div className="hobby-overlay"></div>
      </div>
      
      <div className="hobby-content">
        <div className="hobby-header">
          <h3 className="hobby-title">{hobby.title}</h3>
          <div className="hobby-icon">
            <i className={`fas fa-${getHobbyIcon(hobby.title)}`}></i>
          </div>
        </div>
        
        <p className="hobby-highlight">{hobby.highlight}</p>
        
        <div className="hobby-stats">
          <div className="hobby-stat">
            <i className="fas fa-chart-line"></i>
            <span>{hobby.stat}</span>
          </div>
        </div>
        
        <div className="hobby-actions">
          <a href={hobby.link} className="hobby-link">
            <i className="fas fa-external-link-alt"></i>
            <span>Открыть</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Функция для определения иконки по названию увлечения
const getHobbyIcon = (title: string): string => {
  const iconMap: Record<string, string> = {
    'Игры': 'gamepad',
    'Книги': 'book',
    'Электроника': 'microchip',
    'Микробиология': 'microscope',
    'Кибербезопасность': 'shield-alt',
    'Геймдев': 'code'
  };
  
  return iconMap[title] || 'star';
};

export default HobbyCard;