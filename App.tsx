
import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import IngestionPage from './components/IngestionPage';
import Workspace from './components/Workspace';
import { AppState, RepoDetails } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('landing');
  const [repoDetails, setRepoDetails] = useState<RepoDetails>({ url: '', intent: '' });

  const handleStartAnalysis = useCallback(() => {
    setState('ingestion');
  }, []);

  const handleIngestionComplete = useCallback((details: RepoDetails) => {
    setRepoDetails(details);
    setState('workspace');
  }, []);

  const handleGoBack = useCallback(() => {
    setState('landing');
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-[#1ABC9C] selection:text-white">
      {state === 'landing' && (
        <LandingPage onAnalyze={handleStartAnalysis} />
      )}
      {state === 'ingestion' && (
        <IngestionPage 
          onContinue={handleIngestionComplete} 
          onBack={handleGoBack}
        />
      )}
      {state === 'workspace' && (
        <Workspace repoDetails={repoDetails} />
      )}
    </div>
  );
};

export default App;
