
import React from 'react';
import { Loader } from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  variant = 'primary',
  children,
  ...props
}) => {
  const baseClasses = 'w-full flex justify-center items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors disabled:opacity-50';
  const variantClasses = {
    primary: 'bg-brand-dark text-white hover:bg-brand-text focus-visible:outline-brand-dark',
    secondary: 'bg-white text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
