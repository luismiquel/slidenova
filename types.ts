
export interface Slide {
  id: string;
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
  summary?: string;
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
  DASHBOARD = 'DASHBOARD',
  EDITING = 'EDITING',
  ERROR = 'ERROR'
}

export type ValidationStatus = 'idle' | 'valid' | 'invalid' | 'warning';
