"use client";

import dynamic from "next/dynamic";

const ManuscriptStack = dynamic(() => import("./3d/ManuscriptStack"), {
  ssr: false,
  loading: () => (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Manuscript stack loading"
    >
      <rect x="24" y="30" width="52" height="40" fill="#E8E4D9" transform="rotate(-3 50 50)" />
      <rect x="26" y="28" width="52" height="40" fill="#F4F2EC" transform="rotate(2 50 48)" />
    </svg>
  ),
});

export function ManuscriptStackSlot() {
  return (
    <div className="mx-auto aspect-square w-full max-w-[280px]">
      <ManuscriptStack />
    </div>
  );
}
