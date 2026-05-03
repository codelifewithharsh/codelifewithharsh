"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Props as GitHubCalendarProps } from "react-github-calendar";
import Image from "next/image";
import { FadeUp, useCountUp } from "@/components/AnimatedSection";
import OrbitalRing, { LOGO_DATA } from "@/components/OrbitalRing";
import resourcesData from "@/data/resources.json";
import weeklyPickData from "@/data/weekly-pick.json";
import claudeCourseData from "@/data/claude-course.json";

const GitHubCalendar = dynamic<GitHubCalendarProps>(
  () => import("react-github-calendar").then((mod) => ({ default: mod.GitHubCalendar })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[120px] rounded-[10px] bg-white/[0.04] animate-pulse" />
    ),
  }
);

type Resource = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  type: string;
  link: string;
  youtubeLink?: string;
  instagramLink?: string;
  isFeatured: boolean;
  iDailyUse: boolean;
  level: "beginner" | "intermediate" | "advanced";
};

type WeeklyPick = {
  title: string;
  description: string;
  link: string;
  reelLink: string;
  category: string;
  week: string;
};

const CATEGORIES = [
  "Automation & Workflows",
  "LLMs & APIs",
  "Voice AI",
  "Frontend + AI",
  "Learning Paths",
  "My Daily Stack",
];

const FILTER_TABS = ["All", "Automation", "LLMs", "Voice AI", "Frontend", "Learning", "My Stack", "✦ Claude"];

const FILTER_TO_CATEGORY: Record<string, string> = {
  Automation: "Automation & Workflows",
  LLMs: "LLMs & APIs",
  "Voice AI": "Voice AI",
  Frontend: "Frontend + AI",
  Learning: "Learning Paths",
  "My Stack": "My Daily Stack",
};

const CATEGORY_TO_FILTER: Record<string, string> = {
  "Automation & Workflows": "Automation",
  "LLMs & APIs": "LLMs",
  "Voice AI": "Voice AI",
  "Frontend + AI": "Frontend",
  "Learning Paths": "Learning",
  "My Daily Stack": "My Stack",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Automation & Workflows": "Tools and workflows I use to automate everything",
  "LLMs & APIs": "APIs and guides for working with language models",
  "Voice AI": "Build agents that talk and listen",
  "Frontend + AI": "Ship AI-powered web apps fast",
  "Learning Paths": "Curated paths to go from zero to shipping",
  "My Daily Stack": "Every tool I use daily to build and ship",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Automation & Workflows": "⚡",
  "LLMs & APIs": "🧠",
  "Voice AI": "🎙️",
  "Frontend + AI": "💻",
  "Learning Paths": "📚",
  "My Daily Stack": "🛠️",
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Tool: { bg: "bg-[#0066cc]/15", text: "text-[#2997ff]" },
  Docs: { bg: "bg-[#5856d6]/15", text: "text-[#9391e5]" },
  Guide: { bg: "bg-[#34c759]/15", text: "text-[#4cd964]" },
  Template: { bg: "bg-[#ff6b35]/15", text: "text-[#ff8c5a]" },
  Video: { bg: "bg-[#ff3b30]/15", text: "text-[#ff6961]" },
};

const LEVEL_CONFIG: Record<string, { dot: string; label: string }> = {
  beginner: { dot: "bg-[#34c759]", label: "Beginner" },
  intermediate: { dot: "bg-[#ff9f0a]", label: "Intermediate" },
  advanced: { dot: "bg-[#ff3b30]", label: "Advanced" },
};

const ROW_ACCENT_COLORS = ["#7F77DD", "#4ECDC4"];

const categorySlug = (cat: string) =>
  cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

/* ── Announcement Banner ── */
function AnnouncementBanner({ onExploreClick }: { onExploreClick: () => void }) {
  return (
    <div
      style={{
        width: "100%",
        height: 40,
        background: "linear-gradient(to right, rgba(127,119,221,0.15), rgba(29,158,117,0.15))",
        borderBottom: "1px solid rgba(127,119,221,0.2)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex items-center justify-center gap-3 px-4 w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="pulse-dot flex-shrink-0"
            style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#34c759" }}
          />
          <span className="hidden md:block text-[13px] text-white/70">
            New — 100 n8n templates now live in the toolkit
          </span>
          <span className="md:hidden text-[13px] text-white/70">
            100 n8n templates added
          </span>
        </div>
        <button
          onClick={onExploreClick}
          className="hidden md:block text-[13px] font-medium text-[#7F77DD] hover:text-[#7F77DD]/80 transition-colors flex-shrink-0 ml-1"
        >
          Explore →
        </button>
      </div>
    </div>
  );
}

/* ── Ticker ── */
const TICKER_ITEMS = [
  "40+ curated resources",
  "Updated every week",
  "100% free",
  "n8n templates",
  "Voice AI guides",
  "LLM API resources",
  "No fluff. Just what works.",
  "Built by a developer, for developers",
];

function TickerRow({ direction }: { direction: "left" | "right" }) {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      className="group"
    >
      <div
        className={`flex whitespace-nowrap group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-ticker-left" : "animate-ticker-right"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span style={{ color: "#7F77DD", fontSize: 11 }}>✦</span>
            <span className="text-[13px] text-white/35 mx-2.5">{item}</span>
            <span className="text-white/15 text-[13px] mr-2.5">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── WeeklyPickCard ── */
function WeeklyPickCard({ pick }: { pick: WeeklyPick }) {
  const hasLink = pick.link !== "#";
  const hasReel = pick.reelLink !== "#";
  return (
    <FadeUp>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="bg-[#0d2d52] border border-[#2997ff]/20 rounded-[22px] p-7 md:p-8 mb-16 flex flex-col md:flex-row md:items-center gap-6 hover:border-[#2997ff]/35 transition-colors duration-300"
      >
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-[#2997ff] bg-[#2997ff]/15 border border-[#2997ff]/25 rounded-full px-2.5 py-0.5 mb-3">
            ⭐ Pick of the week
          </span>
          <h3 className="text-[22px] md:text-[26px] font-semibold text-white tracking-[-0.018em] leading-[1.2] mb-3">
            {pick.title}
          </h3>
          <p className="text-[15px] text-white/55 leading-[1.65] italic mb-5">
            &quot;{pick.description}&quot;
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hasLink ? pick.link : undefined}
              target={hasLink ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
            >
              Check it out →
            </a>
            <a
              href={hasReel ? pick.reelLink : undefined}
              target={hasReel ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 hover:text-white border border-white/[0.14] hover:border-white/28 px-4 py-2 rounded-full transition-all duration-200"
            >
              Watch my reel
            </a>
          </div>
        </div>
        <div className="flex flex-row md:flex-col items-center md:items-end gap-2 flex-shrink-0">
          <span className="text-[11px] font-medium text-white/45 bg-white/[0.07] rounded-full px-3 py-1">
            {pick.category}
          </span>
          <span className="text-[11px] text-white/30">Updated weekly</span>
          <span className="text-[11px] text-white/20">{pick.week}</span>
        </div>
      </motion.div>
    </FadeUp>
  );
}

/* ── ChangelogSection ── */
function ChangelogSection() {
  const entries = [
    { date: "May 2026", text: "Toolkit launched. 40+ resources across 6 categories." },
    { date: "Coming soon", text: "Template browser, AI tool recommender, weekly picks." },
  ];
  return (
    <section id="changelog" className="max-w-[1200px] mx-auto px-6 mb-16">
      <FadeUp>
        <div className="bg-[#272729] rounded-[22px] p-8 border border-white/[0.06]">
          <h2 className="text-[20px] font-semibold text-white tracking-[-0.018em] mb-6">
            What&apos;s new
          </h2>
          <ul className="flex flex-col gap-4">
            {entries.map((entry) => (
              <li key={entry.date} className="flex items-start gap-4">
                <span className="text-[10px] font-semibold tracking-[0.06em] uppercase text-[#0066cc] bg-[#0066cc]/10 rounded-full px-2.5 py-1 flex-shrink-0 mt-0.5 whitespace-nowrap">
                  {entry.date}
                </span>
                <span className="text-[14px] text-white/50 leading-[1.6]">{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}

/* ── Resource Card (redesigned) ── */
function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const typeStyle = TYPE_COLORS[resource.type] ?? { bg: "bg-white/10", text: "text-white/50" };
  const levelCfg = LEVEL_CONFIG[resource.level];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/toolkit#${resource.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.article
      id={resource.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      style={{
        width: 260,
        minHeight: 160,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
      className="group bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#7F77DD]/40 hover:shadow-[0_8px_32px_rgba(127,119,221,0.12)] rounded-[16px] p-5 transition-all duration-200 cursor-pointer"
    >
      {/* Top row: emoji + level dot */}
      <div className="flex items-start justify-between">
        <span className="text-[22px] leading-none">{resource.emoji}</span>
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${levelCfg.dot}`}
          title={levelCfg.label}
        />
      </div>

      {/* Title */}
      <h3
        className="text-[15px] font-medium text-white/95 leading-[1.35] mt-[10px] mb-1"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {resource.title}
      </h3>

      {/* Description */}
      <p
        className="text-[13px] text-white/40 leading-[1.5] mb-[10px]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {resource.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-[10px]">
        <span className={`text-[10px] font-semibold tracking-[0.06em] uppercase rounded-full px-2.5 py-0.5 ${typeStyle.bg} ${typeStyle.text}`}>
          {resource.type}
        </span>
        {resource.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium text-white/35 bg-white/[0.06] rounded-full px-2.5 py-0.5">
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-1.5 mt-auto pt-[10px] border-t border-white/[0.05]">
        {resource.iDailyUse && (
          <span className="text-[10px] font-medium text-[#34c759] bg-[#34c759]/10 border border-[#34c759]/20 rounded-full px-2 py-0.5 flex-shrink-0 whitespace-nowrap">
            ✓ Daily
          </span>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          {resource.youtubeLink && (
            <a
              href={resource.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center text-[11px] font-medium text-white/55 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-full px-2.5 py-1 transition-colors"
            >
              ▶
            </a>
          )}
          {resource.instagramLink && (
            <a
              href={resource.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center text-[11px] font-medium text-white/55 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-full px-2.5 py-1 transition-colors"
            >
              📱
            </a>
          )}
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            title="Copy link"
            animate={copied ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.25 }}
            className={`inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-1 transition-all duration-200 ${
              copied
                ? "text-[#34c759] bg-[#34c759]/10"
                : "text-white/35 hover:text-white bg-white/[0.04] hover:bg-white/[0.09]"
            }`}
          >
            {copied ? "✓" : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            )}
          </motion.button>
          {resource.link !== "#" ? (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center text-[11px] font-medium text-white/55 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-full px-2.5 py-1 transition-colors"
            >
              →
            </a>
          ) : (
            <span className="text-[10px] text-white/20 px-2 py-1">Soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Empty state card ── */
function EmptyCard() {
  return (
    <div
      style={{ width: 260, minHeight: 160, flexShrink: 0 }}
      className="flex flex-col items-center justify-center text-center p-5 rounded-[16px] border border-dashed border-white/[0.12] bg-white/[0.02]"
    >
      <p className="text-[13px] text-white/30 leading-[1.6]">
        More coming soon —<br />
        follow <span className="text-white/45">@codelifewithharsh</span><br />
        for updates
      </p>
    </div>
  );
}

/* ── Category Row ── */
function CategoryRow({
  category,
  resources,
  accentColor,
}: {
  category: string;
  resources: Resource[];
  accentColor: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const CARD_SCROLL = (260 + 16) * 2;

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIsAtStart(el.scrollLeft <= 2);
    setIsAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, []);

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -CARD_SCROLL, behavior: "smooth" });
  };
  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: CARD_SCROLL, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
  };
  const handleMouseUp = () => setIsDragging(false);

  const slug = categorySlug(category);

  return (
    <section id={`category-${slug}`} className="mb-14">
      <FadeUp>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1 flex-wrap">
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: accentColor,
                }}
              >
                {CATEGORY_ICONS[category]} {category}
              </span>
              <span className="text-[11px] text-white/30 bg-white/[0.06] rounded-full px-2 py-0.5">
                {resources.length} resources
              </span>
            </div>
            <p className="text-[13px] text-white/35">{CATEGORY_DESCRIPTIONS[category]}</p>
          </div>

          {/* Arrow buttons — desktop only */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0 mt-1">
            <button
              onClick={handleScrollLeft}
              disabled={isAtStart}
              style={{ opacity: isAtStart ? 0.3 : 1 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] text-white/70 bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-200 disabled:cursor-default cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={handleScrollRight}
              disabled={isAtEnd}
              style={{ opacity: isAtEnd ? 0.3 : 1 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] text-white/70 bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-200 disabled:cursor-default cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </FadeUp>

      {/* Scroll row */}
      <div className="relative">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            gap: 16,
            padding: "4px 0 16px",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {resources.length > 0 ? (
            resources.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} />
            ))
          ) : (
            <EmptyCard />
          )}
          {/* Right padding sentinel */}
          <div style={{ width: 4, flexShrink: 0 }} />
        </div>

        {/* Fade gradient — right edge */}
        {!isAtEnd && (
          <div
            className="absolute top-0 right-0 bottom-4 w-20 pointer-events-none"
            style={{
              background: "linear-gradient(to right, transparent 0%, #1d1d1f 100%)",
            }}
          />
        )}
      </div>
    </section>
  );
}

/* ── Hero stats row (matches homepage Stats design) ── */
const HERO_STATS = [
  { value: 40,  suffix: "+", label: "Resources"  },
  { value: 6,   suffix: "",  label: "Categories" },
  { value: 100, suffix: "%", label: "Free"       },
  { value: 3,   suffix: "",  label: "Tracks"     },
  { value: 11,  suffix: "",  label: "Modules"    },
];

function HeroStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <p
        className="text-[24px] md:text-[32px] font-semibold text-white leading-none"
        style={{ textShadow: "0 0 20px rgba(127,119,221,0.4)" }}
      >
        {count}{suffix}
      </p>
      <p className="text-[11px] md:text-[12px] font-normal text-white/40 uppercase tracking-[0.08em] mt-1.5">
        {label}
      </p>
    </motion.div>
  );
}

function HeroStatsRow() {
  return (
    <div className="border-t border-b border-white/[0.05]" style={{ padding: "48px 0" }}>
      {/* Desktop: single row with dividers */}
      <div className="hidden md:flex items-center justify-center max-w-[1200px] mx-auto px-6">
        {HERO_STATS.map((stat, i) => (
          <div key={stat.label} className="flex-1 flex items-center">
            <div className="flex-1 flex justify-center">
              <HeroStat {...stat} index={i} />
            </div>
            {i < HERO_STATS.length - 1 && (
              <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: 3 + 2 grid, no dividers */}
      <div className="md:hidden flex flex-col gap-8 items-center px-6">
        <div className="grid grid-cols-3 gap-8 w-full max-w-[320px]">
          {HERO_STATS.slice(0, 3).map((stat, i) => (
            <HeroStat key={stat.label} {...stat} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8 max-w-[200px]">
          {HERO_STATS.slice(3).map((stat, i) => (
            <HeroStat key={stat.label} {...stat} index={i + 3} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Claude Course types ── */
type CourseResource = { title: string; link: string; type: string };
type CourseModule = {
  id: string;
  title: string;
  description: string;
  reelUrl: string;
  youtubeUrl: string;
  takeaways: string[];
  resources: CourseResource[];
  duration: string;
  isNew: boolean;
};
type CourseTrack = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  levelColor: string;
  estimatedTime: string;
  moduleCount: number;
  modules: CourseModule[];
};
type CourseData = { tracks: CourseTrack[] };

/* ── Video placeholder ── */
function VideoPlaceholder() {
  return (
    <div
      style={{
        aspectRatio: "16/9",
        background: "rgba(255,255,255,0.03)",
        border: "1px dashed rgba(255,255,255,0.1)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 24,
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 28 }}>📱</span>
      <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
        Reel dropping soon
      </p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.5 }}>
        Follow @codelifewithharsh to get notified
      </p>
      <a
        href="https://www.instagram.com/codelifewithharsh"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: "#E85D3D",
          border: "1px solid rgba(232,93,61,0.3)",
          borderRadius: 999,
          padding: "5px 14px",
          marginTop: 4,
          textDecoration: "none",
        }}
      >
        Follow on Instagram →
      </a>
    </div>
  );
}

/* ── Video embed ── */
function VideoEmbed({ reelUrl: _reelUrl, youtubeUrl }: { reelUrl: string; youtubeUrl: string }) {
  if (youtubeUrl) {
    const videoId = youtubeUrl.includes("youtu.be/")
      ? youtubeUrl.split("youtu.be/")[1]?.split("?")[0]
      : youtubeUrl.split("v=")[1]?.split("&")[0];
    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Module video"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }
  return <VideoPlaceholder />;
}

/* ── Course resource link ── */
const COURSE_RES_STYLES: Record<string, { bg: string; color: string }> = {
  Official: { bg: "rgba(227,95,61,0.15)", color: "#E85D3D" },
  Docs:     { bg: "rgba(41,151,255,0.12)", color: "#2997ff" },
  Course:   { bg: "rgba(127,119,221,0.15)", color: "#7F77DD" },
  Template: { bg: "rgba(29,158,117,0.15)", color: "#1D9E75" },
};

function CourseResourceLink({ resource }: { resource: CourseResource }) {
  const s = COURSE_RES_STYLES[resource.type] ?? { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" };
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2.5 rounded-[8px] p-[10px_12px] bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all no-underline"
    >
      <span
        style={{ background: s.bg, color: s.color }}
        className="text-[10px] font-semibold tracking-[0.06em] uppercase rounded-full px-[7px] py-0.5 flex-shrink-0"
      >
        {resource.type}
      </span>
      <span className="text-[13px] text-white/70 leading-[1.3] flex-1">{resource.title}</span>
      <span className="text-[12px] text-white/30 flex-shrink-0">→</span>
    </a>
  );
}

/* ── Module detail panel ── */
function ModuleDetail({
  module,
  isCompleted,
  onMarkComplete,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  module: CourseModule;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderTop: "none",
        borderRadius: "0 0 10px 10px",
        padding: "20px 18px 16px",
      }}
    >
      {/* Video */}
      <div className="mb-5">
        <VideoEmbed reelUrl={module.reelUrl} youtubeUrl={module.youtubeUrl} />
      </div>

      {/* Takeaways */}
      <div className="mb-5">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">
          What you&apos;ll learn
        </p>
        <ul className="flex flex-col gap-2">
          {module.takeaways.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#1D9E75] text-[13px] flex-shrink-0 mt-0.5">•</span>
              <span className="text-[13px] text-white/60 leading-[1.55]">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      {module.resources.length > 0 && (
        <div className="mb-5">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">
            Resources
          </p>
          <div className="flex flex-col gap-2">
            {module.resources.map((r, i) => (
              <CourseResourceLink key={i} resource={r} />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          style={{ opacity: hasPrev ? 1 : 0.3, cursor: hasPrev ? "pointer" : "default" }}
          className="text-[13px] text-white/60 px-3.5 py-1.5 rounded-[8px] border border-white/[0.1] hover:bg-white/[0.05] transition-all disabled:hover:bg-transparent"
        >
          ← Prev
        </button>
        <button
          onClick={onMarkComplete}
          style={{
            flex: 1,
            background: isCompleted ? "rgba(29,158,117,0.15)" : "transparent",
            borderColor: isCompleted ? "rgba(29,158,117,0.4)" : "rgba(255,255,255,0.12)",
            color: isCompleted ? "#1D9E75" : "rgba(255,255,255,0.6)",
          }}
          className="text-[13px] font-medium py-1.5 rounded-[8px] border hover:opacity-80 transition-all cursor-pointer"
        >
          {isCompleted ? "✓ Completed" : "Mark complete"}
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          style={{ opacity: hasNext ? 1 : 0.3, cursor: hasNext ? "pointer" : "default" }}
          className="text-[13px] text-white/60 px-3.5 py-1.5 rounded-[8px] border border-white/[0.1] hover:bg-white/[0.05] transition-all disabled:hover:bg-transparent"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* ── Module row ── */
function ModuleRow({
  module,
  index,
  isCompleted,
  isActive,
  onToggleActive,
  onMarkComplete,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  module: CourseModule;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  onToggleActive: () => void;
  onMarkComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="mb-1">
      <button
        onClick={onToggleActive}
        style={{
          borderRadius: isActive ? "10px 10px 0 0" : 10,
          borderBottom: isActive ? "none" : undefined,
          background: isActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        }}
        className="w-full flex items-center gap-3 px-3.5 py-2.5 border border-white/[0.08] hover:bg-white/[0.04] transition-all text-left cursor-pointer"
      >
        {/* Completion circle */}
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `2px solid ${isCompleted ? "#1D9E75" : "rgba(255,255,255,0.2)"}`,
            background: isCompleted ? "#1D9E75" : "transparent",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            color: "white",
            transition: "all 0.2s",
          }}
        >
          {isCompleted ? "✓" : ""}
        </span>

        {/* Number */}
        <span className="text-[11px] font-semibold text-white/25 flex-shrink-0 tabular-nums">
          {num}
        </span>

        {/* Title */}
        <span className="flex-1 text-[14px] font-medium text-white/85 text-left leading-tight">
          {module.title}
        </span>

        {/* Right badges */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {module.isNew && (
            <span className="text-[9px] font-bold tracking-[0.08em] uppercase bg-[rgba(29,158,117,0.2)] text-[#1D9E75] rounded-full px-1.5 py-0.5">
              NEW
            </span>
          )}
          <span className="text-[12px] text-white/25">{module.duration}</span>
          <span className="text-[11px] text-white/20 ml-1">{isActive ? "▲" : "▼"}</span>
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <ModuleDetail
              module={module}
              isCompleted={isCompleted}
              onMarkComplete={onMarkComplete}
              onPrev={onPrev}
              onNext={onNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Track card ── */
function TrackCard({
  track,
  completedModules,
  onToggleComplete,
}: {
  track: CourseTrack;
  completedModules: string[];
  onToggleComplete: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const levelEmoji = track.level === "beginner" ? "🟢" : track.level === "intermediate" ? "🟡" : "🔴";
  const levelLabel = track.level.charAt(0).toUpperCase() + track.level.slice(1);
  const preview = track.modules.slice(0, 3);
  const extraCount = track.modules.length - 3;

  const handleModuleToggle = (id: string) =>
    setActiveModuleId((prev) => (prev === id ? null : id));

  const handlePrev = (currentId: string) => {
    const idx = track.modules.findIndex((m) => m.id === currentId);
    if (idx > 0) setActiveModuleId(track.modules[idx - 1].id);
  };
  const handleNext = (currentId: string) => {
    const idx = track.modules.findIndex((m) => m.id === currentId);
    if (idx < track.modules.length - 1) setActiveModuleId(track.modules[idx + 1].id);
  };

  return (
    <motion.div
      whileHover={!isExpanded ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        padding: 24,
        background: "rgba(255,255,255,0.02)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s",
      }}
      className={!isExpanded ? `hover:border-[${track.levelColor}]/40` : ""}
    >
      {/* Header badges */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span
          style={{ background: `${track.levelColor}1A`, color: track.levelColor }}
          className="text-[11px] font-semibold rounded-full px-2.5 py-0.5"
        >
          {levelEmoji} {levelLabel}
        </span>
        <span className="text-[11px] text-white/30 bg-white/[0.06] rounded-full px-2 py-0.5">
          {track.moduleCount} modules
        </span>
        <span className="text-[11px] text-white/25 ml-auto">~{track.estimatedTime}</span>
      </div>

      {/* Title + subtitle */}
      <h3 className="text-[20px] font-semibold text-white tracking-[-0.015em] leading-[1.25] mb-1.5">
        {track.title}
      </h3>
      <p className="text-[14px] text-white/40 leading-[1.5] mb-5">{track.subtitle}</p>

      {/* Module preview (collapsed state) */}
      {!isExpanded && (
        <div className="flex flex-col gap-0 mb-5">
          {preview.map((mod, i) => (
            <div
              key={mod.id}
              className="flex items-center gap-2.5 py-2 border-b border-white/[0.04] last:border-b-0"
            >
              <span className="text-[10px] font-semibold text-white/20 flex-shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] text-white/55 flex-1 leading-tight">{mod.title}</span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {mod.isNew && (
                  <span className="text-[9px] font-bold tracking-[0.06em] uppercase bg-[rgba(29,158,117,0.2)] text-[#1D9E75] rounded-full px-1.5 py-0.5">
                    NEW
                  </span>
                )}
                <span className="text-[11px] text-white/25">{mod.duration}</span>
              </div>
            </div>
          ))}
          {extraCount > 0 && (
            <p className="text-[12px] text-white/20 pt-2">
              +{extraCount} more module{extraCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {/* Expanded module list */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
            className="mb-4"
          >
            <div className="flex flex-col">
              {track.modules.map((mod, i) => (
                <ModuleRow
                  key={mod.id}
                  module={mod}
                  index={i}
                  isCompleted={completedModules.includes(mod.id)}
                  isActive={activeModuleId === mod.id}
                  onToggleActive={() => handleModuleToggle(mod.id)}
                  onMarkComplete={() => onToggleComplete(mod.id)}
                  onPrev={() => handlePrev(mod.id)}
                  onNext={() => handleNext(mod.id)}
                  hasPrev={i > 0}
                  hasNext={i < track.modules.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer button */}
      <button
        onClick={() => {
          setIsExpanded((e) => !e);
          if (!isExpanded) setActiveModuleId(null);
        }}
        style={{
          borderColor: `${track.levelColor}55`,
          background: `${track.levelColor}14`,
          color: track.levelColor,
        }}
        className="mt-auto w-full py-2.5 rounded-[10px] border text-[14px] font-medium hover:opacity-80 transition-all cursor-pointer"
      >
        {isExpanded ? "Collapse ↑" : "Start Track →"}
      </button>
    </motion.div>
  );
}

/* ── Claude course page ── */
function ClaudeCoursePage() {
  const courseData = claudeCourseData as CourseData;
  const totalModules = courseData.tracks.reduce((sum, t) => sum + t.modules.length, 0);

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("claude-course-progress") || "[]");
    } catch {
      return [];
    }
  });

  const handleToggleComplete = (moduleId: string) => {
    setCompletedModules((prev) => {
      const updated = prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId];
      localStorage.setItem("claude-course-progress", JSON.stringify(updated));
      return updated;
    });
  };

  const completedCount = completedModules.filter((id) =>
    courseData.tracks.some((t) => t.modules.some((m) => m.id === id))
  ).length;
  const progressPct = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  return (
    <div>
      {/* Course header */}
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#E85D3D] mb-2">
              FREE COURSE
            </p>
            <h2 className="text-[26px] md:text-[30px] font-semibold text-white tracking-[-0.018em] leading-[1.2]">
              Learn Claude — from first prompt to production AI app
            </h2>
          </div>
          <p className="text-[13px] text-white/35 md:text-right leading-[1.8] flex-shrink-0">
            3 tracks · {totalModules} modules · 100% free
          </p>
        </div>
      </FadeUp>

      {/* Anthropic official callout */}
      <FadeUp delay={0.05}>
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[12px] px-4 py-3 mb-7"
          style={{
            background: "rgba(227,95,61,0.08)",
            border: "1px solid rgba(227,95,61,0.2)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[18px]">🎓</span>
            <span className="text-[13px] text-white/55 leading-[1.5]">
              Want Anthropic&apos;s official course? They have a free one too →
            </span>
          </div>
          <a
            href="https://anthropic.com/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#E85D3D] border border-[rgba(227,95,61,0.35)] rounded-full px-3.5 py-1.5 hover:bg-[rgba(227,95,61,0.1)] transition-all flex-shrink-0 no-underline"
          >
            Anthropic Learn →
          </a>
        </div>
      </FadeUp>

      {/* Track cards */}
      <FadeUp delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {courseData.tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              completedModules={completedModules}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </FadeUp>

      {/* Progress bar */}
      <FadeUp delay={0.15}>
        <div
          className="rounded-[12px] px-5 py-4 mb-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[13px] text-white/40">
              Your progress: {completedCount} of {totalModules} modules completed
            </p>
            <p
              className="text-[13px] font-semibold"
              style={{ color: completedCount > 0 ? "#1D9E75" : "rgba(255,255,255,0.25)" }}
            >
              {Math.round(progressPct)}%
            </p>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "#1D9E75", originX: 0 }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ── Sticky Tab Bar ── */
function StickyTabBar({
  activeTab,
  onTabClick,
}: {
  activeTab: string;
  onTabClick: (tab: string) => void;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 52,
        zIndex: 50,
        background: "rgba(29,29,31,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="relative">
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "10px 24px",
            flexWrap: "nowrap",
            maxWidth: 1200,
            margin: "0 auto",
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            const isClaude = tab === "✦ Claude";
            return (
              <button
                key={tab}
                onClick={() => onTabClick(tab)}
                style={{
                  flexShrink: 0,
                  fontSize: 13,
                  fontWeight: isClaude ? 600 : 500,
                  padding: "6px 16px",
                  borderRadius: 20,
                  border: isClaude
                    ? isActive
                      ? "1px solid rgba(227,95,61,0.6)"
                      : "1px solid rgba(227,95,61,0.3)"
                    : isActive
                    ? "1px solid rgba(127,119,221,0.3)"
                    : "1px solid transparent",
                  background: isClaude
                    ? isActive
                      ? "rgba(227,95,61,0.2)"
                      : "rgba(227,95,61,0.08)"
                    : isActive
                    ? "rgba(127,119,221,0.15)"
                    : "transparent",
                  color: isClaude
                    ? isActive
                      ? "#FF7A5C"
                      : "#E85D3D"
                    : isActive
                    ? "#7F77DD"
                    : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                className={!isActive && !isClaude ? "hover:bg-white/[0.06] hover:!text-white/70" : ""}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Mobile right-fade to hint more tabs */}
        <div
          className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-10"
          style={{ background: "linear-gradient(to right, transparent, rgba(29,29,31,0.95))" }}
        />
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function ToolkitContent() {
  const [activeTab, setActiveTab] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const resources = resourcesData as Resource[];
  const weeklyPick = weeklyPickData as WeeklyPick;

  const activeTabRef = useRef(activeTab);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  const scrollTargetRef = useRef<string | null>(null);
  useEffect(() => {
    if (!scrollTargetRef.current) return;
    const tab = scrollTargetRef.current;
    scrollTargetRef.current = null;
    const categoryName = FILTER_TO_CATEGORY[tab];
    if (!categoryName) return;
    const el = document.getElementById(`category-${categorySlug(categoryName)}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeTab]);

  /* Scroll spy — disabled when Claude tab is active */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    CATEGORIES.forEach((category) => {
      const el = document.getElementById(`category-${categorySlug(category)}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && activeTabRef.current !== "✦ Claude") {
            setActiveTab(CATEGORY_TO_FILTER[category] ?? "All");
          }
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "✦ Claude") {
      const el = document.getElementById("toolkit-content-area");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }
    if (tab === "All") {
      const el = document.getElementById("toolkit-content-area");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }
    // Defer scroll until after re-render (category rows may be unmounted if coming from Claude tab)
    scrollTargetRef.current = tab;
  };

  const scrollToMyStack = () => {
    const el = document.getElementById("category-my-daily-stack");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveTab("My Stack");
    }
  };

  const handleSubscribe = () => {
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="bg-[#1d1d1f] min-h-screen pt-[52px]">

      {/* Ticker keyframes */}
      <style>{`
        @keyframes ticker-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-ticker-left { animation: ticker-left 30s linear infinite; }
        .animate-ticker-right { animation: ticker-right 30s linear infinite; }
        @keyframes chevron-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
      `}</style>

      {/* CHANGE 2: Full-width announcement banner */}
      <AnnouncementBanner onExploreClick={scrollToMyStack} />

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        <FadeUp>
          <div className="flex items-center gap-2 text-[12px] text-white/35">
            <Link
              href="/"
              className="hover:text-white/65 transition-colors duration-200 flex items-center gap-1"
            >
              ← harsh.dev
            </Link>
            <span>/</span>
            <span className="text-white/55">Toolkit</span>
          </div>
        </FadeUp>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-0 md:pt-14 md:pb-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.75) saturate(0.8)" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to right,  rgba(29,29,31,0.98) 0%, rgba(29,29,31,0.55) 45%, rgba(29,29,31,0.25) 70%, rgba(29,29,31,0.55) 100%)",
                "linear-gradient(to bottom, rgba(29,29,31,0.6) 0%, transparent 20%, transparent 80%, rgba(29,29,31,0.6) 100%)",
              ].join(", "),
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex items-center min-h-[480px] md:min-h-[calc(100vh-280px)]">
          <div className="w-full md:w-1/2 md:pr-10">
            <FadeUp>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0066cc] mb-4">
                Toolkit
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-[40px] md:text-[56px] font-semibold text-white tracking-[-0.022em] leading-[1.06] mb-5">
                The AI Toolkit
              </h1>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-[17px] md:text-[19px] text-white/50 leading-[1.65] mb-10">
                Everything I use to build, learn, and ship AI products — curated for developers who
                want to actually get things done.
              </p>
            </FadeUp>

            {/* CHANGE 3A: Tagline */}
            <FadeUp delay={0.16}>
              <p className="text-[18px] font-normal text-white/45 leading-[1.5] mb-6">
                Everything you need to go from idea to shipped AI product.
              </p>
            </FadeUp>

            {/* CHANGE 3B: Dual-row ticker */}
            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-1.5 mb-12">
                <TickerRow direction="left" />
                <TickerRow direction="right" />
              </div>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="md:hidden mt-8">
                <p className="text-[11px] text-white/30 mb-3">Built with</p>
                <div className="flex flex-wrap gap-2.5">
                  {LOGO_DATA.map((logo) => (
                    <div
                      key={logo.id}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={`/logos/${logo.file}`}
                        alt={logo.name}
                        width={26}
                        height={26}
                        style={{ objectFit: "contain" }}
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden">
            <OrbitalRing />
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="relative z-10 flex justify-center py-6">
          <span
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.3)",
              animation: "chevron-bob 1.5s ease-in-out infinite",
              display: "block",
              lineHeight: 1,
            }}
          >
            ↓
          </span>
        </div>
      </section>

      {/* Stats row */}
      <HeroStatsRow />

      {/* CHANGE 4: Difficulty legend — between hero and sticky tab bar */}
      <div className="flex items-center justify-center gap-5 py-3 border-b border-white/[0.05]">
        {[
          { emoji: "🟢", label: "Beginner" },
          { emoji: "🟡", label: "Intermediate" },
          { emoji: "🔴", label: "Advanced" },
        ].map(({ emoji, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/25">
            {emoji} {label}
          </span>
        ))}
      </div>

      {/* Sticky tab bar */}
      <StickyTabBar activeTab={activeTab} onTabClick={handleTabClick} />

      {/* Content area — course or resource rows */}
      <div id="toolkit-content-area" className="max-w-[1200px] mx-auto px-6 pt-10 pb-6">
        {activeTab === "✦ Claude" ? (
          <ClaudeCoursePage />
        ) : (
          <>
            <WeeklyPickCard pick={weeklyPick} />
            {CATEGORIES.map((category, idx) => {
              const categoryResources = resources.filter((r) => r.category === category);
              return (
                <CategoryRow
                  key={category}
                  category={category}
                  resources={categoryResources}
                  accentColor={ROW_ACCENT_COLORS[idx % 2]}
                />
              );
            })}
          </>
        )}
      </div>

      {/* GitHub activity */}
      <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <FadeUp>
          <div className="bg-[#272729] rounded-[22px] p-8 md:p-10 border border-white/[0.06]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0066cc] mb-2">
                  Open Source
                </p>
                <h2 className="text-[26px] font-semibold text-white tracking-[-0.02em] mb-1">
                  Building in public
                </h2>
                <p className="text-[14px] text-white/40">Every project ships to GitHub</p>
              </div>
              <a
                href="https://github.com/codelifewithharsh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/55 hover:text-white border border-white/[0.1] hover:border-white/25 rounded-full px-4 py-2 transition-all duration-200 flex-shrink-0"
              >
                → github.com/codelifewithharsh
              </a>
            </div>
            <div className="overflow-x-auto">
              <GitHubCalendar
                username="codelifewithharsh"
                colorScheme="dark"
                blockSize={11}
                blockMargin={3}
                fontSize={11}
              />
            </div>
          </div>
        </FadeUp>
      </section>

      <ChangelogSection />

      {/* Email subscribe */}
      <section className="max-w-[1200px] mx-auto px-6 mb-20">
        <FadeUp>
          <div className="bg-[#272729] rounded-[22px] px-8 md:px-16 py-14 text-center border border-white/[0.06]">
            <h2 className="text-[28px] md:text-[38px] font-semibold text-white tracking-[-0.022em] leading-[1.1] mb-3">
              Stay ahead of the AI curve.
            </h2>
            <p className="text-[15px] md:text-[16px] text-white/45 mb-8 max-w-[440px] mx-auto leading-[1.65]">
              New tools, templates, and breakdowns — straight to your inbox before they hit
              Instagram.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row gap-3 max-w-[400px] mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-full px-5 py-2.5 text-white placeholder-white/25 text-[14px] focus:outline-none focus:border-[#2997ff]/40 transition-colors"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-[14px] font-medium px-6 py-2.5 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap"
                  >
                    Subscribe →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="text-[18px] font-semibold text-[#34c759]"
                >
                  You&apos;re in! ✓
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[12px] text-white/20 mt-5">No spam. Unsubscribe anytime.</p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
