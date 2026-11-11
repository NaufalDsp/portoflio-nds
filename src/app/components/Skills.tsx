import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Layers } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getTechnologyGroups } from "../data/technologies";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Skills() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRow1Ref = useRef<HTMLDivElement>(null);
  const marqueeRow2Ref = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const technologyGroups = useMemo(
    () => getTechnologyGroups(language),
    [language],
  );

  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const allTechnologies = useMemo(
    () =>
      technologyGroups.flatMap((group) =>
        group.technologies.map((tech) => ({
          ...tech,
          category: group.category,
        })),
      ),
    [technologyGroups],
  );

  const marqueeRow1 = useMemo(
    () => [...allTechnologies, ...allTechnologies],
    [allTechnologies],
  );

  const marqueeRow2 = useMemo(() => {
    const reversed = [...allTechnologies].reverse();
    return [...reversed, ...reversed];
  }, [allTechnologies]);

  const filteredGroups = useMemo(() => {
    if (activeCategory === "ALL") return technologyGroups;
    return technologyGroups.filter((g) => g.category === activeCategory);
  }, [activeCategory, technologyGroups]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Editorial Header Reveal
      gsap.fromTo(
        ".skills-header-reveal",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".skills-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".skills-header-wrap",
            start: "top 82%",
          },
        },
      );

      // 2. Dual-Track Velocity-Reactive Infinite Kinetic Marquee
      const tween1 = gsap.to(marqueeRow1Ref.current, {
        xPercent: -50,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      const tween2 = gsap.fromTo(
        marqueeRow2Ref.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 40,
          ease: "none",
          repeat: -1,
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.min(Math.abs(self.getVelocity()) / 350, 4.5);
          const targetScale = 1 + velocity;
          gsap.to([tween1, tween2], {
            timeScale: targetScale,
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to([tween1, tween2], {
                timeScale: 1,
                duration: 0.8,
                ease: "power2.out",
              });
            },
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [language] },
  );

  // Animate cards whenever category filter changes
  useGSAP(
    () => {
      if (!gridContainerRef.current) return;
      gsap.fromTo(
        ".gsap-skill-domain-block",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".gsap-skill-pill",
        { scale: 0.92, opacity: 0, y: 12 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "back.out(1.4)",
        },
      );
    },
    { scope: gridContainerRef, dependencies: [activeCategory, language] },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--background)" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* ============================================================
            ASYMMETRIC EDITORIAL HEADER (02 // STACK & TOOLKIT)
           ============================================================ */}
        <div className="skills-header-wrap mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="skills-header-reveal flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  02 // {t.skills.overline}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [{allTechnologies.length} PRODUCTION TOOLS]
                </span>
              </div>

              <h2
                className="skills-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {t.skills.title}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; Ecosystem.
                </span>
              </h2>
            </div>

            <p
              className="skills-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {t.skills.description}
            </p>
          </div>

          <div
            className="skills-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>
      </div>

      {/* ============================================================
          VELOCITY-REACTIVE INFINITE KINETIC MARQUEE STREAM
         ============================================================ */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden py-5 mb-14 border-y select-none"
        style={{
          borderColor: "var(--portfolio-border)",
          background:
            "color-mix(in srgb, var(--portfolio-surface) 65%, transparent)",
        }}>
        {/* Left & Right Edge Fade Masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 z-10"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        {/* Track 1 (Leftward) */}
        <div className="flex w-max mb-3" ref={marqueeRow1Ref}>
          {marqueeRow1.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`row1-${tech.name}-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2 mx-1.5 rounded-full border"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <Icon size={16} style={{ color: tech.color }} />
                <span
                  className="font-mono text-xs font-semibold whitespace-nowrap"
                  style={{ color: "var(--portfolio-text)" }}>
                  {tech.name}
                </span>
                <span
                  className="text-[10px] font-mono opacity-45"
                  style={{ color: "var(--portfolio-muted)" }}>
                  //
                </span>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Rightward) */}
        <div className="flex w-max" ref={marqueeRow2Ref}>
          {marqueeRow2.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`row2-${tech.name}-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2 mx-1.5 rounded-full border"
                style={{
                  background: "var(--portfolio-surface-raised)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <Icon size={16} style={{ color: tech.color }} />
                <span
                  className="font-mono text-xs font-semibold whitespace-nowrap"
                  style={{ color: "var(--portfolio-text)" }}>
                  {tech.name}
                </span>
                <span
                  className="text-[10px] font-mono opacity-45"
                  style={{ color: "var(--portfolio-accent)" }}>
                  ✦
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          INTERACTIVE ARCHITECTURAL DOMAIN FILTER & MATRIX
         ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Domain Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("ALL")}
              className="px-3.5 py-2 rounded-xl border font-mono text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2"
              style={{
                background:
                  activeCategory === "ALL"
                    ? "var(--portfolio-accent)"
                    : "var(--portfolio-surface)",
                color:
                  activeCategory === "ALL"
                    ? "var(--portfolio-accent-contrast)"
                    : "var(--portfolio-muted)",
                borderColor:
                  activeCategory === "ALL"
                    ? "var(--portfolio-accent)"
                    : "var(--portfolio-border)",
              }}>
              <Layers size={13} />
              <span>
                {language === "id" ? "SEMUA DOMAIN" : "ALL DOMAINS"} (
                {allTechnologies.length})
              </span>
            </button>

            {technologyGroups.map((group) => {
              const isSelected = activeCategory === group.category;
              return (
                <button
                  key={group.category}
                  type="button"
                  onClick={() => setActiveCategory(group.category)}
                  className="px-3.5 py-2 rounded-xl border font-mono text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: isSelected
                      ? "var(--portfolio-accent)"
                      : "var(--portfolio-surface)",
                    color: isSelected
                      ? "var(--portfolio-accent-contrast)"
                      : "var(--portfolio-muted)",
                    borderColor: isSelected
                      ? "var(--portfolio-accent)"
                      : "var(--portfolio-border)",
                  }}>
                  {group.category} ({group.technologies.length})
                </button>
              );
            })}
          </div>

          <div
            className="hidden md:flex items-center gap-2 font-mono text-xs"
            style={{ color: "var(--portfolio-muted)" }}>
            <Cpu size={14} style={{ color: "var(--portfolio-accent)" }} />
            <span>
              {language === "id"
                ? "KLIK DOMAIN UNTUK FILTER ARSITEKTUR"
                : "SELECT DOMAIN TO FILTER ARCHITECTURE"}
            </span>
          </div>
        </div>

        {/* Categorized Bento Architecture Matrix */}
        <div
          ref={gridContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredGroups.map((group, groupIndex) => {
            const isWide =
              filteredGroups.length === 1 ||
              group.technologies.length >= 6 ||
              groupIndex === 0;

            return (
              <div
                key={group.category}
                className={`gsap-skill-domain-block rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 hover:border-[var(--portfolio-accent)] ${
                  filteredGroups.length === 1
                    ? "lg:col-span-12"
                    : isWide
                      ? "lg:col-span-7"
                      : "lg:col-span-5"
                }`}
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  boxShadow: "var(--portfolio-shadow)",
                }}>
                <div>
                  {/* Domain Card Header */}
                  <div
                    className="flex items-start justify-between gap-4 pb-4 mb-5 border-b"
                    style={{ borderColor: "var(--portfolio-border)" }}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: "var(--portfolio-accent)" }}>
                          DOMAIN // 0{groupIndex + 1}
                        </span>
                      </div>
                      <h3
                        className="font-display text-xl sm:text-2xl font-extrabold"
                        style={{ color: "var(--portfolio-text)" }}>
                        {group.category}
                      </h3>
                      <p
                        className="text-xs sm:text-sm mt-1 leading-relaxed"
                        style={{ color: "var(--portfolio-muted)" }}>
                        {group.description}
                      </p>
                    </div>

                    <span
                      className="px-2.5 py-1 rounded-md border font-mono text-xs font-bold shrink-0"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                        color: "var(--portfolio-accent)",
                      }}>
                      {String(group.technologies.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Interactive Technology Nodes Inside Domain */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {group.technologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <div
                          key={tech.name}
                          className="gsap-skill-pill group relative flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)]"
                          style={{
                            background: "var(--portfolio-surface-raised)",
                            borderColor: "var(--portfolio-border)",
                          }}>
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-110"
                            style={{
                              color: tech.color,
                              background: "var(--portfolio-surface)",
                              borderColor: "var(--portfolio-border)",
                            }}>
                            <Icon size={20} aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="font-mono text-xs font-bold truncate"
                              style={{ color: "var(--portfolio-text)" }}>
                              {tech.name}
                            </p>
                            <p
                              className="font-mono text-[10px] truncate opacity-70"
                              style={{ color: "var(--portfolio-muted)" }}>
                              {group.category.split(" ")[0]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
