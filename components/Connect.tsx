"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, SlideLeft, SlideRight } from "@/components/AnimatedSection";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const contactItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "codelifewithharsh@gmail.com",
    href: "mailto:codelifewithharsh@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
    label: "Instagram",
    value: "@codelifewithharsh",
    href: "https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "code-life-with-harsh",
    href: "https://www.linkedin.com/in/code-life-with-harsh/",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    label: "GitHub",
    value: "codelifewithharsh",
    href: "https://github.com/codelifewithharsh",
  },
];

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError("Something went wrong. Please email me directly.");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex flex-col items-center justify-center h-full text-center py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
            className="w-14 h-14 bg-[#0066cc]/10 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </motion.div>
          <h3 className="text-[22px] font-semibold text-[#1d1d1f] mb-2">Message sent!</h3>
          <p className="text-[15px] text-[#1d1d1f]/50">I&apos;ll get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-[12px] font-semibold text-[#1d1d1f]/50 tracking-tight mb-1.5 uppercase">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-[#f5f5f7] text-[#1d1d1f] text-[15px] rounded-[11px] px-4 py-3 outline-none border border-transparent focus:border-[#0071e3] focus:bg-white placeholder:text-[#1d1d1f]/30 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[12px] font-semibold text-[#1d1d1f]/50 tracking-tight mb-1.5 uppercase">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-[#f5f5f7] text-[#1d1d1f] text-[15px] rounded-[11px] px-4 py-3 outline-none border border-transparent focus:border-[#0071e3] focus:bg-white placeholder:text-[#1d1d1f]/30 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-[12px] font-semibold text-[#1d1d1f]/50 tracking-tight mb-1.5 uppercase">What are you building?</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="e.g. I need an AI automation for my sales pipeline, or a mobile app for..."
              className="w-full bg-[#f5f5f7] text-[#1d1d1f] text-[15px] rounded-[11px] px-4 py-3 outline-none border border-transparent focus:border-[#0071e3] focus:bg-white placeholder:text-[#1d1d1f]/30 transition-all duration-200 resize-none"
            />
          </div>
          {error && (
            <p className="text-red-500 text-[13px] text-center -mb-1">{error}</p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className="w-full bg-[#0066cc] hover:bg-[#0071e3] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[17px] font-normal py-[13px] rounded-full transition-colors duration-200 mt-1"
          >
            {loading ? "Sending…" : "Let's build it →"}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function Connect() {
  return (
    <section id="connect" className="bg-[#1d1d1f] py-16 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto rounded-[28px] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">

          {/* Left dark panel - like structure.jpg contact info side */}
          <SlideLeft className="lg:col-span-2 bg-[#272729] px-8 py-[80px] flex flex-col justify-center">
            <FadeUp delay={0.05}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#2997ff] mb-6">
                Contact
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-[36px] md:text-[44px] font-semibold text-white tracking-[-0.022em] leading-[1.1] mb-3">
                Let&apos;s build something that actually ships.
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[15px] text-white/50 leading-[1.65] mb-10">
                Got a business problem AI can solve? Need a production-grade app built fast? I scope quickly, build clean, and deliver things that work on day one.
              </p>
            </FadeUp>

            {/* Contact items */}
            <div className="flex flex-col gap-5">
              {contactItems.map((item, i) => (
                <FadeUp key={item.label} delay={0.2 + i * 0.07}>
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3.5 group"
                  >
                    <div className="w-8 h-8 bg-white/[0.06] group-hover:bg-[#0066cc]/20 rounded-[9px] flex items-center justify-center text-white/50 group-hover:text-[#2997ff] transition-all duration-200 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-white/30 uppercase tracking-wide font-semibold mb-0.5">{item.label}</p>
                      <p className="text-[14px] text-white/70 group-hover:text-white transition-colors duration-200 break-all">{item.value}</p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.55}>
              <p className="text-[12px] text-white/25 mt-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot flex-shrink-0" />
                Typically reply within 24 hours
              </p>
            </FadeUp>
          </SlideLeft>

          {/* Right white panel - form */}
          <SlideRight delay={0.1} className="lg:col-span-3 bg-white px-8 py-[80px] flex flex-col justify-center">
            <FadeUp delay={0.15}>
              <h3 className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight mb-2">
                Start a project
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/45 mb-8">
                Tell me what you&apos;re building - I&apos;ll tell you how fast we can ship it.
              </p>
            </FadeUp>

            <ContactForm />
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
