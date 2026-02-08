
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Shield, Zap, Layout } from 'lucide-react';

interface LandingPageProps {
  onAnalyze: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAnalyze }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#1ABC9C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
            <Layout className="text-[#1ABC9C] w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">SentinelGraph</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-[#1ABC9C] transition-colors">Documentation</a>
          <a href="#" className="hover:text-[#1ABC9C] transition-colors">Enterprise</a>
          <a href="#" className="hover:text-[#1ABC9C] transition-colors">Pricing</a>
        </div>
        <button 
          onClick={onAnalyze}
          className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-none hover:bg-[#1ABC9C] transition-all flex items-center gap-2 group"
        >
          Get Started
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-8 pt-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">New: Architecture Reasoning v3</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            Architectural <span className="text-[#1ABC9C]">Intelligence</span> for Modern Teams
          </h1>
          <p className="text-xl text-gray-500 mb-12 font-light leading-relaxed">
            Analyze complex repositories, detect architectural violations, and generate refactor blueprints using advanced reasoning models.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onAnalyze}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white text-lg font-bold hover:bg-[#1ABC9C] transition-all"
            >
              Analyze Repository
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-black text-black text-lg font-bold hover:bg-gray-50 transition-all">
              Try Sample Project
            </button>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 border-t border-gray-100 pt-16">
          <FeatureCard 
            icon={<Box className="text-[#1ABC9C]" />}
            title="Graph Visualization"
            desc="Interactive maps of your system's components and their relationships."
          />
          <FeatureCard 
            icon={<Shield className="text-[#D4AF37]" />}
            title="Clean Architecture"
            desc="Automatic detection of dependency inversions and circular references."
          />
          <FeatureCard 
            icon={<Zap className="text-[#1ABC9C]" />}
            title="Fix Execution"
            desc="Generate and test pull requests that align with your team's best practices."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="group">
    <div className="mb-4 w-12 h-12 flex items-center justify-center border border-gray-200 group-hover:border-[#1ABC9C] transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-light">{desc}</p>
  </div>
);

export default LandingPage;
