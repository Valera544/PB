
import React, { useState } from 'react';
import { AppStep, BrandingData } from './types';
import { STEPS, Logo } from './constants';
import { Stepper } from './components/Stepper';
import { DefinePurposeStep } from './components/steps/DefinePurposeStep';
import { AuditEquityStep } from './components/steps/AuditEquityStep';
import { Card } from './components/ui/Card';
import { SectionHeader } from './components/ui/SectionHeader';

const initialBrandingData: BrandingData = {
  throughLine: {
    inputs: { interests: '', competencies: '', characterTraits: '' },
    analysis: '',
    finalStatement: '',
  },
  missionVision: {
    missions: [],
    visions: [],
  },
  brandEquity: {
    selfPerception: '',
    externalFeedback: '',
    analysis: '',
  },
  valueProposition: {
    background: '',
    brainstorming: {
      targetAudiences: [],
      uniqueValues: [],
      competitivePeers: [],
      distinctiveSkills: [],
    },
    positioningStatements: [],
    explanation: '',
  },
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.DefinePurpose);
  const [brandingData, setBrandingData] = useState<BrandingData>(initialBrandingData);

  const updateBrandingData = (data: Partial<BrandingData>) => {
    setBrandingData(prev => ({ 
      ...prev, 
      ...data,
      // Deep merge for nested objects if necessary
      ...(data.throughLine && { throughLine: { ...prev.throughLine, ...data.throughLine } }),
      ...(data.missionVision && { missionVision: { ...prev.missionVision, ...data.missionVision } }),
      ...(data.brandEquity && { brandEquity: { ...prev.brandEquity, ...data.brandEquity } }),
      ...(data.valueProposition && { valueProposition: { ...prev.valueProposition, ...data.valueProposition } }),
    }));
  };
  
  const handleStepCompletion = () => {
    const currentStepIndex = STEPS.indexOf(currentStep);
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    } else {
      alert("Congratulations! You've completed the personal branding journey.");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case AppStep.DefinePurpose:
        return <DefinePurposeStep 
                 brandingData={brandingData} 
                 updateBrandingData={updateBrandingData}
                 onComplete={handleStepCompletion}
               />;
      case AppStep.AuditEquity:
        return <AuditEquityStep
                 brandingData={brandingData}
                 updateBrandingData={updateBrandingData}
                 onComplete={handleStepCompletion}
                />;
      // Future steps would be rendered here
      default:
        return (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-slate-deep">Coming Soon!</h2>
              <p className="text-slate-600 mt-2">The '{currentStep}' step is under construction. Stay tuned!</p>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
       <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Logo />
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          title="Personal Branding AI Coach"
          description="Craft your unique professional identity through a guided, AI-powered journey of self-discovery and strategic planning."
        />
        <div className="max-w-5xl mx-auto">
            <Stepper currentStep={currentStep} />
        </div>
        
        {renderCurrentStep()}
      </main>

      <footer className="border-t border-slate-200 mt-16 py-6">
        <div className="text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Institute of Product Leadership. All rights reserved.</p>
           <p className="mt-1">Powered by Generative AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
