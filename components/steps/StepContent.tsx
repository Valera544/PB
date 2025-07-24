
import React from 'react';

interface StepContentProps {
  children: React.ReactNode;
}

export const StepContent: React.FC<StepContentProps> = ({ children }) => {
  return <div className="mt-12">{children}</div>;
};
