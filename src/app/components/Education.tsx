import { useMemo, useRef } from "react";
import { Award, CalendarDays, CheckCircle2, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { getEducation } from "../data/education";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Education() {
  const { language, t } = useLanguage();
  const educationEntries = useMemo(() => getEducation(language), [language]);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        ".edu-header-reveal",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".edu-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".edu-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".gsap-edu-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-edu-card",
            start: "top 82%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [language] },
  );

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* ============================================================
            ASYMMETRIC EDITORIAL HEADER (04 // ACADEMIC FOUNDATION)
           ============================================================ */}
        <div className="edu-header-wrap mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="edu-header-reveal flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  04 // {t.education.overline}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [UNS · CUM LAUDE TRACK]
                </span>
              </div>

              <h2
                className="edu-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {t.education.title}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; Foundation.
                </span>
              </h2>
            </div>

            <p
              className="edu-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {t.education.description}
            </p>
          </div>

          <div
            className="edu-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>

        {/* ============================================================
            ARCHITECTURAL ACADEMIC DOSSIER CARD
           ============================================================ */}
        <div className="space-y-8">
          {educationEntries.map((education, index) => (
            <article
              key={education.id}
              className="gsap-edu-card rounded-2xl border overflow-hidden transition-colors duration-300 hover:border-[var(--portfolio-accent)]"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              {/* Top Telemetry Bar */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-3.5 border-b font-mono text-xs"
                style={{
                  background: "var(--portfolio-surface-raised)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-muted)",
                }}>
                <div className="flex items-center gap-2.5">
                  <GraduationCap
                    size={16}
                    style={{ color: "var(--portfolio-accent)" }}
                  />
                  <span
                    className="font-bold uppercase tracking-wider"
                    style={{ color: "var(--portfolio-accent)" }}>
                    ACADEMIC RECORD // 0{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CalendarDays size={13} aria-hidden="true" />
                  <span>{education.period}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-start">
                {/* Left Column: Institution, Degree & Monumental GPA Callout */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div>
                    <p
                      className="font-mono text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "var(--portfolio-accent)" }}>
                      {education.institution}
                    </p>
                    <h3
                      className="font-display text-2xl sm:text-3xl font-extrabold leading-tight"
                      style={{
                        color: "var(--portfolio-text)",
                      }}>
                      {education.degree}
                    </h3>
                  </div>

                  {/* GPA & Status Architectural Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div
                      className="rounded-xl border p-4"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                      }}>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-mono text-[10px] uppercase font-bold tracking-wider"
                          style={{ color: "var(--portfolio-muted)" }}>
                          {language === "id"
                            ? "IPK Kumulatif"
                            : "Cumulative GPA"}
                        </span>
                        <Award
                          size={14}
                          style={{ color: "var(--portfolio-accent)" }}
                        />
                      </div>
                      <p
                        className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight"
                        style={{ color: "var(--portfolio-accent)" }}>
                        {education.gpa}
                      </p>
                    </div>

                    <div
                      className="rounded-xl border p-4 flex flex-col justify-center"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                      }}>
                      <span
                        className="font-mono text-[10px] uppercase font-bold tracking-wider mb-1"
                        style={{ color: "var(--portfolio-muted)" }}>
                        Status
                      </span>
                      <p
                        className="text-xs font-medium leading-relaxed"
                        style={{ color: "var(--portfolio-text)" }}>
                        {education.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Engineering Coursework & Highlights */}
                <div
                  className="lg:col-span-7 lg:border-l lg:pl-8"
                  style={{ borderColor: "var(--portfolio-border)" }}>
                  <p
                    className="font-mono text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: "var(--portfolio-muted)" }}>
                    {language === "id"
                      ? "FOKUS AKADEMIK & PENCAPAIAN UTAMA"
                      : "KEY ENGINEERING MILESTONES & FOCUS"}
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {education.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed"
                        style={{
                          background: "var(--portfolio-surface-raised)",
                          borderColor: "var(--portfolio-border)",
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
