import { LogoMark } from "@/components/brand/LogoMark";

const VARIANTS = ["node", "bracket", "nib"] as const;
const SIZES = [16, 32, 180] as const;

export default function BrandPreviewPage() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="kicker">Internal</p>
          <h1 className="mt-3 font-display text-heading-md text-foreground sm:text-heading-lg">
            Logo mark preview
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground leading-relaxed">
            Compare all three concepts at favicon, navbar, and hero sizes. The 16px render
            is the critical test — if it blurs into a blob, the mark fails.
          </p>
        </div>

        {/* SVG inline renders at key sizes */}
        <h2 className="mb-6 font-display text-heading-sm text-foreground">
          SVG inline renders
        </h2>
        <div className="mb-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left font-mono text-caption uppercase tracking-widest text-graphite-500">
                  Variant
                </th>
                {SIZES.map((s) => (
                  <th
                    key={s}
                    className="p-3 text-left font-mono text-caption uppercase tracking-widest text-graphite-500"
                  >
                    {s}px
                  </th>
                ))}
                <th className="p-3 text-left font-mono text-caption uppercase tracking-widest text-graphite-500">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((v) => (
                <tr key={v} className="border-b border-border">
                  <td className="p-3 font-mono text-body text-foreground">{v}</td>
                  {SIZES.map((s) => (
                    <td key={s} className="p-3">
                      <div className="flex items-center gap-3">
                        {/* Light background */}
                        <div
                          className="flex items-center justify-center border border-border bg-paper-50"
                          style={{ width: Math.max(s + 16, 48), height: Math.max(s + 16, 48) }}
                        >
                          <LogoMark variant={v} size={s} />
                        </div>
                        {/* Dark background */}
                        <div
                          className="flex items-center justify-center border border-ink-800 bg-ink-900"
                          style={{ width: Math.max(s + 16, 48), height: Math.max(s + 16, 48) }}
                        >
                          <LogoMark variant={v} size={s} />
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="p-3 text-body-sm text-muted-foreground">
                    {v === "node" && "Spokes blur at 16px — use at 32px+"}
                    {v === "bracket" && "Legible at 16px — recommended for favicon"}
                    {v === "nib" && "Reads as generic arrow at small sizes"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rasterized favicon renders */}
        <h2 className="mb-6 font-display text-heading-sm text-foreground">
          Rasterized favicon PNGs (sharp output)
        </h2>
        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          {VARIANTS.map((v) => (
            <div key={v}>
              <p className="mb-3 font-mono text-caption uppercase tracking-widest text-graphite-500">
                {v}
              </p>
              <div className="flex flex-wrap items-end gap-3">
                {[16, 32, 48].map((s) => (
                  <div key={s} className="text-center">
                    <img
                      src={`/brand/${v}/${s}x${s}.png`}
                      width={s}
                      height={s}
                      alt={`${v} ${s}x${s}`}
                      className="border border-border bg-paper-50"
                      style={{ imageRendering: s <= 32 ? "pixelated" : "auto" }}
                    />
                    <p className="mt-1 font-mono text-caption text-graphite-500">
                      {s}
                    </p>
                  </div>
                ))}
                <div className="text-center">
                  <img
                    src={`/brand/${v}/180x180.png`}
                    width={180}
                    height={180}
                    alt={`${v} 180x180`}
                    className="border border-border bg-paper-50"
                  />
                  <p className="mt-1 font-mono text-caption text-graphite-500">
                    180
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* In Navbar context */}
        <h2 className="mb-6 font-display text-heading-sm text-foreground">
          In Navbar context
        </h2>
        <div className="mb-16 rounded-none border border-border bg-background">
          <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <LogoMark variant="node" size={28} />
              <span className="font-display text-heading-xs tracking-tight">
                <span className="text-brass-600 dark:text-brass-500">Scientific</span>{" "}
                <span className="text-foreground">Scribe</span>
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <span className="nav-link">Home</span>
              <span className="nav-link">Services</span>
              <span className="nav-link">About</span>
              <span className="nav-link">Contact</span>
            </div>
          </nav>
        </div>

        {/* Large hero-size comparison */}
        <h2 className="mb-6 font-display text-heading-sm text-foreground">
          Hero size (200px)
        </h2>
        <div className="flex flex-wrap items-center gap-12">
          {VARIANTS.map((v) => (
            <div key={v} className="text-center">
              <div className="mb-3 flex items-center justify-center border border-border bg-paper-50 p-8">
                <LogoMark variant={v} size={200} />
              </div>
              <p className="font-mono text-caption uppercase tracking-widest text-graphite-500">
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
