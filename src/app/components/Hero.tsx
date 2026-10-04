import { ArrowRight, MessageSquare } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { PROFESSIONAL_TITLES, SOCIAL_LINKS } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { TechOrb } from "./TechOrb";
import { TypewriterText } from "./TypewriterText";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const HERO_STATS = [
  {
    value: "3+",
    label: "Internship & Industry Exp.",
  },
  {
    value: "8+",
    label: "Modern Web Projects",
  },
  {
    value: "10",
    label: "Verified Certifications",
  },
  {
    value: "3.91",
    suffix: "/ 4.00",
    label: "Informatics Eng. GPA (UNS)",
  },
];

import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { CV_URL, PROFESSIONAL_TITLES, SOCIAL_LINKS } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { HeroCodeCard } from "./HeroCodeCard";
import { TypewriterText } from "./TypewriterText";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const HERO_STATS = [
  {
    value: "3+",
    label: "Industry Internships",
  },
  {
    value: "8+",
    label: "Web Applications",
  },
  {
    value: "10",
    label: "Verified Credentials",
  },
  {
    value: "3.91",
    suffix: "/ 4.00",
    label: "Informatics Eng. GPA (UNS)",
  },
];

export function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16 lg:py-32"
      style={{
        background: "var(--background)",
      }}>
      {/* Subtle architectural grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--portfolio-border) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability & Location Pill */}
            <motion.div
              {...fadeUp(0.08)}
              className="flex flex-wrap items-center gap-2.5 mb-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
                style={{
                  background: isDark
                    ? "rgba(20, 107, 102, 0.12)"
                    : "var(--portfolio-accent-soft)",
                  borderColor: isDark
                    ? "rgba(121, 198, 188, 0.3)"
                    : "rgba(20, 107, 102, 0.25)",
                  color: isDark
                    ? "var(--portfolio-accent)"
                    : "var(--portfolio-accent-strong)",
                }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                </span>
                Available for software engineering roles
              </div>

              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-muted)",
                }}>
                <MapPin size={12} aria-hidden="true" />
                Surakarta, Indonesia
              </div>
            </motion.div>

            {/* Authoritative Clean Headline */}
            <motion.div {...fadeUp(0.16)}>
              <h1
                className="tracking-tight font-extrabold"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  lineHeight: 1.08,
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                Naufal Dwi Saputro
                <span
                  style={{ color: "var(--portfolio-accent)" }}
                  aria-hidden="true">
                  .
                </span>
              </h1>
            </motion.div>

            {/* Sub-headline with clean typewriter */}
            <motion.div {...fadeUp(0.24)} className="mt-4">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs uppercase tracking-wider font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  Role:
                </span>
                <TypewriterText
                  words={PROFESSIONAL_TITLES}
                  className="min-w-[20ch] font-mono text-sm sm:text-base font-semibold"
                  style={{
                    color: "var(--portfolio-text)",
                  }}
                />
              </div>
            </motion.div>

            {/* Grounded & Concrete Bio */}
            <motion.p
              {...fadeUp(0.32)}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed font-normal"
              style={{
                color: "var(--portfolio-muted)",
              }}>
              Full Stack Developer specializing in TypeScript, React, Vue.js,
              and Laravel. Focused on clean architecture, scalable APIs, and
              building thoughtful, production-ready web software.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center gap-3.5 mt-8">
              <button
                type="button"
                onClick={() => scrollToSection("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--portfolio-accent)",
                  color: "var(--portfolio-accent-contrast)",
                  boxShadow: "0 2px 12px rgba(20, 107, 102, 0.25)",
                }}>
                View Projects
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-text)",
                }}>
                <Mail size={16} aria-hidden="true" />
                Contact Me
              </button>

              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:text-teal-600 dark:hover:text-teal-400"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-muted)",
                }}>
                <Download size={15} aria-hidden="true" />
                Resume (CV)
              </a>
            </motion.div>

            {/* Quick Stats Counter */}
            <motion.div
              {...fadeUp(0.48)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t w-full"
              style={{
                borderColor: "var(--portfolio-border)",
              }}>
              {HERO_STATS.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-2xl sm:text-3xl font-bold tracking-tight"
                      style={{
                        color: "var(--portfolio-text)",
                        fontVariantNumeric: "tabular-nums",
                      }}>
                      {item.value}
                    </span>
                    {item.suffix && (
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--portfolio-muted)" }}>
                        {item.suffix}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xs font-medium leading-snug mt-1"
                    style={{ color: "var(--portfolio-muted)" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              {...fadeUp(0.56)}
              className="flex items-center gap-3 mt-8">
              <span
                className="text-xs uppercase tracking-wider font-semibold font-mono"
                style={{
                  color: "var(--portfolio-muted)",
                }}>
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                    style={{
                      borderColor: "var(--portfolio-border)",
                      background: "var(--portfolio-surface)",
                      color: "var(--portfolio-muted)",
                    }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Technical Editor Card (5 cols) */}
          <div className="lg:col-span-5 hidden md:flex items-center justify-center lg:justify-end">
            <HeroCodeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
