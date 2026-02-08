
export type AppState = 'landing' | 'ingestion' | 'workspace';

export type WorkspaceTab = 
  | 'overview' 
  | 'input' 
  | 'graph' 
  | 'thoughts' 
  | 'blueprint' 
  | 'sandbox' 
  | 'pr-manager' 
  | 'settings' 
  | 'help';

export interface RepoDetails {
  url: string;
  intent: string;
}

export interface NodeData {
  label: string;
  health: 'healthy' | 'violation' | 'warning' | 'optimized';
  type: string;
  imports: string[];
}

export interface Thought {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: string;
}

export interface BlueprintStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}
