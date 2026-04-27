"use client";

import Link from "next/link";
import { SlideLeft, SlideRight, FadeUp } from "@/components/AnimatedSection";

const reels = [
  { label: "Tutorial", emoji: "📚", bg: "#272729", z: 1 },
  { label: "Project demo", emoji: "🚀", bg: "#1d1d1f", z: 3 },
  { label: "AI explainer", emoji: "🤖", bg: "#2a2a2c", z: 2 },
];

function ReelStack() {
  return (
    <div className="flex items-center justify-center h-full py-8">
      <div className="reel-stack relative flex items-end justify-center cursor-pointer" style={{ height: 400 }}>
        {reels.map((reel, i) => (
            <div
              key={reel.label}
              className={`reel-${i + 1} absolute bottom-0`}
              style={{ zIndex: reel.z }}
            >
              <div
                className="rounded-[22px] overflow-hidden flex flex-col items-center justify-center border border-white/[0.08] shadow-[0_16px_60px_rgba(0,0,0,0.5)]"
                style={{
                  width: 140,
                  height: 248,
                  background: reel.bg,
                }}
              >
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <span className="text-3xl mb-2 relative z-10">{reel.emoji}</span>
                <span className="relative z-10 text-white/50 text-[10px] font-semibold tracking-[0.1em] uppercase">
                  {reel.label}
                </span>
                {/* Play button */}
                <div className="absolute bottom-3 right-3 w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* Instagram gradient strip at top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888]" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function CodeLifeWithHarsh() {
  return (
    <section id="content" className="bg-white py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Reel stack visual */}
          <SlideLeft className="lg:order-1">
            <div className="relative h-[420px] flex items-center justify-center">
              {/* Glow behind stack */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[240px] h-[240px] rounded-full bg-[#0066cc]/8 blur-[60px]" />
              </div>
              <ReelStack />
            </div>
          </SlideLeft>

          {/* Right: Text content */}
          <SlideRight delay={0.1} className="lg:order-2">
            <div>
              {/* Eyebrow */}
              <FadeUp delay={0.05}>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0066cc] mb-5">
                  Content
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="text-[40px] md:text-[52px] font-semibold text-[#1d1d1f] tracking-[-0.022em] leading-[1.07] mb-4">
                  codelifewithharsh
                </h2>
              </FadeUp>

              <FadeUp delay={0.15}>
                <p className="text-[22px] md:text-[26px] font-light text-[#1d1d1f]/55 tracking-tight leading-[1.25] mb-5">
                  I teach what I build.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-[17px] text-[#1d1d1f]/55 leading-[1.65] mb-10 max-w-[440px]">
                  Every project I work on becomes a reel — tutorials, demos, and
                  honest breakdowns of what I&apos;m learning in AI and tech.
                  Follow along and build with me.
                </p>
              </FadeUp>

              {/* Social CTAs */}
              <FadeUp delay={0.25}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href="https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-normal px-[20px] py-[10px] rounded-full transition-all duration-200 active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                    Follow on Instagram
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/code-life-with-harsh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#1d1d1f]/15 hover:border-[#1d1d1f]/30 text-[#1d1d1f]/70 hover:text-[#1d1d1f] text-[15px] font-normal px-[20px] py-[10px] rounded-full transition-all duration-200"
                  >
                    Connect on LinkedIn
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="text-[13px] text-[#1d1d1f]/35">
                  More videos on{" "}
                  <span className="text-[#0066cc] font-medium">@codelifewithharsh</span>
                  {" "}— posting every week
                </p>
              </FadeUp>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
