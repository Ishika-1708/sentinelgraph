
import React, { useMemo, useRef, useEffect } from 'react';
import ForceGraph3D, { ForceGraphMethods, LinkObject, NodeObject } from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

interface GraphViewProps {
  data: { nodes: NodeObject[]; links: LinkObject[] } | null;
  onNodeClick?: (node: NodeObject) => void;
}

const HEALTH_COLOR: Record<string, string> = {
  healthy: '#4ade80',
  violation: '#f87171',
  warning: '#fbbf24',
  optimized: '#2dd4bf',
};

const GraphView: React.FC<GraphViewProps> = ({ data, onNodeClick }) => {
  const graphRef = useRef<ForceGraphMethods>(null);

  const graphData = useMemo(() => data ?? { nodes: [], links: [] }, [data]);

  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0) {
        graphRef.current.zoomToFit(400, 40);
    }
  }, [graphData]);

  const nodeLabel = (node: NodeObject) => {
    const path = (node as any).path || (node as any).label || (node as any).id || '';
    const filename = typeof path === 'string' ? path.split('/').pop() || path : '';
    return `${filename}\n${path}`;
  };

  const nodeColor = (node: NodeObject) => {
    const health = (node as any).health as string | undefined;
    return HEALTH_COLOR[health ?? ''] ?? '#ffffff';
  };

  const nodeVal = (node: NodeObject) => {
    const val = (node as any).val ?? (node as any).complexity;
    return typeof val === 'number' ? Math.max(val, 1) : 1;
  };

  const nodeLabelObject = (node: NodeObject) => {
    const label = (node as any).label || (node as any).id || '';
    const sprite = new SpriteText(label);
    sprite.color = '#8FB5FF';
    sprite.textHeight = 6;
    const val = nodeVal(node);
    sprite.position.set(0, val + 4, 0);
    return sprite;
  };

  return (
    <div className="relative w-full h-[70vh] bg-white">
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={nodeLabel}
        nodeColor={nodeColor}
        nodeVal={nodeVal}
        nodeThreeObject={nodeLabelObject}
        nodeThreeObjectExtend={true}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkOpacity={0.6}
        onNodeClick={(node) => onNodeClick?.(node)}
      />
    </div>
  );
};

export default GraphView;
