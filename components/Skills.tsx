"use client";

import { motion } from "framer-motion";
import { FadeUp, SlideLeft, SlideRight } from "@/components/AnimatedSection";

type Group = { title: string; color: string; skills: string[] };

const groups: Group[] = [
  {
    title: "Frontend",
    color: "#0066cc",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "AI & Automation",
    color: "#2997ff",
    skills: [
      "LLM APIs (Claude, GPT)",
      "RAG",
      "Embeddings",
      "Voice AI (Vapi)",
      "n8n workflows",
      "Prompt Engineering",
    ],
  },
  {
    title: "Tools & Infrastructure",
    color: "#5856d6",
    skills: ["Git", "Vercel", "Node.js", "REST APIs"],
  },
  {
    title: "Currently Learning",
    color: "#ff6b35",
    skills: ["Fine-tuning models", "Multimodal AI"],
  },
];

/* Left visual — skill group tiles (like the image grid in structure.jpg benefits section) */
function SkillsVisual() {
  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {groups.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: gi * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="rounded-[18px] p-5 border border-white/[0.06] relative overflow-hidden cursor-default"
          style={{ background: "#2a2a2c" }}
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ backgroundColor: group.color }}
          />

          <h3
            className="text-[12px] font-semibold tracking-[0.08em] uppercase mb-4"
            style={{ color: group.color }}
          >
            {group.title}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill, si) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1 + si * 0.05 + 0.2 }}
                className="text-[12px] font-normal text-white/65 border border-white/[0.09] rounded-full px-2.5 py-1 hover:text-white hover:border-white/25 transition-colors duration-150"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-[#1d1d1f] py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <FadeUp>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#2997ff] mb-4">
              Expertise
            </p>
          </FadeUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <FadeUp delay={0.08}>
              <h2 className="text-[40px] md:text-[52px] font-semibold text-white tracking-[-0.022em] leading-[1.07]">
                Skills
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-[17px] text-white/40 font-light max-w-[360px] text-right hidden md:block">
                Technologies and tools I use to build AI products and content.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Split: visual left, extra content right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left 3/5 — grid visual */}
          <SlideLeft className="lg:col-span-3">
            <SkillsVisual />
          </SlideLeft>

          {/* Right 2/5 — context + current focus */}
          <SlideRight delay={0.15} className="lg:col-span-2 flex flex-col gap-5">
            <FadeUp delay={0.1}>
              <div className="bg-[#272729] rounded-[18px] p-6 border border-white/[0.06]">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">
                  What drives me
                </p>
                <p className="text-[17px] text-white/70 leading-[1.65]">
                  I combine solid frontend foundations with emerging AI tools to
                  ship products that actually work — not just demos.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="bg-[#272729] rounded-[18px] p-6 border border-white/[0.06]">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">
                  Current focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Fine-tuning models", "Multimodal AI", "RAG pipelines"].map((item) => (
                    <span
                      key={item}
                      className="text-[13px] text-[#2997ff] border border-[#2997ff]/25 rounded-full px-3 py-1.5 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="bg-[#0066cc] rounded-[18px] p-6">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/70 mb-2">
                  Experience
                </p>
                <p className="text-[32px] font-semibold text-white leading-none mb-1">
                  2+ yrs
                </p>
                <p className="text-[14px] text-white/70">
                  SDE at Zeta · BITS Pilani graduate
                </p>
              </div>
            </FadeUp>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
