
export interface Slide {
  title: string;
  content: string[];
  imagePrompt?: string;
  accentColor?: string;
}

export interface Presentation {
  id: string;
  mainTitle: string;
  subtitle: string;
  slides: Slide[];
  createdAt: string;
  summary?: string; // IA generated summary of the project
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: User | null;
  loading: boolean;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  VIEWING = 'VIEWING',
  ERROR = 'ERROR'
}

export type ValidationStatus = 'idle' | 'valid' | 'invalid' | 'warning';
