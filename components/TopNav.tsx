
import React from 'react';
import { Search, Bell, User, ExternalLink } from 'lucide-react';

interface TopNavProps {
  repoUrl: string;
}

const TopNav: React.FC<TopNavProps> = ({ repoUrl }) => {
  return (
    <header className="h-14 border-b border-gray-100 bg-white sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="bg-gray-50 px-2 py-0.5 rounded border border-gray-100">REPOSITORY</span>
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-1">
            {repoUrl.replace('https://github.com/', '')}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search architecture..."
            className="pl-9 pr-4 py-1.5 bg-gray-50 border-none rounded-none text-xs focus:ring-1 focus:ring-[#1ABC9C] w-48 md:w-64 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-black transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/10">
            <User className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
