
import React, { useState } from 'react';
import { BrandingData, ThroughLineData } from '../../types';
import { geminiService } from '../../services/geminiService';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { StepContent } from './StepContent';

interface DefinePurposeStepProps {
  brandingData: BrandingData;
  updateBrandingData: (data: Partial<BrandingData>) => void;
  onComplete: () => void;
}

type SubStep = 'throughLineInput' | 'throughLineResult' | 'missionVisionResult';

export const DefinePurposeStep: React.FC<DefinePurposeStepProps> = ({ brandingData, updateBrandingData, onComplete }) => {
  const [subStep, setSubStep] = useState<SubStep>('throughLineInput');
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<ThroughLineData>({
    interests: '',
    competencies: '',
    characterTraits: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateThroughLine = async () => {
    setIsLoading(true);
    try {
      const { analysis, finalStatement } = await geminiService.generateThroughLine(inputs);
      const { missions, visions } = await geminiService.generateMissionAndVision(finalStatement);
      
      updateBrandingData({
        throughLine: { inputs, analysis, finalStatement },
        missionVision: { missions, visions }
      });

      setSubStep('throughLineResult');
    } catch (error) {
      console.error("Failed to generate through line:", error);
      alert("There was an error generating your through line. Please check the console and try again.");
    }
    setIsLoading(false);
  };
  
  const isFormValid = inputs.interests.trim() && inputs.competencies.trim() && inputs.characterTraits.trim();

  return (
    <StepContent>
      {subStep === 'throughLineInput' && (
        <>
          <SectionHeader
            title="Identify Your 'Through Line'"
            description="Let's uncover the consistent theme that connects your past, present, and future. This 'through line' is the foundation of your personal brand."
          />
          <Card className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <Textarea
                label="Your Interests"
                name="interests"
                id="interests"
                value={inputs.interests}
                onChange={handleInputChange}
                placeholder="e.g., Reading sci-fi novels, learning about renewable energy, mentoring junior developers, landscape photography..."
                rows={3}
              />
              <Textarea
                label="Your Competencies"
                name="competencies"
                id="competencies"
                value={inputs.competencies}
                onChange={handleInputChange}
                placeholder="e.g., Public speaking, data analysis with Python, leading cross-functional teams, conflict resolution..."
                rows={3}
              />
              <Textarea
                label="Your Character Traits"
                name="characterTraits"
                id="characterTraits"
                value={inputs.characterTraits}
                onChange={handleInputChange}
                placeholder="e.g., Empathetic, resilient, highly organized, curious, calm under pressure..."
                rows={3}
              />
              <Button onClick={handleGenerateThroughLine} isLoading={isLoading} disabled={!isFormValid}>
                {isLoading ? 'Analyzing...' : 'Find My Through Line'}
              </Button>
            </div>
          </Card>
        </>
      )}

      {subStep === 'throughLineResult' && (
        <>
          <SectionHeader
            title="Your Personal Brand Foundation"
            description="Here is the AI's analysis based on your inputs, culminating in your unique 'Through Line' statement."
          />
          <div className="space-y-8 max-w-4xl mx-auto">
             <Card>
                <h3 className="text-lg font-semibold text-brand-text mb-2">Your Through Line</h3>
                <p className="text-xl font-medium text-slate-deep">"{brandingData.throughLine.finalStatement}"</p>
            </Card>
            <Card>
                <h3 className="text-lg font-semibold text-brand-text mb-2">AI Analysis</h3>
                <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">{brandingData.throughLine.analysis}</div>
            </Card>
            <div className="text-center">
                 <Button onClick={() => setSubStep('missionVisionResult')}>Next: Generate Mission & Vision</Button>
            </div>
          </div>
        </>
      )}

       {subStep === 'missionVisionResult' && (
        <>
          <SectionHeader
            title="Your Mission and Vision"
            description="Based on your through line, here are distinct mission and vision statements to guide your purpose."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <h3 className="text-lg font-semibold text-brand-text mb-4">Mission Statements</h3>
              <ul className="space-y-4">
                {brandingData.missionVision.missions.map((mission, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-dark font-bold mr-2">◆</span>
                    <p className="text-slate-700">{mission}</p>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-brand-text mb-4">Vision Statements</h3>
               <ul className="space-y-4">
                {brandingData.missionVision.visions.map((vision, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-dark font-bold mr-2">◆</span>
                     <p className="text-slate-700">{vision}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
           <div className="text-center mt-8 max-w-xs mx-auto">
                 <Button onClick={onComplete}>Complete Step 1</Button>
            </div>
        </>
      )}
    </StepContent>
  );
};
