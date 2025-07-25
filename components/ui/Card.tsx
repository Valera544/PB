
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/80 p-6 ${className}`}>
      {children}
    </div>
  );
};
