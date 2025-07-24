
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, rows = 4, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-900">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          rows={rows}
          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-dark sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
    </div>
  );
};
