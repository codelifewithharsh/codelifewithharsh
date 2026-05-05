"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "Studio", href: "#content" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (pathname === "/" && href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("#")) {
      window.location.href = "/" + href;
    } else {
      router.push(href);
    }
  };

  const handleConnectClick = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#connect";
    }
  };

  const isToolkitPage = pathname === "/toolkit";

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-black"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[52px] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="hover:opacity-70 transition-opacity duration-200 flex-shrink-0"
            aria-label="Home"
          >
            <Image
              src="/logo.png"
              alt="codelifewithharsh"
              width={160}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
          </button>

          {/* Desktop nav - centered */}
          <ul className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="nav-link text-white/70 text-[12px] tracking-[-0.12px] hover:text-white transition-colors duration-200 pb-0.5"
                >
                  {link.label}
                </button>
              </li>
            ))}

            {/* Toolkit - distinct styled link */}
            <li>
              <Link
                href="/toolkit"
                className={`inline-flex items-center gap-1.5 text-[12px] tracking-[-0.12px] px-2.5 py-[5px] rounded-full border transition-all duration-200 ${
                  isToolkitPage
                    ? "text-[#2997ff] border-[#2997ff]/50 bg-[#2997ff]/10"
                    : "text-white/65 border-white/[0.14] hover:text-[#2997ff] hover:border-[#2997ff]/40 hover:bg-[#2997ff]/[0.07]"
                }`}
              >
                <span className="text-[#2997ff] text-[9px] leading-none">✦</span>
                Toolkit
              </Link>
            </li>
          </ul>

          {/* Right: CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleConnectClick}
              className="hidden sm:inline-flex items-center bg-[#0066cc] hover:bg-[#0071e3] text-white text-[12px] font-medium px-4 py-[7px] rounded-full transition-all duration-200 active:scale-95 flex-shrink-0"
            >
              Let&apos;s connect
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5 -mr-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                className="block w-[18px] h-[1.5px] bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-[18px] h-[1.5px] bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                className="block w-[18px] h-[1.5px] bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[52px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/[0.08] lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left text-white/80 text-[15px] py-3.5 border-b border-white/[0.08] last:border-0 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}

              {/* Toolkit mobile */}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/toolkit"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 text-[15px] py-3.5 border-b border-white/[0.08] text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
                >
                  <span className="text-[11px]">✦</span>
                  Toolkit
                </Link>
              </motion.li>

              <li className="pt-4">
                <button
                  onClick={handleConnectClick}
                  className="w-full bg-[#0066cc] text-white text-[15px] py-3 rounded-full font-medium"
                >
                  Let&apos;s connect
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
