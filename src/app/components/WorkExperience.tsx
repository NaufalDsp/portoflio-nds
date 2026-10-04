import { BriefcaseBusiness, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { WORK_EXPERIENCES } from "../data/experience";

export function WorkExperience() {
  useTheme();

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ background: "var(--background)" }}>
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
            Career History
          </p>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            Work Experience
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            Hands-on software development experience across government agencies,
            digital platforms, and technology consultancy teams.
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

          <div className="space-y-6">
            {WORK_EXPERIENCES.map((experience, index) => (
              <motion.article
                key={experience.id}
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
                  <BriefcaseBusiness size={17} aria-hidden="true" />
                </div>

                <div
                  className="rounded-lg border p-6 sm:p-7 transition-colors"
                  style={{
                    background: "var(--portfolio-surface)",
                    borderColor: "var(--portfolio-border)",
                  }}>
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <h3
                          className="text-lg font-bold"
                          style={{
                            color: "var(--portfolio-text)",
                          }}>
                          {experience.role}
                        </h3>
                        <span
                          className="rounded px-2 py-0.5 font-mono text-[11px] font-medium"
                          style={{
                            color: "var(--portfolio-accent-strong)",
                            background: "var(--portfolio-accent-soft)",
                          }}>
                          {experience.employmentType}
                        </span>
                        {experience.workMode && (
                          <span
                            className="rounded border px-2 py-0.5 font-mono text-[11px] font-medium"
                            style={{
                              borderColor: "var(--portfolio-border)",
                              color: "var(--portfolio-muted)",
                            }}>
                            {experience.workMode}
                          </span>
                        )}
                      </div>
                      <p
                        className="font-medium text-sm"
                        style={{
                          color: "var(--portfolio-accent)",
                        }}>
                        {experience.company}
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
                      {experience.period}
                    </div>
                  </div>

                  <p
                    className="mb-5 text-sm leading-relaxed"
                    style={{
                      color: "var(--portfolio-muted)",
                    }}>
                    {experience.description}
                  </p>

                  <ul className="grid gap-2.5">
                    {experience.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                        style={{
                          color: "var(--portfolio-muted)",
                        }}>
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--portfolio-accent)" }}
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
