"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/AnimatedSection";

type Project = {
  label: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  n8nLink?: string;
  accentColor: string;
};

const projects: Project[] = [
  {
    label: "Project 01 · AI Agent",
    icon: "🤖",
    title: "Job Fit Evaluator + Application Generator",
    description:
      "Drop a Telegram job link. Get tailored resume, cover letter, and fit score - automatically.",
    tags: ["n8n", "OpenAI", "Pinecone", "Apify", "Google Sheets", "RAG"],
    github: "https://github.com/codelifewithharsh/AI-Job-Assistant",
    n8nLink: "https://n8n.io/workflows/14667-evaluate-job-fit-and-generate-application-assets-from-telegram-links-with-openai-pinecone-apify-and-google-sheets/",
    demo: "https://www.instagram.com/reel/DWqYkAeD-Lw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    accentColor: "#0066cc",
  },
  {
    label: "Project 02 · Voice AI",
    icon: "🎙",
    title: "AI Voice Assistant for Flat Booking",
    description:
      "Call an AI. Ask about the flat. Book a visit. Fully automated.",
    tags: ["Vapi", "Voice AI", "Conversational AI", "Automation"],
    github: "https://github.com/codelifewithharsh",
    demo: "https://www.instagram.com/reel/DXMXqN-jzXY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    accentColor: "#2997ff",
  },
  {
    label: "Project 03 · Analysis Tool",
    icon: "📊",
    title: "App Review Analyzer + Report Generator",
    description:
      "Feed it app reviews. Get sentiment analysis and structured insights report in seconds.",
    tags: ["Sentiment Analysis", "NLP", "OpenAI", "Reports"],
    github: "https://github.com/codelifewithharsh",
    accentColor: "#5856d6",
  },
  {
    label: "Project 04 · Curated Resource",
    icon: "⚡",
    title: "100 n8n Workflow Templates",
    description:
      "Hand-picked collection of production-ready n8n templates for AI agents and business automation.",
    tags: ["n8n", "Automation", "AI Workflows", "Open Source"],
    github: "https://github.com/codelifewithharsh/AI-Workflows",
    accentColor: "#ff6b35",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <StaggerItem>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group bg-white rounded-[22px] p-7 flex flex-col gap-5 h-full border border-black/[0.07] hover:border-black/[0.12] transition-colors duration-300 shadow-sm hover:shadow-lg hover:shadow-black/[0.06]"
      >
        {/* Icon + label */}
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-[12px] flex items-center justify-center text-xl"
            style={{ backgroundColor: project.accentColor + "15" }}
          >
            {project.icon}
          </div>
          <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#1d1d1f]/35">
            {project.label}
          </span>
        </div>

        {/* Title + description */}
        <div className="flex-1">
          <h3 className="text-[19px] font-semibold text-[#1d1d1f] tracking-[-0.02em] leading-[1.25] mb-2.5">
            {project.title}
          </h3>
          <p className="text-[15px] text-[#1d1d1f]/55 leading-[1.6]">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-[#1d1d1f]/50 bg-[#f5f5f7] rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-black/[0.05]">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#ebebed] rounded-full px-3.5 py-1.5 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </Link>

          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#ebebed] rounded-full px-3.5 py-1.5 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              Live Demo
            </Link>
          )}

          {project.n8nLink && (
            <Link
              href={project.n8nLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#ebebed] rounded-full px-3.5 py-1.5 transition-colors"
            >
              <Image src="/n8n-logo.svg" alt="n8n" width={14} height={14} />
              View on n8n
            </Link>
          )}
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-[#f5f5f7] py-[100px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0066cc] mb-4">
              Work
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-[40px] md:text-[52px] font-semibold text-[#1d1d1f] tracking-[-0.022em] leading-[1.07] mb-3">
              What I build
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="text-[19px] text-[#1d1d1f]/45 font-light">
              Latest projects
            </p>
          </FadeUp>
        </div>

        {/* 2×2 grid */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </StaggerGrid>

        {/* View all on GitHub */}
        <FadeUp delay={0.1}>
          <div className="text-center mt-10">
            <Link
              href="https://github.com/codelifewithharsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] text-[#1d1d1f]/50 hover:text-[#1d1d1f] transition-colors border border-[#1d1d1f]/15 hover:border-[#1d1d1f]/30 rounded-full px-5 py-2.5"
            >
              View all on GitHub
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
