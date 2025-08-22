// src/components/hobbies/HobbyCard.tsx - обновленная версия
'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hobby } from '@/types/hobby';
import styles from './HobbyCard.module.css';
import { getHobbyStyles } from './hobbyStyles';

interface HobbyCardProps {
  hobby: Hobby;
}

const HobbyCard = memo(({ hobby }: HobbyCardProps) => {
  const stylesConfig = getHobbyStyles(hobby.id);

  return (
    <div 
      className={`${styles.hobbyCard} ${styles[`hobbyCard-${hobby.id}`]}`}
      style={{ '--accent-color': stylesConfig.accentColor } as React.CSSProperties}
    >
      <div className={styles.hobbyImageContainer}>
        <Image 
          src={hobby.image} 
          alt={hobby.title} 
          width={350}
          height={200}
          className={styles.hobbyImage}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className={styles.hobbyOverlay}></div>
        <div className={styles.hobbyIcon} style={{ background: stylesConfig.iconBg }}>
          <i className={stylesConfig.icon}></i>
        </div>
        <div className={styles.hobbyBadge}>{hobby.title}</div>
      </div>
      
      <div className={styles.hobbyContent}>
        <div className={styles.hobbyHeader}>
          <h2>{hobby.title}</h2>
        </div>
        
        <div className={styles.hobbyInfoRow}>
          <div className={styles.hobbyInfoItem}>
            <div className={styles.infoIcon}>
              <i className="fas fa-star"></i>
            </div>
            <div className={styles.infoText}>
              {hobby.highlight}
            </div>
          </div>
          <div className={styles.hobbyInfoItem}>
            <div className={styles.infoIcon}>
              <i className="fas fa-chart-bar"></i>
            </div>
            <div className={styles.infoText}>
              {hobby.stats}
            </div>
          </div>
        </div>
        
        {hobby.description && (
          <p className={styles.hobbyDescription}>{hobby.description}</p>
        )}
        
        <Link 
          href={hobby.link} 
          className={styles.hobbyButton}
          style={{ 
            background: stylesConfig.buttonBg,
            boxShadow: `0 4px 20px ${stylesConfig.accentColor}40`
          }}
        >
          Подробнее
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
});

HobbyCard.displayName = 'HobbyCard';

export default HobbyCard;