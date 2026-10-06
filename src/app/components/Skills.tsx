import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { TECHNOLOGY_GROUPS } from "../data/technologies";
import type { Technology } from "../types/portfolio";

function TechCard({ tech, index }: { tech: Technology; index: number }) {
  const { icon: Icon, name, color } = tech;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)]"
      style={{
        background: "var(--portfolio-surface)",
        borderColor: "var(--portfolio-border)",
      }}>
      <div
        className="flex h-9 w-9 items-center justify-center rounded-md transition-transform duration-200 group-hover:scale-110"
        style={{
          color: color,
        }}>
        <Icon size={26} aria-hidden="true" />
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
            Categorized tools, frameworks, and creative software I use across
            engineering and digital production.
          </p>
        </motion.div>

        {/* Categorized Tech Sections */}
        <div className="space-y-10 sm:space-y-12">
          {TECHNOLOGY_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
              className="space-y-4">
              <div
                className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-2.5"
                style={{ borderColor: "var(--portfolio-border)" }}>
                <div>
                  <h3
                    className="text-base sm:text-lg font-bold"
                    style={{ color: "var(--portfolio-text)" }}>
                    {group.category}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mt-0.5"
                    style={{ color: "var(--portfolio-muted)" }}>
                    {group.description}
                  </p>
                </div>
                <span
                  className="font-mono text-xs font-semibold shrink-0"
                  style={{ color: "var(--portfolio-accent)" }}>
                  {group.technologies.length} tools
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
                {group.technologies.map((tech, i) => (
                  <TechCard key={tech.name} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
