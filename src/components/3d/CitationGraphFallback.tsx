import { graphEdges, graphNodes } from "@/lib/graph-layout";

const REF_COLORS = { citation: "#3557A6", graphite: "#5B5F73" };

export function CitationGraphFallback() {
  return (
    <svg
      viewBox="-6 -6 12 12"
      className="h-full w-full"
      role="img"
      aria-label="Citation network diagram loading"
      preserveAspectRatio="xMidYMid meet"
    >
      {graphEdges.map((edge, i) => (
        <line
          key={`e-${i}`}
          x1={graphNodes[edge.a].x}
          y1={graphNodes[edge.a].y}
          x2={graphNodes[edge.b].x}
          y2={graphNodes[edge.b].y}
          stroke="#3557A6"
          strokeWidth={0.03}
          opacity={0.25}
        />
      ))}
      {graphNodes.map((node) => (
        <circle
          key={`n-${node.id}`}
          cx={node.x}
          cy={node.y}
          r={node.radius}
          fill={node.kind === "hub" ? "#B08A3E" : REF_COLORS[node.refColor]}
        />
      ))}
      {graphNodes
        .filter((node) => node.kind === "hub")
        .map((node) => (
          <circle
            key={`h-${node.id}`}
            cx={node.x}
            cy={node.y}
            r={node.radius + 0.14}
            fill="none"
            stroke="#B08A3E"
            strokeWidth={0.025}
            opacity={0.5}
          />
        ))}
    </svg>
  );
}
