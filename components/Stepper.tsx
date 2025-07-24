
import React from 'react';
import { AppStep } from '../types';
import { STEPS } from '../constants';

interface StepperProps {
  currentStep: AppStep;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const currentStepIndex = STEPS.indexOf(currentStep);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {STEPS.map((step, stepIdx) => (
          <li key={step} className="md:flex-1">
            {stepIdx <= currentStepIndex ? (
              <div className="group flex flex-col border-l-4 border-brand-dark py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-brand-dark transition-colors ">{`Step ${stepIdx + 1}`}</span>
                <span className="text-sm font-medium">{step}</span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500 transition-colors">{`Step ${stepIdx + 1}`}</span>
                <span className="text-sm font-medium">{step}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
