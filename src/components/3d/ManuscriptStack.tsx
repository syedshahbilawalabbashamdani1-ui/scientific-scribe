"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const SHEET_WIDTH = 1.7;
const SHEET_HEIGHT = 2.3;
const BAR_COUNT = 14;
const BAR_HEIGHT = 0.025;
const BAR_GAP = 0.1;
const SEGMENT_GAP = 0.04;
const STAGGER = 0.08;
const REVEAL_DURATION = 0.3;

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

function generateBars(): { segments: { width: number; offsetX: number }[]; y: number }[] {
  const bars: { segments: { width: number; offsetX: number }[]; y: number }[] = [];
  const totalH = BAR_COUNT * BAR_HEIGHT + (BAR_COUNT - 1) * BAR_GAP;
  const startY = -totalH / 2;
  const maxTotalWidth = SHEET_WIDTH * 0.75;
  const minTotalWidth = SHEET_WIDTH * 0.55;

  for (let i = 0; i < BAR_COUNT; i++) {
    const totalWidth = minTotalWidth + Math.random() * (maxTotalWidth - minTotalWidth);
    const segmentCount = 2 + Math.floor(Math.random() * 3);
    const totalGapWidth = (segmentCount - 1) * SEGMENT_GAP;
    const availableWidth = Math.max(totalWidth - totalGapWidth, 0.1);

    const cuts: number[] = [0];
    for (let s = 1; s < segmentCount; s++) {
      cuts.push(Math.random());
    }
    cuts.sort((a, b) => a - b);
    cuts.push(1);

    const segments: { width: number; offsetX: number }[] = [];
    let offsetX = -totalWidth / 2;
    for (let s = 0; s < segmentCount; s++) {
      const fraction = cuts[s + 1] - cuts[s];
      const w = availableWidth * fraction;
      segments.push({ width: w, offsetX: offsetX + w / 2 });
      offsetX += w + SEGMENT_GAP;
    }

    const y = startY + i * (BAR_HEIGHT + BAR_GAP);
    bars.push({ segments, y });
  }
  return bars;
}

function PlaceholderSegment({
  width,
  offsetX,
  y,
  trigger,
  delay,
}: {
  width: number;
  offsetX: number;
  y: number;
  trigger: boolean;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !trigger) return;

    const mat = mesh.material as THREE.MeshBasicMaterial;

    if (reducedRef.current) {
      mat.opacity = 0.75;
      mesh.scale.x = 1;
      return;
    }

    mat.opacity = 0;
    mesh.scale.x = 0;

    const proxy = { opacity: 0, scaleX: 0 };
    gsap.to(proxy, {
      opacity: 0.75,
      scaleX: 1,
      duration: REVEAL_DURATION,
      ease: "power2.out",
      delay,
      onUpdate: () => {
        mat.opacity = proxy.opacity;
        mesh.scale.x = proxy.scaleX;
      },
    });
  }, [trigger, delay]);

  return (
    <mesh ref={meshRef} position={[offsetX, y, 0.001]}>
      <planeGeometry args={[width, BAR_HEIGHT]} />
      <meshBasicMaterial color="#13131C" transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TopSheet({ triggerDraw }: { triggerDraw: boolean }) {
  const geometry = useCurlGeometry();
  const [bars] = useState(() => generateBars());

  return (
    <group position={[0, 3 * 0.022, 0]} rotation={[0, 0, -0.02]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#F4F2EC" roughness={1} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      {bars.map((bar, i) =>
        bar.segments.map((seg, j) => (
          <PlaceholderSegment
            key={`${i}-${j}`}
            width={seg.width}
            offsetX={seg.offsetX}
            y={bar.y}
            trigger={triggerDraw}
            delay={(BAR_COUNT - 1 - i) * STAGGER}
          />
        ))
      )}
    </group>
  );
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

function Stack({ inViewRef }: { inViewRef: React.RefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const [triggerDraw, setTriggerDraw] = useState(false);
  const reducedRef = useRef(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame(({ clock }) => {
    if (!inViewRef.current || !groupRef.current || reducedRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.02;

    if (!triggeredRef.current) {
      triggeredRef.current = true;
      setTriggerDraw(true);
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.55, 0.12, 0]}>
      {[0, 1, 2].map((i) => (
        <PlainSheet key={i} index={i} />
      ))}
      <TopSheet triggerDraw={triggerDraw} />
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
