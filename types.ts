
export interface ThroughLineData {
  interests: string;
  competencies: string;
  characterTraits: string;
}

export interface MissionVisionData {
  missions: string[];
  visions: string[];
}

export interface BrandEquityData {
  selfPerception: string;
  externalFeedback: string;
  analysis: string;
}

export interface ValuePropositionData {
  background: string;
  brainstorming: {
    targetAudiences: string[];
    uniqueValues: string[];
    competitivePeers: string[];
    distinctiveSkills: string[];
  };
  positioningStatements: string[];
  explanation: string;
}

export interface BrandingData {
  throughLine: {
    inputs: ThroughLineData;
    analysis: string;
    finalStatement: string;
  };
  missionVision: MissionVisionData;
  brandEquity: BrandEquityData;
  valueProposition: ValuePropositionData;
}

export enum AppStep {
  DefinePurpose = 'Define Your Purpose',
  AuditEquity = 'Audit Your Personal Brand Equity',
  ConstructNarrative = 'Construct Your Personal Narrative',
  EmbodyBrand = 'Embody Your Brand',
  CommunicateStory = 'Communicate Your Brand Story',
  SocializeBrand = 'Socialize Your Brand',
  Reevaluate = 'Reevaluate and Adjust Your Brand',
}
