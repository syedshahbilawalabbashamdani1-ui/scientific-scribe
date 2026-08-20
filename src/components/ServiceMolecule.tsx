"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const MoleculeModel = dynamic(
  () => import("./MoleculeModel").then((m) => m.MoleculeModel),
  { ssr: false }
);

export function ServiceMolecule() {
  return (
    <div className="w-full max-w-[400px] aspect-square relative mx-auto">
      <div className="absolute inset-0">
        <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-3, 2, 3]} intensity={0.5} color="#2cb1bc" />
          <MoleculeModel />
        </Canvas>
      </div>
    </div>
  );
}
