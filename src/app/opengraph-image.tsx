import { ImageResponse } from "next/og";

import { pillars } from "@/lib/services";

export const alt =
  "Scientific-Scribe — research support, scoped like a protocol. Four pillars, fourteen services.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: "56px 64px",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: "-0.04em" }}>
              Scientific
            </div>
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#00b4d8",
                marginTop: 8,
              }}
            />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: "-0.04em" }}>
              Scribe
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A5A5A5",
            }}
          >
            Academic research support
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 660,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 15,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00b4d8",
                marginBottom: 22,
              }}
            >
              14 services / 4 pillars
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 74,
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.052em",
              }}
            >
              Research support, scoped like a protocol.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 21,
                lineHeight: 1.45,
                color: "#A5A5A5",
                maxWidth: 560,
              }}
            >
              Manuscripts, journal compliance, language and integrity,
              biostatistics. A written brief before work begins.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 330,
              border: "1px solid #2a2a2a",
              background: "#050505",
            }}
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "15px 18px",
                  borderBottom: "1px solid #24232a",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 13,
                    color: "#00b4d8",
                    letterSpacing: "0.08em",
                    width: 24,
                  }}
                >
                  {pillar.number}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontSize: 17, fontWeight: 500 }}>
                    {pillar.shortName}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 11,
                      color: "#A5A5A5",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 3,
                    }}
                  >
                    {pillar.services.length} services
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#A5A5A5",
              }}
            >
              <div style={{ display: "flex" }}>Confidential by default</div>
              <div style={{ display: "flex", color: "#00b4d8" }}>●</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #24232a",
            paddingTop: 18,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#A5A5A5",
          }}
        >
          <div style={{ display: "flex" }}>scientific-scribe.example</div>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ display: "flex" }}>Find your path</div>
            <div style={{ display: "flex" }}>Estimate</div>
            <div style={{ display: "flex" }}>Scope check</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
