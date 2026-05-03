"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Props as GitHubCalendarProps } from "react-github-calendar";
import Image from "next/image";
import { FadeUp, StaggerGrid, StaggerItem, useCountUp } from "@/components/AnimatedSection";
import OrbitalRing, { LOGO_DATA } from "@/components/OrbitalRing";
import resourcesData from "@/data/resources.json";
import weeklyPickData from "@/data/weekly-pick.json";

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

const FILTER_TABS = ["All", "Automation", "LLMs", "Voice AI", "Frontend", "Learning", "My Stack"];

const FILTER_TO_CATEGORY: Record<string, string> = {
  Automation: "Automation & Workflows",
  LLMs: "LLMs & APIs",
  "Voice AI": "Voice AI",
  Frontend: "Frontend + AI",
  Learning: "Learning Paths",
  "My Stack": "My Daily Stack",
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

const categorySlug = (cat: string) =>
  cat
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/* ── Enhancement 1: Changelog strip ── */
function ChangelogStrip() {
  return (
    <FadeUp delay={0.05}>
      <div className="flex items-center justify-between gap-3 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-2 mt-4 mb-0">
        <span className="text-[12px] text-white/45 truncate">
          🆕{" "}
          <span className="text-white/65">Last updated: May 2026</span>
          {" — "}Added n8n Template Browser + 12 new resources
        </span>
        <a
          href="#changelog"
          className="text-[11px] text-[#2997ff] hover:text-[#2997ff]/70 transition-colors whitespace-nowrap flex-shrink-0"
        >
          View changelog →
        </a>
      </div>
    </FadeUp>
  );
}

/* ── Enhancement 2: Weekly pick card ── */
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

/* ── Enhancement 5: Stats bar ── */
function StatCounter({
  value,
  suffix,
  label,
  sublabel,
  delay,
  isText,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
  isText?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const count = useCountUp(value, inView);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-8">
      <FadeUp delay={delay}>
        <div>
          <p className="text-[40px] md:text-[48px] font-semibold text-white leading-none tracking-[-0.03em] mb-1 stat-hover">
            {isText ? suffix : `${count}${suffix}`}
          </p>
          <p className="text-[14px] font-semibold text-white/70 tracking-tight mb-0.5">{label}</p>
          <p className="text-[12px] text-white/30">{sublabel}</p>
        </div>
      </FadeUp>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { value: 40,  suffix: "+",  label: "Resources",       sublabel: "handpicked by me",     isText: false },
    { value: 6,   suffix: "",   label: "Categories",      sublabel: "from AI to automation", isText: false },
    { value: 0,   suffix: "Weekly", label: "Updated",     sublabel: "new picks every week",  isText: true  },
    { value: 100, suffix: "%",  label: "Free",            sublabel: "no paywalls ever",       isText: false },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06] border border-white/[0.06] rounded-[18px] overflow-hidden bg-white/[0.02]">
        {stats.map((s, i) => (
          <StatCounter key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

/* ── Enhancement 1: Changelog section (bottom) ── */
function ChangelogSection() {
  const entries = [
    {
      date: "May 2026",
      text: "Toolkit launched. 40+ resources across 6 categories.",
    },
    {
      date: "Coming soon",
      text: "Template browser, AI tool recommender, weekly picks.",
    },
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

/* ── Enhancement 3 + 4: Resource card with daily-use badge + level dot ── */
function ResourceCard({ resource }: { resource: Resource }) {
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
    <StaggerItem>
      <motion.article
        id={resource.id}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group bg-[#272729] rounded-[18px] p-5 flex flex-col gap-3.5 border border-white/[0.06] hover:border-[#2997ff]/35 hover:shadow-[0_8px_32px_rgba(41,151,255,0.07)] transition-all duration-300 h-full relative"
      >
        {resource.isFeatured && (
          <span className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.1em] uppercase text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20 rounded-full px-2 py-0.5">
            Featured
          </span>
        )}

        {/* Emoji + title + description */}
        <div className="flex items-start gap-3">
          <span className="text-[22px] flex-shrink-0 mt-0.5 leading-none">{resource.emoji}</span>
          <div className="flex-1 min-w-0 pr-10">
            <h3 className="text-[14px] font-semibold text-white tracking-[-0.01em] leading-[1.35] mb-1">
              {resource.title}
            </h3>
            <p className="text-[12px] text-white/40 leading-[1.55]">{resource.description}</p>
          </div>
        </div>

        {/* Enhancement 3: "I use this daily" badge */}
        {resource.iDailyUse && (
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#34c759] bg-[#34c759]/10 border border-[#34c759]/20 rounded-full px-2.5 py-0.5">
              ✓ I use this daily
            </span>
          </div>
        )}

        {/* Type badge + tags + Enhancement 4: level dot */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`text-[10px] font-semibold tracking-[0.06em] uppercase rounded-full px-2.5 py-0.5 ${typeStyle.bg} ${typeStyle.text}`}
          >
            {resource.type}
          </span>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-white/35 bg-white/[0.06] rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
          <span
            className={`ml-auto w-2 h-2 rounded-full flex-shrink-0 ${levelCfg.dot}`}
            title={levelCfg.label}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 mt-auto border-t border-white/[0.05]">
          {/* Copy link button */}
          <motion.button
            onClick={handleCopy}
            title="Copy link to this card"
            animate={copied ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.25 }}
            className={`inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2.5 py-1.5 transition-all duration-200 flex-shrink-0 ${
              copied
                ? "text-[#34c759] bg-[#34c759]/10"
                : "text-white/35 hover:text-white bg-white/[0.04] hover:bg-white/[0.09]"
            }`}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            )}
            <AnimatePresence mode="wait">
              <motion.span
                key={copied ? "copied" : "copy"}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {copied ? "Copied!" : ""}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {resource.youtubeLink && (
            <a
              href={resource.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/55 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-full px-2.5 py-1.5 transition-colors"
            >
              ▶ YouTube
            </a>
          )}
          {resource.instagramLink && (
            <a
              href={resource.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/55 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-full px-2.5 py-1.5 transition-colors"
            >
              📱 Reel
            </a>
          )}
          {resource.link !== "#" ? (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-white/55 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-full px-2.5 py-1.5 transition-colors ml-auto"
            >
              → Open
            </a>
          ) : (
            <span className="text-[11px] text-white/20 ml-auto px-2.5 py-1.5">Coming soon</span>
          )}
        </div>
      </motion.article>
    </StaggerItem>
  );
}

/* ── Main page component ── */
export default function ToolkitContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const resources = resourcesData as Resource[];
  const weeklyPick = weeklyPickData as WeeklyPick;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter !== "All") {
      const categoryName = FILTER_TO_CATEGORY[filter];
      const slug = categorySlug(categoryName);
      const el = document.getElementById(`category-${slug}`);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const handleSubscribe = () => {
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="bg-[#1d1d1f] min-h-screen pt-[52px]">

      {/* Breadcrumb + Enhancement 1: changelog strip */}
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
        <ChangelogStrip />
      </div>

      {/* Hero — full-width section with background image + 2-col layout */}
      <section className="relative overflow-hidden pt-12 pb-8 md:pt-14 md:pb-10">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.75) saturate(0.8)" }}
            priority
          />
          {/* Gradient overlay: blends image into site's #1d1d1f background */}
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

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex items-center min-h-[560px] md:min-h-[620px]">
          {/* Left column: text */}
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

            {/* Filter tabs */}
            <FadeUp delay={0.16}>
              <div className="flex flex-wrap gap-2 mb-4">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleFilterChange(tab)}
                    className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                      activeFilter === tab
                        ? "bg-[#0066cc] text-white border-[#0066cc]"
                        : "text-white/50 border-white/[0.12] hover:text-white hover:border-white/25 bg-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </FadeUp>

            {/* Difficulty legend */}
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { emoji: "🟢", label: "Beginner" },
                  { emoji: "🟡", label: "Intermediate" },
                  { emoji: "🔴", label: "Advanced" },
                ].map(({ emoji, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/30">
                    {emoji} {label}
                  </span>
                ))}
              </div>
            </FadeUp>

            {/* Mobile: static logo grid (hidden on md+) */}
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

          {/* Right column: orbital animation (desktop only, clips overflow) */}
          <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden">
            <OrbitalRing />
          </div>
        </div>
      </section>

      {/* Enhancement 5: Stats bar + Enhancement 2: Weekly pick + Category sections */}
      <div className="max-w-[1200px] mx-auto px-6 pb-6">
        <StatsBar />
        <WeeklyPickCard pick={weeklyPick} />

        {CATEGORIES.map((category) => {
          const categoryResources = resources.filter((r) => r.category === category);
          const isActive =
            activeFilter === "All" || FILTER_TO_CATEGORY[activeFilter] === category;

          return (
            <section
              key={category}
              id={`category-${categorySlug(category)}`}
              className="mb-16 transition-opacity duration-500"
              style={{ opacity: isActive ? 1 : 0.25 }}
            >
              <FadeUp>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[20px] leading-none">{CATEGORY_ICONS[category]}</span>
                  <h2 className="text-[22px] font-semibold text-white tracking-[-0.018em]">
                    {category}
                  </h2>
                  <span className="text-[12px] text-white/25 tabular-nums">
                    {categoryResources.length}
                  </span>
                </div>
              </FadeUp>

              <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </StaggerGrid>
            </section>
          );
        })}
      </div>

      {/* GitHub activity section */}
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

      {/* Enhancement 1: Changelog section */}
      <ChangelogSection />

      {/* Email subscribe section */}
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
