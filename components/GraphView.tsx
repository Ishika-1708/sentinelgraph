
import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge,
  MarkerType 
} from 'reactflow';
import { HEALTH_COLORS } from '../constants';

interface GraphViewProps {
  data: any;
  onNodeClick?: (node: any) => void;
}

const GraphView: React.FC<GraphViewProps> = ({ data, onNodeClick }) => {
  const { nodes: flowNodes, edges: flowEdges } = useMemo(() => {
    if (!data || !data.nodes) return { nodes: [], edges: [] };

    const initialNodes: Node[] = data.nodes.map((n: any, idx: number) => ({
      id: n.id,
      data: { label: n.label, health: n.health, type: n.type },
      position: { x: (idx % 3) * 250, y: Math.floor(idx / 3) * 150 },
      style: {
        background: '#fff',
        color: '#000',
        borderColor: HEALTH_COLORS[n.health as keyof typeof HEALTH_COLORS] || '#000',
        borderWidth: 2,
        borderRadius: 0,
        fontWeight: 'bold',
        fontSize: '12px'
      }
    }));

    const initialEdges: Edge[] = [];
    data.nodes.forEach((n: any) => {
      n.imports?.forEach((targetId: string) => {
        initialEdges.push({
          id: `e-${n.id}-${targetId}`,
          source: n.id,
          target: targetId,
          animated: n.health === 'violation',
          style: { stroke: n.health === 'violation' ? HEALTH_COLORS.violation : '#e5e7eb', strokeWidth: 1.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: n.health === 'violation' ? HEALTH_COLORS.violation : '#e5e7eb',
          },
        });
      });
    });

    return { nodes: initialNodes, edges: initialEdges };
  }, [data]);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodeClick={(_, node) => onNodeClick?.(node)}
        fitView
      >
        <Background color="#f8fafc" gap={20} />
        <Controls />
        <MiniMap 
          nodeStrokeColor={(n) => n.style?.borderColor as string} 
          maskColor="rgba(255, 255, 255, 0.5)" 
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute top-4 right-4 p-4 bg-white border border-gray-100 space-y-2 pointer-events-none text-[10px] font-bold uppercase tracking-wider shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#3B82F6]" /> <span>Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#EF4444]" /> <span>Violation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#F59E0B]" /> <span>Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#10B981]" /> <span>Optimized</span>
        </div>
      </div>
    </div>
  );
};

export default GraphView;
