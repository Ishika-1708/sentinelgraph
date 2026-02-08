
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Upload, Play, ChevronLeft, Target } from 'lucide-react';
import { RepoDetails } from '../types';
import { SAMPLE_INTENTS } from '../constants';

interface IngestionPageProps {
  onContinue: (details: RepoDetails) => void;
  onBack: () => void;
}

const IngestionPage: React.FC<IngestionPageProps> = ({ onContinue, onBack }) => {
  const [url, setUrl] = useState('');
  const [intent, setIntent] = useState('');

  const isFormValid = url.trim() !== '' && intent.trim() !== '';

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 min-h-screen flex flex-col justify-center">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Landing
      </button>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Configure Analysis</h2>

        <div className="space-y-12">
          {/* Section 1: Source */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">01 Repository Source</h3>
            </div>
            <div className="flex flex-col gap-4">
              <input 
                type="text"
                placeholder="https://github.com/organization/repository"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-4 border border-black focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] text-lg font-mono placeholder:text-gray-300"
              />
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">Or</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Local Zip
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Intent */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">02 Intent Alignment</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">What is the primary goal of this architectural audit?</p>
            <textarea 
              placeholder="e.g., I want to ensure that my domain logic doesn't depend on external frameworks..."
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              className="w-full p-4 border border-black h-32 focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] text-lg placeholder:text-gray-300 resize-none"
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              {SAMPLE_INTENTS.map((s) => (
                <button 
                  key={s}
                  onClick={() => setIntent(s)}
                  className="px-3 py-1 bg-gray-50 border border-gray-100 text-xs hover:border-[#1ABC9C] hover:text-[#1ABC9C] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <button 
            disabled={!isFormValid}
            onClick={() => onContinue({ url, intent })}
            className={`w-full py-6 flex items-center justify-center gap-3 text-xl font-black uppercase tracking-tighter transition-all ${
              isFormValid 
                ? 'bg-black text-white hover:bg-[#1ABC9C]' 
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            Start Analysis
            <Play className="w-5 h-5 fill-current" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default IngestionPage;
