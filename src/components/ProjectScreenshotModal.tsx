// src/components/ProjectScreenshotModal.tsx
import { useEffect } from 'react';

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
    } else {
      document.body.style.overflow = '';
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
      <span className="close" onClick={onClose}>&times;</span>
      <img id="modalImg" src={imageSrc} alt="Full-size screenshot" />
    </div>
  );
};

export default ProjectScreenshotModal;