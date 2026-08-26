"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SHEET_WIDTH = 1.7;
const SHEET_HEIGHT = 2.3;

function useCurlGeometry(): THREE.PlaneGeometry {
  return useMemo(() => {
    const geometry = new THREE.PlaneGeometry(SHEET_WIDTH, SHEET_HEIGHT, 10, 28);
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const halfW = SHEET_WIDTH / 2;
    const halfH = SHEET_HEIGHT / 2;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const edgeT = Math.max(0, (x - halfW * 0.55) / (halfW * 0.45));
      if (edgeT > 0) {
        const alongPage = ((y + halfH) / SHEET_HEIGHT - 0.18) * Math.PI;
        pos.setZ(i, Math.sin(alongPage) * 0.16 * edgeT * edgeT);
      }
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

function PlainSheet({ index }: { index: number }) {
  const tilt = [0.02, -0.03, 0.015][index % 3];
  return (
    <mesh position={[0, index * 0.022, 0]} rotation={[0, 0, tilt]}>
      <planeGeometry args={[SHEET_WIDTH, SHEET_HEIGHT]} />
      <meshStandardMaterial color="#E8E4D9" roughness={0.9} metalness={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TopSheet() {
  const geometry = useCurlGeometry();
  return (
    <mesh geometry={geometry} position={[0, 3 * 0.022, 0]} rotation={[0, 0, -0.02]}>
      <meshStandardMaterial color="#F4F2EC" roughness={0.9} metalness={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Stack({ inViewRef }: { inViewRef: React.RefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame(({ clock }) => {
    if (!inViewRef.current || !groupRef.current || reducedRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.02;
  });

  return (
    <group ref={groupRef} rotation={[-0.55, 0.12, 0]}>
      {[0, 1, 2].map((i) => (
        <PlainSheet key={i} index={i} />
      ))}
      <TopSheet />
    </group>
  );
}

export default function ManuscriptStack() {
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
        camera={{ position: [0, 0.6, 3.1], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} />
        <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#B08A3E" />
        <Stack inViewRef={inViewRef} />
      </Canvas>
    </div>
  );
}
