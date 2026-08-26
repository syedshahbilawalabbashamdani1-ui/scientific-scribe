"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import {
  graphEdges,
  graphNodes,
  nodeEdges,
} from "@/lib/graph-layout";

interface CitationGraphProps {
  serviceNames: string[];
}

const EDGE_IDLE_OPACITY = 0.25;
const EDGE_HOVER_OPACITY = 1;
const EDGE_COLOR = "#3557A6";
const HUB_COLOR = "#B08A3E";
const REF_COLORS = { citation: "#3557A6", graphite: "#5B5F73" };
const SPAWN_DURATION = 1.2;
const SPAWN_STAGGER = 0.012;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setMaterialOpacity(mesh: THREE.Mesh | null, opacity: number) {
  if (!mesh) return;
  const mat = mesh.material;
  if (!Array.isArray(mat)) {
    mat.opacity = opacity;
  }
}

function GraphScene({ serviceNames, inViewRef }: { serviceNames: string[]; inViewRef: React.RefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<Array<THREE.Mesh | null>>([]);
  const edgeRefs = useRef<Array<THREE.Mesh | null>>([]);
  const baseOpacityRef = useRef<number[]>(new Array(graphEdges.length).fill(0));
  const tweensRef = useRef<Array<gsap.core.Tween | gsap.core.Timeline>>([]);
  const callsRef = useRef<Array<gsap.core.Tween>>([]);
  const reducedRef = useRef(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useLayoutEffect(() => {
    reducedRef.current = prefersReducedMotion();
    const reduced = reducedRef.current;
    const kills: Array<gsap.core.Tween | gsap.core.Timeline> = [];
    const calls: Array<gsap.core.Tween> = [];

    graphEdges.forEach((_, i) => {
      setMaterialOpacity(edgeRefs.current[i], reduced ? EDGE_IDLE_OPACITY : 0);
      if (reduced) baseOpacityRef.current[i] = EDGE_IDLE_OPACITY;
    });

    if (reduced) return;

    graphNodes.forEach((node, i) => {
      const mesh = nodeRefs.current[i];
      if (!mesh) return;
      mesh.position.set(0, 0, 0);
      const tween = gsap.to(mesh.position, {
        x: node.x,
        y: node.y,
        z: node.z,
        duration: SPAWN_DURATION,
        ease: "power3.out",
        delay: i * SPAWN_STAGGER,
      });
      kills.push(tween);
    });

    const totalSpawn = SPAWN_DURATION + graphNodes.length * SPAWN_STAGGER;
    const call = gsap.delayedCall(totalSpawn, () => {
      graphEdges.forEach((_, i) => {
        const mat = edgeRefs.current[i];
        if (!mat) return;
        const target = EDGE_IDLE_OPACITY;
        const tween = gsap.to(mat.material as THREE.Material & { opacity: number }, {
          opacity: target,
          duration: 0.5,
          delay: i * 0.008,
          onComplete: () => {
            baseOpacityRef.current[i] = target;
          },
        });
        kills.push(tween);
      });
    });
    calls.push(call);

    tweensRef.current = kills;
    callsRef.current = calls;

    return () => {
      kills.forEach((t) => t.kill());
      calls.forEach((c) => c.kill());
    };
  }, []);

  useEffect(() => {
    const tweens = tweensRef.current;
    const calls = callsRef.current;
    return () => {
      tweens.forEach((t) => t.kill());
      calls.forEach((c) => c.kill());
    };
  }, []);

  useFrame((_, delta) => {
    if (!inViewRef.current || reducedRef.current) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  function brightenAdjacent(index: number) {
    for (const edgeIdx of nodeEdges[index]) {
      const mesh = edgeRefs.current[edgeIdx];
      if (!mesh) continue;
      const mat = mesh.material;
      if (Array.isArray(mat)) continue;
      gsap.to(mat as THREE.Material & { opacity: number }, {
        opacity: EDGE_HOVER_OPACITY,
        duration: 0.15,
        overwrite: true,
      });
    }
  }

  function restoreAdjacent(index: number) {
    for (const edgeIdx of nodeEdges[index]) {
      const mesh = edgeRefs.current[edgeIdx];
      if (!mesh) continue;
      const mat = mesh.material;
      if (Array.isArray(mat)) continue;
      gsap.to(mat as THREE.Material & { opacity: number }, {
        opacity: baseOpacityRef.current[edgeIdx],
        duration: 0.3,
        overwrite: true,
      });
    }
  }

  function handleOver(index: number) {
    return (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(index);
      document.body.style.cursor = "pointer";
      if (!reducedRef.current) {
        const mesh = nodeRefs.current[index];
        if (mesh) {
          gsap.to(mesh.scale, { x: 1.45, y: 1.45, z: 1.45, duration: 0.2, overwrite: true });
        }
        brightenAdjacent(index);
      }
    };
  }

  function handleOut(index: number) {
    return () => {
      setHovered(null);
      document.body.style.cursor = "";
      if (!reducedRef.current) {
        const mesh = nodeRefs.current[index];
        if (mesh) {
          gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3, overwrite: true });
        }
        restoreAdjacent(index);
      }
    };
  }

  const hoveredNode = hovered !== null ? graphNodes[hovered] : null;
  const hoveredLabel =
    hoveredNode === null
      ? ""
      : hoveredNode.kind === "hub"
        ? (serviceNames[hoveredNode.serviceIndex] ?? hoveredNode.label)
        : hoveredNode.label;

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 8]} intensity={1.2} />
      <directionalLight position={[-6, -4, -6]} intensity={0.4} color="#8F6E2E" />
      <group ref={groupRef}>
        {graphNodes.map((node, i) => (
          <mesh
            key={node.id}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            position={[node.x, node.y, node.z]}
            onPointerOver={handleOver(i)}
            onPointerOut={handleOut(i)}
          >
            <sphereGeometry args={[node.radius, 24, 24]} />
            <meshStandardMaterial
              color={node.kind === "hub" ? HUB_COLOR : REF_COLORS[node.refColor]}
              roughness={node.kind === "hub" ? 0.35 : 0.55}
              metalness={node.kind === "hub" ? 0.55 : 0.15}
            />
          </mesh>
        ))}
        {graphEdges.map((edge, i) => (
          <Line
            key={i}
            points={[
              [graphNodes[edge.a].x, graphNodes[edge.a].y, graphNodes[edge.a].z],
              [graphNodes[edge.b].x, graphNodes[edge.b].y, graphNodes[edge.b].z],
            ]}
            color={EDGE_COLOR}
            lineWidth={1}
            transparent
            ref={(el) => {
              edgeRefs.current[i] = el;
            }}
          />
        ))}
        {hoveredNode !== null && (
          <Html
            position={[hoveredNode.x, hoveredNode.y, hoveredNode.z]}
            center
            zIndexRange={[30, 0]}
            className="pointer-events-none"
          >
            <div className="pointer-events-none whitespace-nowrap border border-brass-500 bg-ink-900/95 px-2 py-1 font-mono text-caption text-paper-50">
              {hoveredLabel}
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

export default function CitationGraph({ serviceNames }: CitationGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.02, rootMargin: "80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <GraphScene serviceNames={serviceNames} inViewRef={inViewRef} />
      </Canvas>
    </div>
  );
}
