"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  };
}

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/code-life-with-harsh/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/codelifewithharsh",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

/* ─── Hero image with floating badge overlays ─── */
function HeroVisual() {
  return (
    <div className="relative w-full h-[420px] md:h-[490px] flex items-end justify-center select-none">

      {/* Subtle glow behind image — at neck level */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[55%] bg-[#0066cc]/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Hero photo */}
      <div className="relative z-10 w-full max-w-[390px] mx-auto">
        <Image
          src="/hero.png"
          alt="Harsh — Frontend Engineer & AI Builder"
          width={390}
          height={460}
          priority
          className="w-full h-auto object-contain drop-shadow-[3px_5px_30px_rgba(0,0,0,0.22)]"
        />
      </div>

      {/* Floating chip — 10M+ Users (top-left) */}
      <div className="float-a absolute top-[8%] left-0 z-20 bg-[#272729]/90 backdrop-blur-sm rounded-[14px] p-3.5 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0066cc]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2997ff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p className="text-[22px] font-bold text-white leading-none tracking-tight">10M+</p>
            <p className="text-[10px] text-white/50 mt-1 leading-tight">Users on apps I helped ship</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[9px] font-medium bg-[#0066cc]/20 text-[#2997ff] px-2 py-0.5 rounded-full">@ Zeta</span>
              <span className="text-[9px] font-medium bg-white/[0.06] text-white/40 px-2 py-0.5 rounded-full">2+ years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chip — @codelifewithharsh (top-right) */}
      <div className="float-b absolute top-[18%] right-0 z-20 bg-[#0066cc] rounded-[12px] px-3 py-2.5 shadow-[0_4px_16px_rgba(0,102,204,0.45)]">
        <div className="flex items-center gap-2 mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
          </svg>
          <p className="text-[11px] font-bold text-white">@codelifewithharsh</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { label: "AI", color: "bg-white/15 text-white" },
            { label: "Automation", color: "bg-white/15 text-white"},
            { label: "Tech", color: "bg-white/15 text-white" },
          ].map(({ label, color }) => (
            <span key={label} className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${color}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Floating chip — Quick Facts (bottom-right) */}
      <div className="float-c absolute bottom-[12%] right-0 z-20 bg-[#1d1d1f]/90 backdrop-blur-sm rounded-[14px] p-3.5 border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        <p className="text-[9px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-2.5">Quick Facts</p>
        <div className="flex flex-col gap-2">
          {[
            { emoji: "🎓", text: "BITS Pilani Grad" },
            { emoji: "🎤", text: "Tech Conclave Speaker" },
            { emoji: "🏆", text: "Multiple Awards Winner" },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-[12px] leading-none">{emoji}</span>
              <span className="text-[11px] text-white/70 font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#1d1d1f] flex items-center pt-[52px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: Text content ── */}
          <div className="max-w-[560px]">

            {/* Name — HUGE */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-[64px] sm:text-[80px] md:text-[92px] font-semibold leading-[1.0] tracking-[-0.03em] text-white mb-6"
            >
              Harsh Goyal
            </motion.h1>
            {/* Tiny subtitle — sits above name */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-[11px] md:text-[12px] font-medium tracking-[0.12em] uppercase text-white/35 mb-4"
            >
              Software Engineer · AI Builder · Creator
            </motion.p>

            {/* Large statement lines */}
            <motion.div {...fadeUp(0.3)} className="mb-6">
              <p className="text-[26px] md:text-[30px] font-semibold text-white leading-[1.25] tracking-tight">
                I build AI products.
              </p>
              <p className="text-[26px] md:text-[30px] font-semibold text-white/50 leading-[1.25] tracking-tight">
                Teaching what I learn.
              </p>
            </motion.div>

            {/* Small description */}
            <motion.p
              {...fadeUp(0.35)}
              className="text-[14px] md:text-[15px] font-light text-white/40 leading-[1.8] mb-10 max-w-[400px]"
            >
              Turning real-world problems into AI-powered solutions — and documenting every step on{" "}
              <span className="text-[#2997ff] font-normal">@codelifewithharsh</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-3 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-normal px-[22px] py-[11px] rounded-full transition-all duration-200 active:scale-95"
              >
                See my work
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#connect"
                className="inline-flex items-center border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-[15px] font-normal px-[22px] py-[11px] rounded-full transition-all duration-200 active:scale-95"
              >
                Let&apos;s connect
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div {...fadeUp(0.55)} className="flex items-center gap-5">
              <span className="text-[12px] text-white/30 tracking-tight">Find me on</span>
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-white/35 hover:text-white transition-colors duration-200"
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
