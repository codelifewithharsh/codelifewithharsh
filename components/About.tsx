"use client";

import { motion } from "framer-motion";
import { SlideLeft, SlideRight, FadeUp } from "@/components/AnimatedSection";

const achievements = [
  {
    icon: "🎤",
    title: "Tech Talk at Zeta",
    desc: "Why your app makes users wait for data it already has and how to fix it.",
    color: "#0066cc",
  },
  {
    icon: "🏆",
    title: "5+ Impact Awards",
    desc: "Recognized for shipping results at Zeta",
    color: "#2997ff",
  },
  {
    icon: "🎓",
    title: "BITS Pilani",
    desc: "Engineering graduate",
    color: "#5856d6",
  },
  {
    icon: "🤝",
    title: "Available for Projects",
    desc: "AI automation · Websites · Apps",
    color: "#ff6b35",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#272729] py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Story */}
          <SlideLeft>
            <div>
              <FadeUp delay={0.05}>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#2997ff] mb-6">
                  About
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="text-[34px] md:text-[42px] font-semibold text-white tracking-[-0.022em] leading-[1.15] mb-8">
                  Building scalable{" "}
                  <span className="text-white/45">applications</span>{" "}
                  and{" "}
                  <span className="text-white/45">AI products</span>{" "}
                  that matter
                </h2>
              </FadeUp>

              <FadeUp delay={0.18}>
                <p className="text-[17px] text-white/60 leading-[1.7] mb-8">
                  2 years at Zeta shipping apps used by 10+ million people.
                  BITS Pilani grad who got bored with just frontend
                  so I started building AI products and automation
                  workflows that solve real business problems.
                </p>
              </FadeUp>

              <FadeUp delay={0.24}>
                <p className="text-[17px] text-white/60 leading-[1.7] mb-10">
                  RAG pipelines. Voice agents. n8n automation.
                  I don&apos;t wait for someone to build the tools I need
                  I build them, then teach others how on{" "}
                  <span className="text-[#2997ff]">@codelifewithharsh</span>.
                </p>
              </FadeUp>

              {/* "Our Value" style dark card - like structure.jpg */}
              <FadeUp delay={0.3}>
                <div className="bg-[#1d1d1f] rounded-[18px] p-6 border border-white/[0.06]">
                  <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">
                    What I believe
                  </p>
                  <p className="text-[17px] text-white/75 leading-[1.65] italic">
                    &ldquo;Every product I ship and every reel I post is about
                    lowering the barrier between great ideas and working
                    solution.&rdquo;
                  </p>
                </div>
              </FadeUp>
            </div>
          </SlideLeft>

          {/* Right: Achievement cards */}
          <SlideRight delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((a, i) => (
                <FadeUp key={a.title} delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
                    transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="group bg-[#1d1d1f] hover:bg-[#252527] rounded-[18px] p-5 border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300 cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl mb-4"
                      style={{ backgroundColor: a.color + "20" }}
                    >
                      {a.icon}
                    </div>
                    <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">
                      {a.title}
                    </h3>
                    <p className="text-[13px] text-white/40 leading-snug">{a.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>

            {/* Vision card - like structure.jpg "Our Vision" */}
            <FadeUp delay={0.45}>
              <div className="mt-4 bg-[#0066cc] rounded-[18px] p-6">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/70 mb-2">
                  Working with me
                </p>
                <p className="text-[17px] font-semibold text-white leading-[1.4] mb-3">
                  AI Automation · Business Websites · Apps
                </p>
                <p className="text-[13px] text-white/70">
                  Got a business problem? I&apos;ll build the AI solution that solves it.
                </p>
              </div>
            </FadeUp>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
