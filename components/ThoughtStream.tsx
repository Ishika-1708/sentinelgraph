
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, AlertCircle, CheckCircle, Flame } from 'lucide-react';
import { Thought } from '../types';

interface ThoughtStreamProps {
  thoughts: any[];
}

const ThoughtStream: React.FC<ThoughtStreamProps> = ({ thoughts }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest">Thought Signature</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400">LIVE REASONING</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {thoughts.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group"
            >
              <div className="flex gap-3">
                <div className="mt-1">
                  {t.level === 'error' ? <Flame className="w-4 h-4 text-red-500" /> :
                   t.level === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-500" /> :
                   t.level === 'success' ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                   <Info className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold uppercase tracking-tight mb-1">{t.message}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t.details || 'Analyzing component isolation and dependency strictness...'}
                  </p>
                </div>
              </div>
              {idx < thoughts.length - 1 && (
                <div className="ml-2 mt-4 w-[1px] h-4 bg-gray-100" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThoughtStream;
