interface LogoMarkProps {
  variant: "node" | "bracket" | "nib";
  size?: number;
  className?: string;
}

function NodeMark() {
  return (
    <>
      <circle cx={0} cy={0} r={10} fill="var(--logo-fill)" />
      {[0, 120, 240].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <rect
            x={-2.25}
            y={-21}
            width={4.5}
            height={11}
            rx={2.25}
            fill="var(--logo-fill)"
          />
          <circle cx={0} cy={-23} r={4.5} fill="var(--logo-fill)" />
        </g>
      ))}
    </>
  );
}

function BracketMark() {
  return (
    <text
      x={0}
      y={10}
      textAnchor="middle"
      fontFamily="var(--font-mono)"
      fontWeight={700}
      fontSize={34}
      fill="var(--logo-fill)"
      letterSpacing="-0.02em"
    >
      [S]
    </text>
  );
}

function NibMark() {
  return (
    <path
      d="M -15 -22 Q 0 -27 15 -22 L 4 23 Q 0 28 -4 23 Z"
      fill="var(--logo-fill)"
    />
  );
}

export function LogoMark({ variant = "node", size = 24, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-35 -35 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ "--logo-fill": "var(--brass-600)" } as React.CSSProperties}
    >
      <style>{`
        [data-theme="dark"] { --logo-fill: var(--brass-500); }
      `}</style>
      {variant === "node" && <NodeMark />}
      {variant === "bracket" && <BracketMark />}
      {variant === "nib" && <NibMark />}
    </svg>
  );
}
