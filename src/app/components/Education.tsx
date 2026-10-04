import { CalendarDays, CheckCircle2, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { EDUCATION } from "../data/education";

export function Education() {
  useTheme();

  return (
    <section
      id="education"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--portfolio-accent)" }}>
            Academic Foundation
          </p>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            Education &amp; Milestones
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            The formal engineering background and coursework supporting my work
            as a software developer.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[19px] top-6 w-px"
            style={{
              background: "var(--portfolio-border)",
            }}
          />

          {EDUCATION.map((education, index) => (
            <motion.article
              key={education.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative pl-14 sm:pl-16">
              <div
                className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border shadow-xs"
                style={{
                  color: "var(--portfolio-accent)",
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <GraduationCap size={18} aria-hidden="true" />
              </div>

              <div
                className="rounded-lg border p-6 sm:p-7 transition-colors"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{
                        color: "var(--portfolio-text)",
                      }}>
                      {education.degree}
                    </h3>
                    <p
                      className="font-medium text-sm mt-0.5"
                      style={{
                        color: "var(--portfolio-accent)",
                      }}>
                      {education.institution}
                    </p>
                  </div>

                  <div
                    className="flex w-fit shrink-0 items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-mono"
                    style={{
                      color: "var(--portfolio-muted)",
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                    }}>
                    <CalendarDays size={13} aria-hidden="true" />
                    {education.period}
                  </div>
                </div>

                <div className="mb-6 grid gap-3.5 sm:grid-cols-[auto_1fr]">
                  <div
                    className="rounded border px-3.5 py-2.5"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                    }}>
                    <p
                      className="font-mono text-[10px] uppercase font-bold tracking-wider"
                      style={{
                        color: "var(--portfolio-muted)",
                      }}>
                      Cumulative GPA
                    </p>
                    <p
                      className="font-mono font-bold text-base mt-0.5"
                      style={{ color: "var(--portfolio-accent)" }}>
                      {education.gpa}
                    </p>
                  </div>

                  <div
                    className="rounded border px-3.5 py-2.5"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                    }}>
                    <p
                      className="font-mono text-[10px] uppercase font-bold tracking-wider"
                      style={{
                        color: "var(--portfolio-muted)",
                      }}>
                      Status
                    </p>
                    <p
                      className="text-xs sm:text-sm leading-relaxed mt-0.5"
                      style={{
                        color: "var(--portfolio-muted)",
                      }}>
                      {education.status}
                    </p>
                  </div>
                </div>

                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {education.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed"
                      style={{
                        color: "var(--portfolio-muted)",
                      }}>
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--portfolio-accent)" }}
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
