// src/components/ui/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  asChild?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Button = ({ 
  children, 
  className = '', 
  variant = 'default', 
  asChild = false,
  disabled = false,
  style,
  onClick,
  ...props 
}: ButtonProps) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    ghost: 'bg-transparent hover:bg-gray-100'
  };
  
  // Добавляем класс для отключенной кнопки
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;
  
  if (asChild) {
    return (
      <div className={combinedClasses} style={style} {...props}>
        {children}
      </div>
    );
  }
  
  return (
    <button 
      className={combinedClasses} 
      style={style}
      onClick={disabled ? undefined : onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;