import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { TECHNOLOGIES } from "../data/technologies";
import type { Technology } from "../types/portfolio";

function TechCard({ tech, index }: { tech: Technology; index: number }) {
  const { icon: Icon, name, color } = tech;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col items-center justify-center gap-2.5 rounded-lg border p-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--portfolio-surface)",
        borderColor: "var(--portfolio-border)",
      }}>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-md transition-colors"
        style={{
          color: color,
        }}>
        <Icon size={28} aria-hidden="true" />
      </div>

      <span
        className="font-mono text-xs font-semibold tracking-tight text-center truncate max-w-full"
        style={{
          color: "var(--portfolio-text)",
        }}>
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  useTheme();

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ background: "var(--background)" }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--portfolio-accent)" }}>
            Stack &amp; Toolkit
          </p>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            Skills &amp; Technologies
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            Languages, frameworks, databases, and tooling I use daily to build
            robust, maintainable applications.
          </p>
        </motion.div>

        {/* Tech Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {TECHNOLOGIES.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
