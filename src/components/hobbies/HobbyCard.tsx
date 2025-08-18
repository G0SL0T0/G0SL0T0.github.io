// src/components/hobbies/HobbyCard.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Hobby } from '@/types/hobby';
import { useState } from 'react';

interface HobbyCardProps {
  hobby: Hobby;
}

const HobbyCard = ({ hobby }: HobbyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Получаем уникальные стили для каждого хобби
  const getHobbyStyles = () => {
    switch(hobby.id) {
      case 'games':
        return {
          iconBg: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
          buttonBg: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
          accentColor: '#FF6B6B',
          icon: 'fas fa-gamepad'
        };
      case 'books':
        return {
          iconBg: 'linear-gradient(135deg, #4D96FF, #6BAAFF)',
          buttonBg: 'linear-gradient(135deg, #4D96FF, #6BAAFF)',
          accentColor: '#4D96FF',
          icon: 'fas fa-book'
        };
      case 'electronics':
        return {
          iconBg: 'linear-gradient(135deg, #6BCB77, #8DD994)',
          buttonBg: 'linear-gradient(135deg, #6BCB77, #8DD994)',
          accentColor: '#6BCB77',
          icon: 'fas fa-microchip'
        };
      case 'microbiology':
        return {
          iconBg: 'linear-gradient(135deg, #9C51E0, #B794F6)',
          buttonBg: 'linear-gradient(135deg, #9C51E0, #B794F6)',
          accentColor: '#9C51E0',
          icon: 'fas fa-microscope'
        };
      case 'cybersecurity':
        return {
          iconBg: 'linear-gradient(135deg, #FFD93D, #FFE066)',
          buttonBg: 'linear-gradient(135deg, #FFD93D, #FFE066)',
          accentColor: '#FFD93D',
          icon: 'fas fa-shield-alt'
        };
      case 'gamedev':
        return {
          iconBg: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
          buttonBg: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
          accentColor: '#FF6B6B',
          icon: 'fas fa-code'
        };
      default:
        return {
          iconBg: 'linear-gradient(135deg, #00f5ff, #ff007a)',
          buttonBg: 'linear-gradient(135deg, #00f5ff, #ff007a)',
          accentColor: '#00f5ff',
          icon: 'fas fa-star'
        };
    }
  };

  const styles = getHobbyStyles();

  return (
    <div 
      className={`hobby-card hobby-card-${hobby.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hobby-image-container">
        <Image 
          src={hobby.image} 
          alt={hobby.title} 
          fill
          className="hobby-image"
        />
        <div className="hobby-overlay"></div>
        <div className="hobby-icon" style={{ background: styles.iconBg }}>
          <i className={styles.icon}></i>
        </div>
        <div className="hobby-badge">{hobby.title}</div>
      </div>
      <div className="hobby-content">
        <div className="hobby-header">
          <h2>{hobby.title}</h2>
        </div>
        
        {/* Красивая строка с названием хобби и статистикой */}
        <div className="hobby-info-row">
          <div className="hobby-info-item">
            <div className="info-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="info-text">
              {hobby.highlight}
            </div>
          </div>
          <div className="hobby-info-item">
            <div className="info-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <div className="info-text">
              {hobby.stats}
            </div>
          </div>
        </div>
        
        {hobby.description && (
          <p className="hobby-description">{hobby.description}</p>
        )}
        
        <Link 
          href={hobby.link} 
          className="hobby-button"
          style={{ background: styles.buttonBg }}
        >
          Подробнее
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default HobbyCard;