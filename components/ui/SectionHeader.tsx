
import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-deep sm:text-3xl">{title}</h2>
      <p className="mt-2 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">{description}</p>
    </div>
  );
};
