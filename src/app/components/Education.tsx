import {
  CalendarDays,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { EDUCATION } from "../data/education";

export function Education() {
  const { isDark } = useTheme();

  return (
    <section
      id="education"
      className="relative overflow-hidden py-28"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #0D0D12 0%, #0F0F18 100%)"
          : "linear-gradient(180deg, #F8FAFF 0%, #F4F2FF 100%)",
      }}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: isDark
            ? "rgba(79,172,254,0.06)"
            : "rgba(79,172,254,0.1)",
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
              color: "#4FACFE",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}>
            Academic Journey
          </p>
          <h2
            className="mb-4"
            style={{
              color: isDark ? "#E8EAF0" : "#1F2937",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}>
            Education &amp;{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Milestones
            </span>
          </h2>
          <p
            className="mx-auto max-w-xl"
            style={{
              color: isDark ? "#6B7080" : "#6B7280",
              fontSize: "0.95rem",
            }}>
            The academic foundation behind my growth as a software developer.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute bottom-6 left-[19px] top-6 w-px"
            style={{
              background:
                "linear-gradient(to bottom, #4FACFE, #A855F7, transparent)",
            }}
          />

          {EDUCATION.map((education, index) => (
            <motion.article
              key={education.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative pl-16">
              <div
                className="absolute left-0 top-7 flex h-10 w-10 items-center justify-center rounded-full border"
                style={{
                  color: "#4FACFE",
                  background: isDark ? "#11111A" : "#FFFFFF",
                  borderColor: "rgba(79,172,254,0.45)",
                  boxShadow: "0 0 24px rgba(79,172,254,0.2)",
                }}>
                <GraduationCap size={19} />
              </div>

              <div
                className="rounded-2xl border p-6 sm:p-8"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.85)",
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
                    <h3
                      className="mb-2"
                      style={{
                        color: isDark ? "#E8EAF0" : "#1F2937",
                        fontSize: "1.15rem",
                        fontWeight: 750,
                      }}>
                      {education.degree}
                    </h3>
                    <p
                      style={{
                        color: "#A855F7",
                        fontSize: "0.92rem",
                        fontWeight: 650,
                      }}>
                      {education.institution}
                    </p>
                  </div>

                  <div
                    className="flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs"
                    style={{
                      color: isDark ? "#A0A8C0" : "#6B7280",
                      background: isDark
                        ? "rgba(79,172,254,0.06)"
                        : "rgba(79,172,254,0.08)",
                      borderColor: "rgba(79,172,254,0.2)",
                      fontWeight: 600,
                    }}>
                    <CalendarDays size={14} />
                    {education.period}
                  </div>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-[auto_1fr]">
                  <div
                    className="rounded-xl border px-4 py-3"
                    style={{
                      background: isDark
                        ? "rgba(52,211,153,0.06)"
                        : "rgba(52,211,153,0.08)",
                      borderColor: "rgba(52,211,153,0.2)",
                    }}>
                    <p
                      className="mb-1 text-xs uppercase"
                      style={{
                        color: isDark ? "#6B7080" : "#6B7280",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}>
                      GPA
                    </p>
                    <p style={{ color: "#34D399", fontWeight: 750 }}>
                      {education.gpa}
                    </p>
                  </div>

                  <div
                    className="rounded-xl border px-4 py-3"
                    style={{
                      background: isDark
                        ? "rgba(168,85,247,0.05)"
                        : "rgba(168,85,247,0.06)",
                      borderColor: "rgba(168,85,247,0.16)",
                    }}>
                    <p
                      className="mb-1 text-xs uppercase"
                      style={{
                        color: isDark ? "#6B7080" : "#6B7280",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}>
                      Current Status
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: isDark ? "#A0A8C0" : "#6B7280",
                        fontSize: "0.86rem",
                      }}>
                      {education.status}
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {education.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5"
                      style={{
                        color: isDark ? "#8890A8" : "#6B7280",
                        fontSize: "0.86rem",
                      }}>
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-[#4FACFE]"
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
