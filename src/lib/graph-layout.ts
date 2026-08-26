export interface GraphNode {
  id: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  kind: "hub" | "ref";
  refColor: "citation" | "graphite";
  label: string;
  serviceIndex: number;
}

export interface GraphEdge {
  a: number;
  b: number;
}

export const HUB_COUNT = 5;

const REF_COUNT = 27;
export const NODE_COUNT = HUB_COUNT + REF_COUNT;

const REST_LENGTH = 1.6;
const REPULSION = 120;
const SPRING_K = 0.06;
const CENTER_PULL = 0.0025;
const STEP = 0.04;
const MAX_STEP = 0.35;
const ITERATIONS = 200;
const MAX_RADIUS = 5.0;

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SimNode {
  x: number;
  y: number;
  mass: number;
}

function buildLayout(): { nodes: GraphNode[]; edges: GraphEdge[]; nodeEdges: number[][] } {
  const rng = mulberry32(42);

  const sim: SimNode[] = [];
  const hubMass = 2.6;

  for (let i = 0; i < HUB_COUNT; i++) {
    const angle = (i / HUB_COUNT) * Math.PI * 2 - Math.PI / 2 + (rng() - 0.5) * 0.35;
    const r = 2.6 + rng() * 0.8;
    sim.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, mass: hubMass });
  }

  const hubOfRef: number[] = [];
  for (let i = 0; i < REF_COUNT; i++) {
    const hubIdx = i % HUB_COUNT;
    hubOfRef.push(hubIdx);
    const hub = sim[hubIdx];
    const angle = rng() * Math.PI * 2;
    const r = 0.9 + rng() * 1.7;
    sim.push({
      x: hub.x + Math.cos(angle) * r,
      y: hub.y + Math.sin(angle) * r,
      mass: 1,
    });
  }

  const edges: GraphEdge[] = [];
  for (let i = 0; i < REF_COUNT; i++) {
    edges.push({ a: HUB_COUNT + i, b: hubOfRef[i] });
  }
  for (let i = 0; i < HUB_COUNT; i++) {
    edges.push({ a: i, b: (i + 1) % HUB_COUNT });
  }
  for (let i = 0; i < REF_COUNT - 1; i++) {
    if (hubOfRef[i] === hubOfRef[i + 1] && rng() > 0.45) {
      edges.push({ a: HUB_COUNT + i, b: HUB_COUNT + i + 1 });
    }
  }

  const fx = new Float64Array(NODE_COUNT);
  const fy = new Float64Array(NODE_COUNT);

  for (let step = 0; step < ITERATIONS; step++) {
    fx.fill(0);
    fy.fill(0);

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = sim[i].x - sim[j].x;
        const dy = sim[i].y - sim[j].y;
        const distSq = Math.max(dx * dx + dy * dy, 0.05);
        const f = REPULSION / distSq;
        const dist = Math.sqrt(distSq);
        const ux = dx / dist;
        const uy = dy / dist;
        fx[i] += ux * f;
        fy[i] += uy * f;
        fx[j] -= ux * f;
        fy[j] -= uy * f;
      }
    }

    for (const e of edges) {
      const a = sim[e.a];
      const b = sim[e.b];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
      const f = SPRING_K * (dist - REST_LENGTH);
      const ux = (dx / dist) * f;
      const uy = (dy / dist) * f;
      fx[e.b] -= ux;
      fy[e.b] -= uy;
      fx[e.a] += ux;
      fy[e.a] += uy;
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      fx[i] -= sim[i].x * CENTER_PULL;
      fy[i] -= sim[i].y * CENTER_PULL;
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      const vx = Math.max(-MAX_STEP, Math.min(MAX_STEP, fx[i] * STEP / sim[i].mass));
      const vy = Math.max(-MAX_STEP, Math.min(MAX_STEP, fy[i] * STEP / sim[i].mass));
      sim[i].x += vx;
      sim[i].y += vy;
    }
  }

  let maxLen = 0;
  for (const n of sim) maxLen = Math.max(maxLen, Math.hypot(n.x, n.y));
  if (maxLen > MAX_RADIUS) {
    const scale = MAX_RADIUS / maxLen;
    for (const n of sim) {
      n.x *= scale;
      n.y *= scale;
    }
  }

  const nodes: GraphNode[] = sim.map((n, id) => {
    const isHub = id < HUB_COUNT;
    return {
      id,
      x: n.x,
      y: n.y,
      z: (rng() - 0.5) * 1.1,
      radius: isHub ? 0.26 : 0.085 + rng() * 0.05,
      kind: isHub ? ("hub" as const) : ("ref" as const),
      refColor: rng() > 0.42 ? ("citation" as const) : ("graphite" as const),
      label: `[${id + 1}]`,
      serviceIndex: isHub ? id % HUB_COUNT : -1,
    };
  });

  const nodeEdges: number[][] = nodes.map(() => []);
  edges.forEach((e, idx) => {
    nodeEdges[e.a].push(idx);
    nodeEdges[e.b].push(idx);
  });

  return { nodes, edges, nodeEdges };
}

const layout = buildLayout();

export const graphNodes: GraphNode[] = layout.nodes;
export const graphEdges: GraphEdge[] = layout.edges;
export const nodeEdges: number[][] = layout.nodeEdges;
