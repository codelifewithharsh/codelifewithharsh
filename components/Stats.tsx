"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp, FadeUp } from "@/components/AnimatedSection";

const stats = [
  { value: 2, suffix: "+", label: "Years at Zeta", description: "SDE experience" },
  { value: 4, suffix: "+", label: "AI Projects", description: "shipped to production" },
  { value: 100, suffix: "+", label: "n8n Templates", description: "curated & open source" },
  { value: 52, suffix: "", label: "Reels / year", description: "posting every week" },
];

function StatItem({ value, suffix, label, description, delay }: typeof stats[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const count = useCountUp(value, inView);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-6 py-8"
    >
      <FadeUp delay={delay}>
        <div>
          <p className="text-[44px] md:text-[52px] font-semibold text-[#1d1d1f] leading-none tracking-[-0.03em] mb-1 stat-hover">
            {count}{suffix}
          </p>
          <p className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight mb-0.5">{label}</p>
          <p className="text-[13px] text-[#1d1d1f]/45">{description}</p>
        </div>
      </FadeUp>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#f5f5f7] border-b border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/[0.06]">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
