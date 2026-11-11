import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Layers } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getTechnologyGroups } from "../data/technologies";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Skills() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
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

      // 1. Scrubbed Editorial Header Reveal
      gsap.fromTo(
        ".skills-header-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-header-wrap",
            start: "top 88%",
            end: "top 45%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".skills-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".skills-header-wrap",
            start: "top 85%",
            end: "top 40%",
            scrub: 0.6,
          },
        },
      );

      // 2. Scrubbed Horizontal Backdrop Watermark
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { xPercent: 12 },
          {
            xPercent: -18,
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

      // 3. Dual-Track Velocity-Reactive Infinite Kinetic Marquee
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

  // Interactive Scroll-Scrubbed & Filter Transition on Domain Cards
  useGSAP(
    () => {
      if (!gridContainerRef.current) return;

      const isDesktopOrTablet = window.innerWidth >= 768;
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-skill-domain-block");
      cards.forEach((card, idx) => {
        const isLeft = idx % 2 === 0;
        gsap.fromTo(
          card,
          {
            y: 42,
            x:
              activeCategory === "ALL" && isDesktopOrTablet
                ? isLeft
                  ? -24
                  : 24
                : 0,
            opacity: 0.15,
            scale: 0.96,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.5,
            },
          },
        );
      });

      gsap.fromTo(
        ".gsap-skill-pill",
        { scale: 0.94, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.018,
          ease: "power2.out",
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
      {/* Scrubbed Kinetic Backdrop Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-16 left-0 whitespace-nowrap font-display font-extrabold uppercase text-stroke-editorial z-0"
        style={{
          fontSize: "clamp(4.5rem, 13vw, 11rem)",
          opacity: 0.35,
          letterSpacing: "-0.04em",
        }}>
        STACK // ARCHITECTURE // TOOLKIT // ECOSYSTEM
      </div>

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
          SEGMENTED PILL DOCK & BALANCED 2x2 ARCHITECTURAL MATRIX
         ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Segmented Control Dock (Scrollable on narrow mobile, wrapped on tablet/desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div
            className="flex overflow-x-auto sm:flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border max-w-full"
            style={{
              background: "var(--portfolio-surface)",
              borderColor: "var(--portfolio-border)",
              boxShadow: "var(--portfolio-shadow)",
            }}>
            <button
              type="button"
              onClick={() => setActiveCategory("ALL")}
              className="px-3 sm:px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-200 cursor-pointer inline-flex items-center gap-2 shrink-0 whitespace-nowrap"
              style={{
                background:
                  activeCategory === "ALL"
                    ? "var(--portfolio-accent)"
                    : "transparent",
                color:
                  activeCategory === "ALL"
                    ? "var(--portfolio-accent-contrast)"
                    : "var(--portfolio-muted)",
              }}>
              <Layers size={13} />
              <span>
                {language === "id" ? "Semua Domain" : "All Domains"}
              </span>
              <span
                className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                style={{
                  background:
                    activeCategory === "ALL"
                      ? "rgba(0,0,0,0.18)"
                      : "var(--portfolio-surface-raised)",
                  color:
                    activeCategory === "ALL"
                      ? "var(--portfolio-accent-contrast)"
                      : "var(--portfolio-accent)",
                }}>
                {allTechnologies.length}
              </span>
            </button>

            {technologyGroups.map((group) => {
              const isSelected = activeCategory === group.category;
              return (
                <button
                  key={group.category}
                  type="button"
                  onClick={() => setActiveCategory(group.category)}
                  className="px-3 sm:px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-200 cursor-pointer inline-flex items-center gap-2 shrink-0 whitespace-nowrap"
                  style={{
                    background: isSelected
                      ? "var(--portfolio-accent)"
                      : "transparent",
                    color: isSelected
                      ? "var(--portfolio-accent-contrast)"
                      : "var(--portfolio-muted)",
                  }}>
                  <span>{group.category}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                    style={{
                      background: isSelected
                        ? "rgba(0,0,0,0.18)"
                        : "var(--portfolio-surface-raised)",
                      color: isSelected
                        ? "var(--portfolio-accent-contrast)"
                        : "var(--portfolio-accent)",
                    }}>
                    {String(group.technologies.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Symmetrical 2x2 Architectural Grid on Tablet (md) & Desktop (lg) */}
        <div
          ref={gridContainerRef}
          className={`grid grid-cols-1 gap-5 sm:gap-6 items-stretch ${
            filteredGroups.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
          }`}>
          {filteredGroups.map((group, groupIndex) => {
            const domainNum = String(
              technologyGroups.findIndex((g) => g.category === group.category) +
                1,
            ).padStart(2, "0");

            return (
              <div
                key={group.category}
                className="gsap-skill-domain-block h-full rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 hover:border-[var(--portfolio-accent)]"
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
                          DOMAIN // {domainNum}
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
                      className="px-2.5 py-1 rounded-lg border font-mono text-xs font-bold shrink-0"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                        color: "var(--portfolio-accent)",
                      }}>
                      {String(group.technologies.length).padStart(2, "0")}{" "}
                      {language === "id" ? "ALAT" : "TOOLS"}
                    </span>
                  </div>

                  {/* Uniform Technology Nodes Inside Domain */}
                  <div
                    className={`grid gap-2.5 sm:gap-3 ${
                      filteredGroups.length === 1
                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3"
                    }`}>
                    {group.technologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <div
                          key={`${group.category}-${tech.name}`}
                          className="gsap-skill-pill group relative flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)]"
                          style={{
                            background: "var(--portfolio-surface-raised)",
                            borderColor: "var(--portfolio-border)",
                          }}>
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-110"
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
