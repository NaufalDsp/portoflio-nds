import { BriefcaseBusiness, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { WORK_EXPERIENCES } from "../data/experience";

export function WorkExperience() {
  const { isDark } = useTheme();

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-28"
      style={{ background: isDark ? "#0D0D12" : "#F8FAFF" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background: isDark
            ? "rgba(168,85,247,0.06)"
            : "rgba(168,85,247,0.1)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center">
          <p
            className="mb-3 text-xs uppercase tracking-widest"
            style={{
              color: "#A855F7",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}>
            Professional Journey
          </p>
          <h2
            className="mb-4"
            style={{
              color: isDark ? "#E8EAF0" : "#1F2937",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}>
            Work{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Experience
            </span>
          </h2>
          <p
            className="mx-auto max-w-xl"
            style={{
              color: isDark ? "#6B7080" : "#6B7280",
              fontSize: "0.95rem",
            }}>
            A timeline of the teams, products, and real-world challenges that
            shaped my development experience.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px"
            style={{
              background:
                "linear-gradient(to bottom, #4FACFE, #A855F7, transparent)",
            }}
          />

          <div className="space-y-8">
            {WORK_EXPERIENCES.map((experience, index) => (
              <motion.article
                key={experience.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative pl-16">
                <div
                  className="absolute left-0 top-7 flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{
                    color: index === 0 ? "#4FACFE" : "#A855F7",
                    background: isDark ? "#11111A" : "#FFFFFF",
                    borderColor:
                      index === 0
                        ? "rgba(79,172,254,0.45)"
                        : "rgba(168,85,247,0.45)",
                    boxShadow:
                      index === 0
                        ? "0 0 24px rgba(79,172,254,0.2)"
                        : "0 0 24px rgba(168,85,247,0.2)",
                  }}>
                  <BriefcaseBusiness size={18} />
                </div>

                <div
                  className="rounded-2xl border p-6 sm:p-8"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.88)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.07)",
                    boxShadow: isDark
                      ? "0 8px 40px rgba(0,0,0,0.3)"
                      : "0 8px 40px rgba(79,70,120,0.08)",
                    backdropFilter: "blur(14px)",
                  }}>
                  <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3
                          style={{
                            color: isDark ? "#E8EAF0" : "#1F2937",
                            fontSize: "1.15rem",
                            fontWeight: 750,
                          }}>
                          {experience.role}
                        </h3>
                        <span
                          className="rounded-full border px-2.5 py-1 text-[0.68rem] uppercase"
                          style={{
                            color: "#34D399",
                            background: "rgba(52,211,153,0.07)",
                            borderColor: "rgba(52,211,153,0.2)",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                          }}>
                          {experience.employmentType}
                        </span>
                      </div>
                      <p
                        style={{
                          color: index === 0 ? "#4FACFE" : "#A855F7",
                          fontSize: "0.92rem",
                          fontWeight: 650,
                        }}>
                        {experience.company}
                      </p>
                    </div>

                    <div
                      className="flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs"
                      style={{
                        color: isDark ? "#A0A8C0" : "#6B7280",
                        background: isDark
                          ? "rgba(255,255,255,0.035)"
                          : "rgba(0,0,0,0.025)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.09)"
                          : "rgba(0,0,0,0.08)",
                        fontWeight: 600,
                      }}>
                      <CalendarDays size={14} />
                      {experience.period}
                    </div>
                  </div>

                  <p
                    className="mb-6 leading-relaxed"
                    style={{
                      color: isDark ? "#8890A8" : "#6B7280",
                      fontSize: "0.9rem",
                    }}>
                    {experience.description}
                  </p>

                  <ul className="grid gap-3">
                    {experience.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2.5"
                        style={{
                          color: isDark ? "#A0A8C0" : "#5B6472",
                          fontSize: "0.86rem",
                        }}>
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-[#34D399]"
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
