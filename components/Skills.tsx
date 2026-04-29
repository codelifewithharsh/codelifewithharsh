"use client";

import { motion } from "framer-motion";
import { FadeUp, SlideLeft, SlideRight } from "@/components/AnimatedSection";

type Group = { title: string; color: string; skills: string[]; proof?: string; badge?: string; colSpan?: boolean };

const groups: Group[] = [
  {
    title: "Mobile Development",
    color: "#0066cc",
    skills: ["Flutter", "React Native", "iOS", "Firebase", "ISAR DB", "Profiling", "Clean Architecture", "Cross-platform Testing"],
    proof: "Built fintech mobile apps now used by 10M+ users in production",
  },
  {
    title: "Web Development",
    color: "#0066cc",
    skills: ["Next.js", "React", "Node.js", "TypeScript", "Redux", "REST APIs", "MongoDB", "Supabase", "Vercel"],
    proof: "Built and shipped full-stack web products from scratch",
  },
  {
    title: "AI & Automation",
    color: "#0066cc",
    skills: ["n8n", "LLM APIs (Claude, GPT)", "RAG", "Voice AI", "Embeddings", "Pinecone", "Prompt Engineering", "Apify", "OpenAI"],
    proof: "4 AI products live - agents, voice bots, automation workflows",
  },
  {
    title: "Engineering Depth",
    color: "#5856d6",
    skills: ["Clean Architecture", "System Design", "Data Flow Optimization", "Docker", "Git", "Operating Systems", "Data Structures & Algorithms"],
    proof: "Production-grade systems built for scale and zero failure tolerance",
    badge: "🏦 Fintech · NPCI Compliance · Financial-grade reliability",
  },
];

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
          className={`rounded-[18px] p-5 border border-white/[0.06] relative overflow-hidden cursor-default${group.colSpan ? " col-span-2" : ""}`}
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

          <div className="flex flex-wrap gap-1.5 mb-3">
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

          {group.proof && (
            <p className="text-[11px] text-white/35 italic mt-1">{group.proof}</p>
          )}
          {group.badge && (
            <p className="text-[10px] text-white/50 mt-2 bg-white/[0.08] rounded-full px-2.5 py-1 inline-block">{group.badge}</p>
          )}
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
                Three pillars - mobile, web, and AI.{" "}
                <br />All production-grade. All battle-tested.
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
                  I&apos;ve shipped code that 10+ million people use daily.
                  Now I&apos;m applying that same production-grade thinking
                  to AI because most AI tools are demos,
                  and I build things that aren&apos;t.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="bg-[#272729] rounded-[18px] p-6 border border-white/[0.06]">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">
                  Currently building
                </p>
                <div className="flex flex-wrap gap-2">
                  {["AI automation tools", "RAG pipelines", "AI Agents", "Business Automation Workflows"].map((item) => (
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
              <div className="bg-[#272729] rounded-[18px] p-6 border border-white/[0.06]">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-2">
                  Production scale
                </p>
                <p className="text-[32px] font-semibold text-white leading-none mb-1">
                  10M+
                </p>
                <p className="text-[14px] text-white/50 leading-snug">
                  Users on apps I&apos;ve personally shipped and maintained
                </p>
              </div>
            </FadeUp>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
