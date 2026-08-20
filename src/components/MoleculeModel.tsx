"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Atom {
  position: THREE.Vector3;
  color: string;
  radius: number;
}

interface Bond {
  from: number;
  to: number;
}

export function MoleculeModel() {
  const groupRef = useRef<THREE.Group>(null);

  const { atoms, bonds } = useMemo(() => {
    const a: Atom[] = [
      { position: new THREE.Vector3(0, 0, 0), color: "#2cb1bc", radius: 0.35 },
      { position: new THREE.Vector3(1.5, 0.5, 0), color: "#14919b", radius: 0.28 },
      { position: new THREE.Vector3(-1.2, 0.8, 0.5), color: "#38bec9", radius: 0.28 },
      { position: new THREE.Vector3(0.3, 1.4, -0.8), color: "#2cb1bc", radius: 0.32 },
      { position: new THREE.Vector3(-0.8, -1.0, 0.6), color: "#87eaf2", radius: 0.25 },
      { position: new THREE.Vector3(1.0, -1.2, -0.5), color: "#14919b", radius: 0.3 },
      { position: new THREE.Vector3(2.2, 1.2, 0.3), color: "#bef8fd", radius: 0.22 },
    ];
    const b: Bond[] = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 1, to: 6 },
      { from: 3, to: 5 },
    ];
    return { atoms: a, bonds: b };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {atoms.map((atom, i) => (
        <mesh key={`atom-${i}`} position={atom.position}>
          <sphereGeometry args={[atom.radius, 16, 16]} />
          <meshStandardMaterial
            color={atom.color}
            emissive={atom.color}
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}
      {bonds.map((bond, i) => {
        const start = atoms[bond.from].position;
        const end = atoms[bond.to].position;
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(end, start);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        );
        return (
          <mesh key={`bond-${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.06, 0.06, len, 8]} />
            <meshStandardMaterial color="#627d98" emissive="#627d98" emissiveIntensity={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}
