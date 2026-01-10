
export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: string; // e.g., Blood Test, X-Ray
  title: string;
  analysis?: AIAnalysis;
  fileName: string;
}

export interface AIAnalysis {
  summary: string;
  abnormalValues: { parameter: string; value: string; range: string; note: string }[];
  riskPrediction: {
    level: RiskLevel;
    explanation: string;
    nextSteps: string[];
  };
}

export interface Reminder {
  id: string;
  type: 'medication' | 'appointment';
  title: string;
  time: string;
  frequency: string;
  isActive: boolean;
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi';
