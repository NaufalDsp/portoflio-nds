import { ArrowRight, ArrowUpRight, Github, Layers, Lock } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { getProjects } from "../data/projects";
import type { Project } from "../types/portfolio";
import { ProjectDetailsDialog } from "./ProjectDetailsDialog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Projects() {
  const { language, t } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [activeArchiveIndex, setActiveArchiveIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const cursorBadgeRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const projects = useMemo(() => getProjects(language), [language]);

  // Top 4 projects in the GSAP Stacking Showcase Deck, rest in the Interactive Editorial Archive
  const showcaseProjects = useMemo(() => projects.slice(0, 4), [projects]);
  const archiveProjects = useMemo(() => projects.slice(4), [projects]);

  const selectedProject = useMemo(
    () =>
      selectedProjectId !== null
        ? projects.find((p) => p.id === selectedProjectId) ?? null
        : null,
    [projects, selectedProjectId],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Editorial Header Reveal
      gsap.fromTo(
        ".projects-header-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".projects-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".projects-header-wrap",
            start: "top 82%",
          },
        },
      );

      // 2. Showcase Cards: Stacking Scale + Inner Image Parallax
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-project-deck-card");

      cards.forEach((card, index) => {
        const img = card.querySelector(".gsap-project-img");

        // Card entrance reveal
        gsap.fromTo(
          card,
          { y: 60, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 45%",
              scrub: 0.6,
            },
          },
        );

        // Subtle scale-down depth effect as the next card scrolls over it
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95 - (cards.length - 1 - index) * 0.01,
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 75%",
              end: "top 18%",
              scrub: true,
            },
          });
        }

        // Inner image vertical parallax
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -7, scale: 1.08 },
            {
              yPercent: 7,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });

      // 3. Archive rows stagger reveal
      gsap.fromTo(
        ".gsap-archive-row",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-archive-container",
            start: "top 85%",
          },
        },
      );

      // 4. Magnetic Floating Cursor Badge for Project Cards
      const badge = cursorBadgeRef.current;
      if (!badge) return;

      const xTo = gsap.quickTo(badge, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(badge, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      section.addEventListener("mousemove", handleMouseMove);
      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: sectionRef, dependencies: [language] },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-clip py-24 sm:py-32"
      style={{
        background: "var(--background)",
      }}>
      {/* Custom Floating Magnetic Cursor Badge (Desktop) */}
      <div
        ref={cursorBadgeRef}
        aria-hidden="true"
        className={`pointer-events-none hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold shadow-2xl z-50 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          cursorVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{
          background: "var(--portfolio-accent)",
          color: "var(--portfolio-accent-contrast)",
          position: "absolute",
        }}>
        <span>{t.projects.readProject}</span>
        <ArrowUpRight size={14} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ============================================================
            ASYMMETRIC EDITORIAL SECTION HEADER (01 // SELECTED WORK)
           ============================================================ */}
        <div className="projects-header-wrap mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="projects-header-reveal flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  01 // {t.projects.overline}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [{String(projects.length).padStart(2, "0")} SYSTEMS BUILT]
                </span>
              </div>

              <h2
                className="projects-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {t.projects.title}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; Architecture.
                </span>
              </h2>
            </div>

            <p
              className="projects-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {t.projects.description}
            </p>
          </div>

          <div
            className="projects-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>

        {/* ============================================================
            PART 1: STICKY STACKING EDITORIAL CASE DECK (TOP 4 PROJECTS)
           ============================================================ */}
        <div className="relative flex flex-col gap-10 sm:gap-14 mb-24">
          {showcaseProjects.map((project, index) => {
            const indexLabel = String(index + 1).padStart(2, "0");
            const isEven = index % 2 === 1;

            return (
              <article
                key={project.id}
                style={{
                  top: `${5.5 + index * 1.25}rem`,
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  boxShadow: "var(--portfolio-shadow)",
                }}
                className="gsap-project-deck-card lg:sticky group relative rounded-2xl border overflow-hidden transition-colors duration-300 hover:border-[var(--portfolio-accent)]">
                {/* Top Telemetry Strip Inside Card */}
                <div
                  className="flex items-center justify-between px-5 sm:px-8 py-3 border-b text-[11px] font-mono uppercase tracking-wider"
                  style={{
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface-raised)",
                    color: "var(--portfolio-muted)",
                  }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-bold"
                      style={{ color: "var(--portfolio-accent)" }}>
                      CASE // {indexLabel}
                    </span>
                    <span>·</span>
                    <span className="truncate max-w-[200px] sm:max-w-none">
                      {project.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          background: "var(--portfolio-accent-soft)",
                          color: "var(--portfolio-accent-strong)",
                        }}>
                        {t.projects.selectedBadge}
                      </span>
                    )}
                    {project.isPrivate && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px]"
                        style={{
                          borderColor: "var(--portfolio-border)",
                          color: "var(--portfolio-muted)",
                        }}>
                        <Lock size={10} />
                        {t.projects.privateBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Split Editorial Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Visual Column with Inner GSAP Parallax */}
                  <div
                    onClick={() => setSelectedProjectId(project.id)}
                    onMouseEnter={() => setCursorVisible(true)}
                    onMouseLeave={() => setCursorVisible(false)}
                    className={`lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden cursor-pointer bg-[var(--portfolio-surface-raised)] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}>
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading={index > 0 ? "lazy" : "eager"}
                      className="gsap-project-img w-full h-full object-cover transition-transform duration-700"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(16, 32, 31, 0.55) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  {/* Narrative & Architecture Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}>
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span
                          className="font-display text-4xl sm:text-5xl font-extrabold leading-none text-stroke-editorial select-none"
                          aria-hidden="true">
                          {indexLabel}
                        </span>

                        <div className="flex items-center gap-2">
                          {!project.isPrivate &&
                            project.links.github &&
                            project.links.github !== "#" && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.title} GitHub repository`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)]"
                                style={{
                                  borderColor: "var(--portfolio-border)",
                                  color: "var(--portfolio-muted)",
                                }}>
                                <Github size={16} />
                              </a>
                            )}
                          {!project.isPrivate &&
                            project.links.live &&
                            project.links.live !== "#" && (
                              <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.title} live demo`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)]"
                                style={{
                                  borderColor: "var(--portfolio-border)",
                                  color: "var(--portfolio-muted)",
                                }}>
                                <ArrowUpRight size={16} />
                              </a>
                            )}
                        </div>
                      </div>

                      <h3
                        className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-3"
                        style={{ color: "var(--portfolio-text)" }}>
                        {project.title}
                      </h3>

                      <p
                        className="text-sm sm:text-base leading-relaxed mb-6"
                        style={{ color: "var(--portfolio-muted)" }}>
                        {project.description}
                      </p>

                      {/* Key Contributions Preview */}
                      {project.contributions &&
                        project.contributions.length > 0 && (
                          <div
                            className="mb-6 pt-4 border-t space-y-1.5"
                            style={{ borderColor: "var(--portfolio-border)" }}>
                            {project.contributions.slice(0, 2).map((item) => (
                              <div
                                key={item}
                                className="flex items-start gap-2 text-xs leading-relaxed"
                                style={{ color: "var(--portfolio-muted)" }}>
                                <span
                                  className="font-mono mt-0.5"
                                  style={{ color: "var(--portfolio-accent)" }}>
                                  ▸
                                </span>
                                <span className="line-clamp-1">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    <div>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map(({ name }) => (
                          <span
                            key={name}
                            className="px-2.5 py-1 rounded-md border font-mono text-[11px] font-medium"
                            style={{
                              background: "var(--portfolio-surface-raised)",
                              borderColor: "var(--portfolio-border)",
                              color: "var(--portfolio-text)",
                            }}>
                            {name}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 hover:gap-3.5 cursor-pointer"
                        style={{
                          background: "var(--portfolio-accent)",
                          color: "var(--portfolio-accent-contrast)",
                          borderColor: "var(--portfolio-accent)",
                        }}>
                        <span>{t.projects.readProject}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ============================================================
            PART 2: INTERACTIVE EDITORIAL ARCHIVE INDEX (REMAINING PROJECTS)
           ============================================================ */}
        {archiveProjects.length > 0 && (
          <div className="gsap-archive-container pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Layers
                  size={16}
                  style={{ color: "var(--portfolio-accent)" }}
                />
                <h3
                  className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--portfolio-text)" }}>
                  {language === "id"
                    ? "ARSIP REKAYasa & SISTEM LAINNYA"
                    : "ADDITIONAL ENGINEERING ARCHIVE"}
                </h3>
              </div>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--portfolio-muted)" }}>
                05 — {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Interactive Preview Panel (Left 5 cols on Desktop) */}
              <div
                className="hidden lg:block lg:col-span-5 sticky top-28 rounded-2xl border overflow-hidden p-4 transition-all duration-300"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  boxShadow: "var(--portfolio-shadow)",
                }}>
                {archiveProjects[activeArchiveIndex] && (
                  <div>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[var(--portfolio-surface-raised)]">
                      <img
                        src={archiveProjects[activeArchiveIndex].image}
                        alt={archiveProjects[activeArchiveIndex].title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="font-mono text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--portfolio-accent)" }}>
                        {archiveProjects[activeArchiveIndex].role}
                      </span>
                      {archiveProjects[activeArchiveIndex].isPrivate && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border"
                          style={{
                            borderColor: "var(--portfolio-border)",
                            color: "var(--portfolio-muted)",
                          }}>
                          <Lock size={10} />
                          {t.projects.privateBadge}
                        </span>
                      )}
                    </div>
                    <h4
                      className="font-display text-lg font-bold mb-1.5"
                      style={{ color: "var(--portfolio-text)" }}>
                      {archiveProjects[activeArchiveIndex].title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--portfolio-muted)" }}>
                      {archiveProjects[activeArchiveIndex].description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProjectId(
                          archiveProjects[activeArchiveIndex].id,
                        )
                      }
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold border transition-colors hover:border-[var(--portfolio-accent)] cursor-pointer"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                        color: "var(--portfolio-accent)",
                      }}>
                      <span>{t.projects.readProject}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Interactive Editorial Index List (Right 7 cols on Desktop) */}
              <div
                className="lg:col-span-7 divide-y border-t border-b"
                style={{ borderColor: "var(--portfolio-border)" }}>
                {archiveProjects.map((project, idx) => {
                  const globalNum = String(idx + 5).padStart(2, "0");
                  const isActive = activeArchiveIndex === idx;

                  return (
                    <div
                      key={project.id}
                      onMouseEnter={() => setActiveArchiveIndex(idx)}
                      onClick={() => setSelectedProjectId(project.id)}
                      className="gsap-archive-row group py-5 sm:py-6 px-3 sm:px-4 transition-colors duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{
                        background: isActive
                          ? "color-mix(in srgb, var(--portfolio-accent-soft) 40%, transparent)"
                          : "transparent",
                      }}>
                      <div className="flex items-start sm:items-center gap-4">
                        <span
                          className="font-mono text-xs font-bold pt-1 sm:pt-0"
                          style={{
                            color: isActive
                              ? "var(--portfolio-accent)"
                              : "var(--portfolio-muted)",
                          }}>
                          /{globalNum}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className="font-display text-lg sm:text-xl font-bold transition-transform duration-200 group-hover:translate-x-1"
                              style={{ color: "var(--portfolio-text)" }}>
                              {project.title}
                            </h4>
                            {project.isPrivate && (
                              <Lock
                                size={12}
                                style={{ color: "var(--portfolio-muted)" }}
                              />
                            )}
                          </div>
                          <p
                            className="text-xs mt-1 line-clamp-1 max-w-md"
                            style={{ color: "var(--portfolio-muted)" }}>
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pl-8 sm:pl-0">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map(({ name }) => (
                            <span
                              key={name}
                              className="font-mono text-[10px] px-2 py-0.5 rounded border"
                              style={{
                                borderColor: "var(--portfolio-border)",
                                background: "var(--portfolio-surface)",
                                color: "var(--portfolio-muted)",
                              }}>
                              {name}
                            </span>
                          ))}
                        </div>

                        <span
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 group-hover:rotate-45"
                          style={{
                            borderColor: isActive
                              ? "var(--portfolio-accent)"
                              : "var(--portfolio-border)",
                            color: isActive
                              ? "var(--portfolio-accent)"
                              : "var(--portfolio-muted)",
                          }}>
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProjectId(null);
        }}
      />
    </section>
  );
}
