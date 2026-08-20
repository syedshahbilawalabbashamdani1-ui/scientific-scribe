"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const DnaHelix = dynamic(
  () => import("./DnaHelix").then((m) => m.DnaHelix),
  { ssr: false }
);

export function HeroDna() {
  return (
    <div className="w-full max-w-[480px] aspect-square sm:aspect-[4/5] lg:aspect-square relative">
      <div className="absolute inset-0">
        <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-3, -3, 2]} intensity={0.5} color="#2cb1bc" />
          <DnaHelix />
        </Canvas>
      </div>
    </div>
  );
}
