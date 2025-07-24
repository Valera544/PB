
import React, { useState } from 'react';
import { BrandingData, BrandEquityData } from '../../types';
import { geminiService } from '../../services/geminiService';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { StepContent } from './StepContent';

interface AuditEquityStepProps {
  brandingData: BrandingData;
  updateBrandingData: (data: Partial<BrandingData>) => void;
  onComplete: () => void;
}

type SubStep = 'selfAssessment' | 'externalFeedback' | 'analysisResult';

export const AuditEquityStep: React.FC<AuditEquityStepProps> = ({ brandingData, updateBrandingData, onComplete }) => {
  const [subStep, setSubStep] = useState<SubStep>('selfAssessment');
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<Omit<BrandEquityData, 'analysis'>>({
    selfPerception: brandingData.brandEquity.selfPerception || '',
    externalFeedback: brandingData.brandEquity.externalFeedback || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    try {
      const analysis = await geminiService.generateBrandEquityAnalysis(inputs.selfPerception, inputs.externalFeedback);
      updateBrandingData({
        brandEquity: { ...inputs, analysis },
      });
      setSubStep('analysisResult');
    } catch (error) {
      console.error("Failed to generate brand equity analysis:", error);
      alert("There was an error generating your brand equity analysis. Please check the console and try again.");
    }
    setIsLoading(false);
  };

  const isSelfAssessmentValid = inputs.selfPerception.trim().length > 0;
  const isExternalFeedbackValid = inputs.externalFeedback.trim().length > 0;

  return (
    <StepContent>
      {subStep === 'selfAssessment' && (
        <>
          <SectionHeader
            title="Step 2.1: Self-Assessment"
            description="Start by reflecting on your own brand. How do you believe you are currently perceived by your colleagues, managers, and professional network?"
          />
          <Card className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <Textarea
                label="My Current Professional Reputation"
                name="selfPerception"
                id="selfPerception"
                value={inputs.selfPerception}
                onChange={handleInputChange}
                placeholder="e.g., 'I think I'm seen as a reliable and hardworking engineer, but perhaps a bit quiet in large meetings. My manager probably thinks I'm good at execution but wants me to show more leadership...'"
                rows={6}
              />
              <Button onClick={() => setSubStep('externalFeedback')} disabled={!isSelfAssessmentValid}>
                Next: Gather External Feedback
              </Button>
            </div>
          </Card>
        </>
      )}

      {subStep === 'externalFeedback' && (
        <>
          <SectionHeader
            title="Step 2.2: Gather External Feedback"
            description="Collect honest feedback from trusted sources. This could be from performance reviews, LinkedIn recommendations, or direct quotes from conversations with peers and managers. Anonymize if needed."
          />
          <Card className="max-w-3xl mx-auto">
             <div className="space-y-6">
              <Textarea
                label="External Feedback Compilation"
                name="externalFeedback"
                id="externalFeedback"
                value={inputs.externalFeedback}
                onChange={handleInputChange}
                placeholder="e.g., 'From my last performance review: `Excels at complex problem-solving... Could be more proactive in team discussions.` A colleague told me: `You're the person I go to when I need a rock-solid solution.`...'"
                rows={10}
              />
              <div className="flex space-x-4">
                <Button onClick={() => setSubStep('selfAssessment')} variant="secondary">
                  Back
                </Button>
                <Button onClick={handleGenerateAnalysis} isLoading={isLoading} disabled={!isExternalFeedbackValid}>
                  {isLoading ? 'Analyzing...' : 'Generate Brand Equity Audit'}
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
      
      {subStep === 'analysisResult' && (
        <>
          <SectionHeader
            title="Your Brand Equity Audit"
            description="Here's an AI-powered analysis comparing your self-perception with the external feedback you provided."
          />
          <div className="space-y-8 max-w-4xl mx-auto">
             <Card>
                <h3 className="text-lg font-semibold text-brand-text mb-2">AI-Powered Analysis</h3>
                <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">{brandingData.brandEquity.analysis}</div>
            </Card>
            <div className="text-center max-w-xs mx-auto">
                 <Button onClick={onComplete}>Complete Step 2</Button>
            </div>
          </div>
        </>
      )}

    </StepContent>
  );
};
