"use client";

import { useState } from "react";
import Image from "next/image";

/* ── Shared logo data - exported for the mobile static grid ── */
export const LOGO_DATA = [
  /* Ring 1 - clockwise, r=90 */
  { id: "claude",   file: "claude.png",   size: 36, radius: 90,  speed: 25, dir: "cw"  as const, startAngle: 0,   breathe: 2.5, name: "Claude AI",  desc: "My primary LLM for building" },
  { id: "flutter",  file: "flutter.png",  size: 32, radius: 90,  speed: 25, dir: "cw"  as const, startAngle: 180, breathe: 3.0, name: "Flutter",    desc: "Cross-platform mobile" },
  /* Ring 2 - counter-clockwise, r=150 */
  { id: "n8n",      file: "n8n.png",      size: 32, radius: 150, speed: 40, dir: "ccw" as const, startAngle: 0,   breathe: 3.5, name: "n8n",        desc: "Automation workflows" },
  { id: "vapi",     file: "vapi.png",     size: 28, radius: 150, speed: 40, dir: "ccw" as const, startAngle: 120, breathe: 2.8, name: "Vapi",       desc: "Voice AI agents" },
  { id: "supabase", file: "supabase.png", size: 30, radius: 150, speed: 40, dir: "ccw" as const, startAngle: 240, breathe: 3.2, name: "Supabase",   desc: "Database & backend" },
  /* Ring 3 - clockwise, r=215 */
  { id: "react",    file: "react.png",    size: 34, radius: 215, speed: 60, dir: "cw"  as const, startAngle: 0,   breathe: 2.6, name: "React",      desc: "UI development" },
  { id: "nextjs",   file: "nextjs.png",   size: 32, radius: 215, speed: 60, dir: "cw"  as const, startAngle: 120, breathe: 3.8, name: "Next.js",    desc: "Full-stack web apps" },
  { id: "github",   file: "github.png",   size: 28, radius: 215, speed: 60, dir: "cw"  as const, startAngle: 240, breathe: 3.0, name: "GitHub",     desc: "All my code lives here" },
];

const RING_LINES = [
  { radius: 90,  color: "rgba(127,119,221,0.15)" },
  { radius: 150, color: "rgba(29,158,117,0.15)"  },
  { radius: 215, color: "rgba(127,119,221,0.08)" },
];

const SIZE = 480; // container px - logos at r=215 stay within SIZE/2=240

export default function OrbitalRing() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}>

      {/* Ring circles */}
      {RING_LINES.map((ring) => (
        <div
          key={ring.radius}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: ring.radius * 2,
            height: ring.radius * 2,
            borderRadius: "50%",
            border: `1px solid ${ring.color}`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Center glow dot */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 10, height: 10,
          borderRadius: "50%",
          background: "rgba(127,119,221,0.4)",
          boxShadow: "0 0 18px 6px rgba(127,119,221,0.12)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Orbiting logos */}
      {LOGO_DATA.map((logo) => {
        /* Negative delay = start partway through, giving the startAngle offset */
        const delay = -(logo.startAngle / 360) * logo.speed;
        const isHovered = hoveredId === logo.id;

        return (
          <div
            key={logo.id}
            /* ── Orbit wrapper ── */
            style={{
              position: "absolute",
              top:  `calc(50% - ${logo.size / 2}px)`,
              left: `calc(50% - ${logo.size / 2}px)`,
              width: logo.size,
              height: logo.size,
              /* CSS custom property consumed by @keyframes orbit-cw/ccw */
              ["--r" as string]: `${logo.radius}px`,
              animationName: `orbit-${logo.dir}`,
              animationDuration: `${logo.speed}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${delay}s`,
              animationPlayState: isHovered ? "paused" : "running",
              zIndex: isHovered ? 10 : 3,
            } as React.CSSProperties}
          >
            {/* ── Breathe wrapper ── */}
            <div
              style={{
                width: "100%",
                height: "100%",
                animationName: "logo-breathe",
                animationDuration: `${logo.breathe}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationPlayState: isHovered ? "paused" : "running",
                position: "relative",
              }}
            >
              {/* ── Hover scale wrapper ── */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  transform: isHovered ? "scale(1.4)" : "scale(1)",
                  transition: "transform 0.25s cubic-bezier(0.21,0.47,0.32,0.98)",
                  position: "relative",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredId(logo.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* ── Logo box ── */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: isHovered
                      ? "0 0 0 2px rgba(127,119,221,0.5), 0 0 22px rgba(127,119,221,0.4)"
                      : "0 0 12px rgba(127,119,221,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backdropFilter: "blur(4px)",
                    transition: "box-shadow 0.25s ease",
                  }}
                >
                  <Image
                    src={`/logos/${logo.file}`}
                    alt={logo.name}
                    width={logo.size - 10}
                    height={logo.size - 10}
                    style={{ objectFit: "contain", display: "block" }}
                    unoptimized
                  />
                </div>

                {/* ── Tooltip ── */}
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#272729",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      whiteSpace: "nowrap",
                      zIndex: 30,
                      pointerEvents: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                  >
                    <p style={{ color: "#fff", fontSize: 12, fontWeight: 600, margin: 0, marginBottom: 2, lineHeight: 1.3 }}>
                      {logo.name}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, margin: 0, lineHeight: 1.4 }}>
                      {logo.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
