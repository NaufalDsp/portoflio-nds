import { useMemo, useRef } from "react";
import { BriefcaseBusiness, CalendarDays, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { getWorkExperiences } from "../data/experience";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WorkExperience() {
  const { language, t } = useLanguage();
  const experiences = useMemo(() => getWorkExperiences(language), [language]);
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const beamFillRef = useRef<HTMLDivElement>(null);
  const progressReadoutRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const timelineWrap = timelineWrapRef.current;
      if (!section || !timelineWrap) return;

      // 1. Scrubbed Editorial Header Reveal
      gsap.fromTo(
        ".exp-header-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-header-wrap",
            start: "top 88%",
            end: "top 45%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".exp-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-header-wrap",
            start: "top 85%",
            end: "top 40%",
            scrub: 0.6,
          },
        },
      );

      // 2. Scrubbed Kinetic Backdrop Watermark
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      // 3. Live Scrubbed Vertical Laser Beam + Percentage Readout
      if (beamFillRef.current) {
        gsap.fromTo(
          beamFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineWrap,
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.4,
              onUpdate: (self) => {
                if (progressReadoutRef.current) {
                  progressReadoutRef.current.textContent = `${Math.round(
                    self.progress * 100,
                  )}%`;
                }
              },
            },
          },
        );
      }

      // 4. Interactive Scroll-Scrubbed 3D Card Convergence & Node Activation
      const isDesktop = window.innerWidth >= 1024;
      const items = gsap.utils.toArray<HTMLElement>(".gsap-exp-item");

      items.forEach((item, idx) => {
        const nodeDot = item.querySelector(".gsap-exp-dot");
        const card = item.querySelector(".gsap-exp-card");
        const isLeft = idx % 2 === 0;

        if (card) {
          gsap.fromTo(
            card,
            {
              y: 55,
              x: isDesktop ? (isLeft ? -45 : 45) : 0,
              scale: 0.94,
              opacity: 0.12,
            },
            {
              y: 0,
              x: 0,
              scale: 1,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                end: "top 52%",
                scrub: 0.65,
              },
            },
          );
        }

        if (nodeDot) {
          gsap.fromTo(
            nodeDot,
            { scale: 0.5, opacity: 0.3 },
            {
              scale: 1,
              opacity: 1,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 55%",
                scrub: 0.5,
              },
            },
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [language] },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--background)" }}>
      {/* Scrubbed Kinetic Backdrop Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-20 left-0 whitespace-nowrap font-display font-extrabold uppercase text-stroke-editorial z-0"
        style={{
          fontSize: "clamp(4.5rem, 13vw, 11rem)",
          opacity: 0.32,
          letterSpacing: "-0.04em",
        }}>
        EXPERIENCE // PRODUCTION // ARCHITECTURE // CAREER
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* ============================================================
            ASYMMETRIC EDITORIAL HEADER (03 // CAREER HISTORY)
           ============================================================ */}
        <div className="exp-header-wrap mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="exp-header-reveal flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  03 // {t.experience.overline}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [0{experiences.length} INDUSTRY ROLES · LATEST FIRST]
                </span>
                <span
                  className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
                  style={{
                    background: "var(--portfolio-accent-soft)",
                    color: "var(--portfolio-accent-strong)",
                  }}>
                  SYNC // <span ref={progressReadoutRef}>0%</span>
                </span>
              </div>

              <h2
                className="exp-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {t.experience.title}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; Impact.
                </span>
              </h2>
            </div>

            <p
              className="exp-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {t.experience.description}
            </p>
          </div>

          <div
            className="exp-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>

        {/* ============================================================
            SCRUBBED LASER TIMELINE & ARCHITECTURAL EXPERIENCE CARDS
            (REVERSE CHRONOLOGICAL: NEWEST AT TOP -> OLDEST AT BOTTOM)
           ============================================================ */}
        <div ref={timelineWrapRef} className="relative mx-auto max-w-5xl">
          {/* Base Track Line */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] sm:left-[23px] lg:left-1/2 lg:-translate-x-1/2 top-6 w-[2px]"
            style={{
              background: "var(--portfolio-border)",
            }}
          />

          {/* GSAP Scrubbed Glowing Laser Fill Line */}
          <div
            ref={beamFillRef}
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] sm:left-[23px] lg:left-1/2 lg:-translate-x-1/2 top-6 w-[2px] origin-top"
            style={{
              background:
                "linear-gradient(to bottom, var(--portfolio-accent), var(--portfolio-accent-strong))",
              boxShadow: "0 0 18px var(--portfolio-accent)",
            }}
          />

          <div className="space-y-10 sm:space-y-14 lg:space-y-16">
            {experiences.map((experience, index) => {
              const indexLabel = String(index + 1).padStart(2, "0");
              const isLeftOnDesktop = index % 2 === 0;
              const isCurrentRole = index === 0;
              const hasDetails =
                Boolean(experience.description?.trim()) ||
                experience.achievements.length > 0;

              return (
                <article
                  key={experience.id}
                  className="gsap-exp-item relative grid grid-cols-1 lg:grid-cols-12 items-start pl-12 sm:pl-16 lg:pl-0">
                  {/* Central Glowing Node on Timeline */}
                  <div
                    className="gsap-exp-dot absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-5 sm:top-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 shadow-lg transition-colors"
                    style={{
                      color: isCurrentRole
                        ? "var(--portfolio-accent-contrast)"
                        : "var(--portfolio-accent)",
                      background: isCurrentRole
                        ? "var(--portfolio-accent)"
                        : "var(--portfolio-surface)",
                      borderColor: "var(--portfolio-accent)",
                      boxShadow: "0 0 22px rgba(20, 107, 102, 0.3)",
                    }}>
                    <BriefcaseBusiness size={17} aria-hidden="true" />
                  </div>

                  {/* Card Column (Alternates Left/Right on Desktop) */}
                  <div
                    className={`lg:col-span-5 ${
                      isLeftOnDesktop
                        ? "lg:col-start-1 lg:pr-8"
                        : "lg:col-start-8 lg:pl-8"
                    }`}>
                    <div
                      className="gsap-exp-card group relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)]"
                      style={{
                        background: "var(--portfolio-surface)",
                        borderColor: isCurrentRole
                          ? "var(--portfolio-accent)"
                          : "var(--portfolio-border)",
                        boxShadow: "var(--portfolio-shadow)",
                      }}>
                      {/* Top Index & Period Strip */}
                      <div
                        className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b"
                        style={{ borderColor: "var(--portfolio-border)" }}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="font-mono text-xs font-bold uppercase tracking-widest"
                            style={{ color: "var(--portfolio-accent)" }}>
                            EXP // {indexLabel}
                          </span>
                          {isCurrentRole && (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold border"
                              style={{
                                color: "var(--portfolio-accent-strong)",
                                background: "var(--portfolio-accent-soft)",
                                borderColor: "var(--portfolio-accent)",
                              }}>
                              <span
                                className="h-1.5 w-1.5 rounded-full animate-ping"
                                style={{ background: "var(--portfolio-accent)" }}
                              />
                              {language === "id" ? "AKTIF" : "ACTIVE"}
                            </span>
                          )}
                          <span
                            className="rounded px-2 py-0.5 font-mono text-[10px] font-semibold"
                            style={{
                              color: "var(--portfolio-accent-strong)",
                              background: "var(--portfolio-accent-soft)",
                            }}>
                            {experience.employmentType}
                          </span>
                          {experience.workMode && (
                            <span
                              className="rounded border px-2 py-0.5 font-mono text-[10px] font-medium"
                              style={{
                                borderColor: "var(--portfolio-border)",
                                color: "var(--portfolio-muted)",
                              }}>
                              {experience.workMode}
                            </span>
                          )}
                        </div>

                        <div
                          className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-mono"
                          style={{
                            color: "var(--portfolio-muted)",
                            background: "var(--portfolio-surface-raised)",
                            borderColor: "var(--portfolio-border)",
                          }}>
                          <CalendarDays size={12} aria-hidden="true" />
                          {experience.period}
                        </div>
                      </div>

                      {/* Role & Company */}
                      <div className={hasDetails ? "mb-4" : ""}>
                        <h3
                          className="font-display text-xl sm:text-2xl font-extrabold leading-snug"
                          style={{
                            color: "var(--portfolio-text)",
                          }}>
                          {experience.role}
                        </h3>
                        <p
                          className="font-mono text-xs sm:text-sm font-semibold mt-1"
                          style={{
                            color: "var(--portfolio-accent)",
                          }}>
                          @ {experience.company}
                        </p>
                      </div>

                      {/* Summary (only rendered if non-empty) */}
                      {experience.description?.trim() && (
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            experience.achievements.length > 0 ? "mb-5" : ""
                          }`}
                          style={{
                            color: "var(--portfolio-muted)",
                          }}>
                          {experience.description}
                        </p>
                      )}

                      {/* Achievements (only rendered if non-empty) */}
                      {experience.achievements.length > 0 && (
                        <ul
                          className="grid gap-2.5 pt-4 border-t"
                          style={{ borderColor: "var(--portfolio-border)" }}>
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
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
