"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DnaHelix() {
  const groupRef = useRef<THREE.Group>(null);

  const { strand1, strand2, connectors } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const conns: [THREE.Vector3, THREE.Vector3][] = [];
    const turns = 3;
    const pointsPerTurn = 20;
    const total = turns * pointsPerTurn;
    const height = 6;
    const radius = 1;

    for (let i = 0; i <= total; i++) {
      const t = i / total;
      const angle = t * turns * Math.PI * 2;
      const y = t * height - height / 2;

      s1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      s2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));

      if (i % 5 === 0 && i > 0) {
        conns.push([s1[s1.length - 1], s2[s2.length - 1]]);
      }
    }
    return { strand1: s1, strand2: s2, connectors: conns };
  }, []);

  const strandCurve1 = useMemo(() => new THREE.CatmullRomCurve3(strand1), [strand1]);
  const strandCurve2 = useMemo(() => new THREE.CatmullRomCurve3(strand2), [strand2]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry args={[strandCurve1, 64, 0.06, 8, false]} />
        <meshStandardMaterial color="#2cb1bc" emissive="#2cb1bc" emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <tubeGeometry args={[strandCurve2, 64, 0.06, 8, false]} />
        <meshStandardMaterial color="#38bec9" emissive="#38bec9" emissiveIntensity={0.3} />
      </mesh>
      {connectors.map(([start, end], i) => {
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(end, start);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        );
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.03, 0.03, len, 6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#87eaf2" : "#bef8fd"}
              emissive={i % 2 === 0 ? "#87eaf2" : "#bef8fd"}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
