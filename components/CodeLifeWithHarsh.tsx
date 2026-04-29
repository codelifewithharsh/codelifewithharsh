"use client";

import Image from "next/image";
import Link from "next/link";
import { SlideLeft, SlideRight, FadeUp } from "@/components/AnimatedSection";

const reelCards = [
  {
    image: "/rag.jpg",
    title: "RAG Pipeline - Built and Explained",
    views: "1.4K views",
  },
  {
    image: "/job_assistance.jpg",
    title: "AI Job assistant",
    views: "2.1k views",
  },
  {
    image: "/100_n8n.jpg",
    title: "100 n8n templates",
    views: "1.8K views",
  },
];

function ReelCards() {
  return (
    <div className="flex items-center justify-center h-full py-8">
      <div className="relative flex items-end justify-center scale-[0.8] md:scale-100 origin-bottom" style={{ height: 380 }}>
        {reelCards.map((card, i) => (
          <Link
            key={i}
            href="https://instagram.com/codelifewithharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 group cursor-pointer transition-all duration-300 hover:scale-[1.03]"
            style={{
              width: 182,
              height: 322,
              transform: `translateX(${(i - 1) * 85}px) rotate(${(i - 1) * 7}deg) scale(${i === 1 ? 1.08 : 1})`,
              zIndex: 3 - Math.abs(i - 1),
            }}
          >
            <div className="rounded-[20px] overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.3)] group-hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)] transition-shadow duration-300 h-full relative">
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />

              {/* View count badge - top right */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full z-20">
                <p className="text-white text-[9px] font-medium">{card.views}</p>
              </div>

              {/* Play button overlay - center */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300 z-10">
                <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/35 transition-colors">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Title overlay - bottom with gradient */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-3 px-3 z-10">
                <p className="text-white text-[11px] font-medium leading-tight line-clamp-2">
                  {card.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CodeLifeWithHarsh() {
  return (
    <section id="content" className="bg-white py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left: Reel cards (reordered on mobile) */}
          <SlideLeft className="lg:order-1 order-2">
            <div className="relative h-[420px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] rounded-full bg-[#0066cc]/8 blur-[60px]" />
              </div>
              <ReelCards />
            </div>
          </SlideLeft>

          {/* Right: Text content (reordered on mobile) */}
          <SlideRight delay={0.1} className="lg:order-2 order-1">
            <div>
              {/* Eyebrow */}
              <FadeUp delay={0.05}>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#1d1d1f]/40 mb-5">
                  STUDIO{" "}
                  <span className="text-[#1d1d1f]/30">·</span>{" "}
                  <Link
                    href="https://instagram.com/codelifewithharsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066cc] hover:text-[#0071e3] transition-colors"
                  >
                    @codelifewithharsh
                  </Link>
                </p>
              </FadeUp>

              {/* Main heading */}
              <FadeUp delay={0.1}>
                <h2 className="text-[40px] md:text-[52px] font-semibold text-[#1d1d1f] tracking-[-0.022em] leading-[1.07] mb-4">
                  Building AI. Teaching the process.
                </h2>
              </FadeUp>

              {/* Description */}
              <FadeUp delay={0.15}>
                <p className="text-[17px] text-[#1d1d1f]/60 leading-[1.65] mb-6 max-w-[480px]">
                  AI moves fast. I stay - learning every new tool, workflow, and breakthrough as it drops. Then I break it down so you don&apos;t have to figure it out alone.
                </p>
              </FadeUp>

              {/* Stats row */}
              <FadeUp delay={0.2}>
                <p className="text-[13px] text-[#1d1d1f]/40 mb-8">
                  16K+ views  ·  15+ reels  ·  160+ followers &amp; growing
                </p>
              </FadeUp>

              {/* Buttons */}
              <FadeUp delay={0.25}>
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link
                    href="https://instagram.com/codelifewithharsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-normal px-[22px] py-[11px] rounded-full transition-all duration-200 active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                    Follow on Instagram
                  </Link>
                  <Link
                    href="https://linkedin.com/in/code-life-with-harsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#1d1d1f]/15 hover:border-[#1d1d1f]/30 text-[#1d1d1f]/70 hover:text-[#1d1d1f] text-[15px] font-normal px-[22px] py-[11px] rounded-full transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </Link>
                  <Link
                    href="https://youtube.com/@codelifewithharsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#1d1d1f]/15 hover:border-[#1d1d1f]/30 text-[#1d1d1f]/70 hover:text-[#1d1d1f] text-[15px] font-normal px-[22px] py-[11px] rounded-full transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    YouTube
                  </Link>
                </div>
              </FadeUp>

              {/* Bottom line */}
              <FadeUp delay={0.3}>
                <p className="text-[13px] text-[#1d1d1f]/35 italic">
                  Latest in AI - broken down, built live, shared here.
                </p>
              </FadeUp>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
