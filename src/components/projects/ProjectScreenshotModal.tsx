// src/components/projects/ProjectScreenshotModal.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ProjectScreenshotModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const ProjectScreenshotModal = ({ isOpen, imageSrc, onClose }: ProjectScreenshotModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Добавляем класс для анимации
      setTimeout(() => {
        const modal = document.getElementById('imgModal');
        if (modal) {
          modal.classList.add('show');
        }
      }, 10);
    } else {
      document.body.style.overflow = '';
      
      // Удаляем класс для анимации
      const modal = document.getElementById('imgModal');
      if (modal) {
        modal.classList.remove('show');
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="imgModal" 
      className="modal-full" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </div>
      <Image 
        id="modalImg" 
        src={imageSrc} 
        alt="Full-size screenshot"
        width={1200}
        height={800}
        className="object-contain"
      />
    </div>
  );
};

export default ProjectScreenshotModal;