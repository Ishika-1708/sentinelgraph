
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RepoDetails, WorkspaceTab } from '../types';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import GraphView from './GraphView';
import ThoughtStream from './ThoughtStream';
import { analyzeArchitecture } from '../services/geminiService';
import {
  Activity,
  Box,
  ShieldCheck,
  AlertTriangle,
  Zap
} from 'lucide-react';

// StatCard component for dashboard metrics
const StatCard = ({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) => (
  <div className="p-6 border border-gray-100 bg-white group hover:border-black transition-all cursor-default">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">{label}</span>
      <div className="p-2 bg-gray-50 text-gray-400 group-hover:text-black transition-all">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-black uppercase tracking-tighter text-black">{value}</div>
  </div>
);

interface WorkspaceProps {
  repoDetails: RepoDetails;
}

const Workspace: React.FC<WorkspaceProps> = ({ repoDetails }) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('graph');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Effect to trigger architecture analysis on component mount or criteria change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await analyzeArchitecture(repoDetails.url, repoDetails.intent);
        setData(result);
      } catch (e) {
        console.error("Analysis failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [repoDetails.url, repoDetails.intent]);

  // Content rendering switcher based on the active tab
  const graphData = useMemo(() => {
    if (!data || !Array.isArray(data.nodes)) return { nodes: [], links: [] };

    const rawNodeIds = new Set(data.nodes.map((n: any) => n.id));
    const links = data.nodes.flatMap((n: any) =>
      (n.imports || [])
        .filter((target: string) => rawNodeIds.has(target))
        .map((target: string) => ({ source: n.id, target }))
    );

    const connectedNodeIds = new Set();
    links.forEach((l: any) => {
      connectedNodeIds.add(l.source);
      connectedNodeIds.add(l.target);
    });

    const nodes = data.nodes
      .filter((n: any) => connectedNodeIds.has(n.id))
      .map((n: any) => ({
        id: n.id,
        label: n.label,
        path: n.path ?? n.label ?? n.id,
        health: n.health,
        type: n.type,
        val: n.val ?? n.complexity ?? 1,
      }));

    return { nodes, links };
  }, [data]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white">
          <div className="w-24 h-[1px] bg-gray-100 mb-8 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-[#1ABC9C]"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-gray-400">Synthesizing Architectural Map</h2>
        </div>
      );
    }

    switch (activeTab) {
      case 'graph':
        return (
          <div className="flex-1 min-h-[70vh]">
            <GraphView data={graphData} onNodeClick={setSelectedNode} />
          </div>
        );
      case 'thoughts':
        return <ThoughtStream thoughts={data?.thoughts || []} />;
      case 'overview':
        return (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Components" value={data?.nodes?.length || 0} icon={<Box className="w-4 h-4" />} />
            <StatCard label="Violations" value={data?.nodes?.filter((n: any) => n.health === 'violation').length || 0} icon={<AlertTriangle className="w-4 h-4 text-red-500" />} />
            <StatCard label="Optimized" value={data?.nodes?.filter((n: any) => n.health === 'optimized').length || 0} icon={<ShieldCheck className="w-4 h-4 text-green-500" />} />
            <StatCard label="Health Score" value="84%" icon={<Activity className="w-4 h-4" />} />
          </div>
        );
      case 'blueprint':
        return (
          <div className="p-8 max-w-4xl">
            <h3 className="text-sm font-bold uppercase tracking-tight text-gray-800 mb-6">Refactor Blueprint</h3>
            <div className="space-y-6">
              {data?.blueprint?.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-6 p-6 border border-gray-100 bg-white">
                  <div className="text-4xl font-black text-gray-700">{String(idx + 1).padStart(2, '0')}</div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight text-gray-800 mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-gray-400 uppercase tracking-widest text-[10px] font-bold">
            <div className="mb-4">Module Under Construction</div>
            <Zap className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="pl-16 md:pl-64 flex flex-col min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <TopNav repoUrl={repoDetails.url} />
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {renderContent()}

          {/* Detail Overlay for selected nodes */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="absolute top-0 right-0 w-80 h-full bg-white border-l border-gray-100 z-30 p-6 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-8">
                  <h3 className="font-black uppercase tracking-tighter text-2xl">{selectedNode.data.label}</h3>
                  <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-black">✕</button>
                </div>
                <div className="space-y-6">
                  <section>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Health Status</label>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${selectedNode.data.health === 'violation' ? 'red' : 'blue'}-500`} />
                      <span className="text-sm font-bold uppercase">{selectedNode.data.health}</span>
                    </div>
                  </section>
                  <section>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Module Type</label>
                    <span className="text-xs bg-gray-50 px-2 py-1 border border-gray-100">{selectedNode.data.type}</span>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
