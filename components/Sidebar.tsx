
import React, { useState } from 'react';
import { 
  Layout, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Cpu, 
  FileCode, 
  Terminal, 
  GitPullRequest, 
  Settings, 
  HelpCircle,
  Activity
} from 'lucide-react';
import { WorkspaceTab } from '../types';

interface SidebarProps {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: { id: WorkspaceTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Activity className="w-5 h-5" /> },
    { id: 'graph', label: 'Architecture Graph', icon: <Share2 className="w-5 h-5" /> },
    { id: 'thoughts', label: 'Thought Stream', icon: <Cpu className="w-5 h-5" /> },
    { id: 'blueprint', label: 'Refactor Blueprint', icon: <Layout className="w-5 h-5" /> },
  ];

  const bottomItems: { id: WorkspaceTab; label: string; icon: React.ReactNode }[] = [
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      {/* Brand */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <Layout className="text-[#1ABC9C] w-4 h-4" />
            </div>
            <span className="font-black text-sm uppercase tracking-tighter">SentinelGraph</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-50 rounded transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 mt-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none transition-all group ${
              activeTab === item.id 
                ? 'bg-gray-50 text-[#1ABC9C] border-r-2 border-[#1ABC9C]' 
                : 'text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            <div className={activeTab === item.id ? 'text-[#1ABC9C]' : 'text-gray-400 group-hover:text-black'}>
              {item.icon}
            </div>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-2 border-t border-gray-50">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none transition-all group ${
              activeTab === item.id 
                ? 'bg-gray-50 text-[#1ABC9C] border-r-2 border-[#1ABC9C]' 
                : 'text-gray-400 hover:text-black hover:bg-gray-50'
            }`}
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
