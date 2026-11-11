import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  GitBranch,
  GitCommit,
  Github,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import {
  fetchGitHubDashboardData,
  FALLBACK_CONTRIBUTION_STATS,
  type GitHubDashboardData,
} from "../services/githubService";
import { Github3DActivity } from "./Github3DActivity";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function formatRelativeTime(dateString: string, lang: "en" | "id"): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return lang === "id" ? "Baru saja" : "Just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}${lang === "id" ? "m lalu" : "m ago"}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}${lang === "id" ? "j lalu" : "h ago"}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}${lang === "id" ? "h lalu" : "d ago"}`;
  return date.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

export function GithubActivity() {
  const { language } = useLanguage();
  const [data, setData] = useState<GitHubDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const loadData = async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);

    try {
      const result = await fetchGitHubDashboardData(force);
      setData(result);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Scrubbed Header Reveal
      gsap.fromTo(
        ".activity-header-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".activity-header-wrap",
            start: "top 88%",
            end: "top 45%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".activity-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".activity-header-wrap",
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

      // 3. Scrubbed Top 4 Telemetry Metric Cards
      const metricCards = gsap.utils.toArray<HTMLElement>(".gsap-gh-metric");
      metricCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 45, scale: 0.92, opacity: 0.15 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: `top ${94 - idx * 2}%`,
              end: "top 60%",
              scrub: 0.5,
            },
          },
        );
      });

      // 4. Scrubbed 3D Activity Matrix Container
      gsap.fromTo(
        ".gsap-gh-3d-wrap",
        { y: 60, scale: 0.95, opacity: 0.2 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-gh-3d-wrap",
            start: "top 92%",
            end: "top 48%",
            scrub: 0.65,
          },
        },
      );

      // 5. Scrubbed Bottom Dual Telemetry Panels (Left & Right Convergence)
      const isDesktop = window.innerWidth >= 1024;
      gsap.fromTo(
        ".gsap-gh-panel-left",
        { x: isDesktop ? -40 : 0, y: 40, scale: 0.95, opacity: 0.15 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-gh-bottom-grid",
            start: "top 92%",
            end: "top 52%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".gsap-gh-panel-right",
        { x: isDesktop ? 40 : 0, y: 40, scale: 0.95, opacity: 0.15 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-gh-bottom-grid",
            start: "top 92%",
            end: "top 52%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [language] },
  );

  const cardStyle = {
    background: "var(--portfolio-surface)",
    borderColor: "var(--portfolio-border)",
    boxShadow: "var(--portfolio-shadow)",
  };

  const contributionStats =
    data?.contributionStats || FALLBACK_CONTRIBUTION_STATS;

  return (
    <section
      ref={sectionRef}
      id="activity"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--background)",
      }}>
      {/* Scrubbed Kinetic Backdrop Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-16 left-0 whitespace-nowrap font-display font-extrabold uppercase text-stroke-editorial z-0"
        style={{
          fontSize: "clamp(4.5rem, 13vw, 11rem)",
          opacity: 0.32,
          letterSpacing: "-0.04em",
        }}>
        TELEMETRY // GITHUB GRAPHQL // 3D ISOMETRIC
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Asymmetric Editorial Section Header (06 // LIVE TELEMETRY) */}
        <div className="activity-header-wrap mb-14 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="activity-header-reveal flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  06 //{" "}
                  {language === "id"
                    ? "Telemetri Langsung"
                    : "Live Telemetry"}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [GITHUB API · 3D MATRIX]
                </span>
              </div>

              <h2
                className="activity-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {language === "id" ? "Open Source" : "Open Source"}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; {language === "id" ? "Aktivitas." : "Activity."}
                </span>
              </h2>
            </div>

            <p
              className="activity-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {language === "id"
                ? "Metrik repositori publik, visualisasi aktivitas 3D, dan pemetaan seluruh bahasa pemrograman yang digunakan."
                : "Public repository metrics, 3D activity visualization, and telemetry of all programming languages used."}
            </p>
          </div>

          <div
            className="activity-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>

        {/* Top 4 Metrics Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          {[
            {
              icon: GitBranch,
              label:
                language === "id" ? "Repositori Publik" : "Public Repositories",
              value: data ? `${data.publicRepos}` : "27",
            },
            {
              icon: Star,
              label: language === "id" ? "Total Bintang" : "Stargazers Earned",
              value: data ? `${data.totalStars}` : "5",
            },
            {
              icon: Users,
              label: language === "id" ? "Pengikut" : "Network Followers",
              value: data ? `${data.followers}` : "36",
            },
            {
              icon: Code2,
              label: language === "id" ? "Bahasa Teratas" : "Primary Language",
              value: data?.topLanguages[0]?.name || "TypeScript",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="gsap-gh-metric flex items-center gap-3.5 rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)]"
                style={cardStyle}>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-accent)",
                  }}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <div
                    className="font-display text-xl sm:text-2xl font-extrabold tracking-tight"
                    style={{
                      color: "var(--portfolio-text)",
                      fontVariantNumeric: "tabular-nums",
                    }}>
                    {loading ? "..." : item.value}
                  </div>
                  <div
                    className="text-xs font-medium leading-snug mt-0.5"
                    style={{ color: "var(--portfolio-muted)" }}>
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured 3D Graphic Activity Component (Full Width Majestic Card) */}
        <div className="gsap-gh-3d-wrap mb-8">
          <Github3DActivity
            stats={contributionStats}
            username={data?.username || "NaufalDsp"}
          />
        </div>

        {/* Bottom Dual Panels: Recent Commits (Left) & All Languages (Right) */}
        <div className="gsap-gh-bottom-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel 1: Recent Activity Events */}
          <div
            className="gsap-gh-panel-left flex flex-col justify-between rounded-2xl border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-accent)",
                    }}>
                    <GitCommit size={16} aria-hidden="true" />
                  </div>
                  <h3
                    className="font-display text-base sm:text-lg font-bold"
                    style={{ color: "var(--portfolio-text)" }}>
                    {language === "id" ? "Komit Terbaru" : "Recent Commits"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => void loadData(true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-opacity disabled:opacity-50 hover:underline cursor-pointer"
                  style={{ color: "var(--portfolio-accent)" }}>
                  <RefreshCw
                    size={12}
                    className={refreshing ? "animate-spin" : ""}
                    aria-hidden="true"
                  />
                  {refreshing
                    ? language === "id"
                      ? "Menyinkronkan..."
                      : "Syncing..."
                    : language === "id"
                      ? "Sinkronisasi"
                      : "Sync live"}
                </button>
              </div>

              <div className="space-y-3">
                {data?.recentEvents && data.recentEvents.length > 0 ? (
                  data.recentEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="flex items-start gap-3 rounded-xl border p-3.5 transition-colors"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                      }}>
                      <div
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border"
                        style={{
                          borderColor: "var(--portfolio-border)",
                          color: "var(--portfolio-accent)",
                        }}>
                        <GitCommit size={13} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <a
                            href={evt.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold truncate font-mono hover:underline"
                            style={{
                              color: "var(--portfolio-text)",
                            }}>
                            {evt.repoName.replace(`${data.username}/`, "")}
                          </a>
                          <span
                            className="text-[10px] shrink-0 font-mono"
                            style={{
                              color: "var(--portfolio-muted)",
                            }}>
                            {formatRelativeTime(evt.createdAt, language)}
                          </span>
                        </div>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--portfolio-muted)" }}>
                          {evt.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    className="text-center py-8 text-xs font-mono"
                    style={{ color: "var(--portfolio-muted)" }}>
                    {language === "id"
                      ? "Tidak ada aktivitas terbaru yang tercatat."
                      : "No recent activity recorded."}
                  </p>
                )}
              </div>
            </div>

            <div
              className="mt-6 border-t pt-4 text-xs font-mono text-[var(--portfolio-muted)] flex items-center justify-between"
              style={{ borderColor: "var(--portfolio-border)" }}>
              <span>
                {language === "id"
                  ? "Event Publik GitHub"
                  : "Public GitHub Events"}
              </span>
              <a
                href={`https://github.com/${data?.username || "NaufalDsp"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold hover:underline"
                style={{ color: "var(--portfolio-accent)" }}>
                <span>@{data?.username || "NaufalDsp"}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Panel 2: All GitHub Languages */}
          <div
            className="gsap-gh-panel-right flex flex-col justify-between rounded-2xl border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-accent)",
                    }}>
                    <Code2 size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3
                      className="font-display text-base sm:text-lg font-bold"
                      style={{ color: "var(--portfolio-text)" }}>
                      {language === "id"
                        ? "Semua Bahasa di GitHub"
                        : "All Languages on GitHub"}
                    </h3>
                  </div>
                </div>
                <span
                  className="rounded px-2 py-0.5 text-xs font-mono font-bold"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                  }}>
                  {data?.topLanguages.length || 0}{" "}
                  {language === "id" ? "Bahasa" : "Languages"}
                </span>
              </div>

              {/* Languages List */}
              <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2">
                {data?.topLanguages.map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className="font-semibold inline-flex items-center gap-2"
                        style={{ color: "var(--portfolio-text)" }}>
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ background: lang.color }}
                        />
                        {lang.name}
                      </span>
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: "var(--portfolio-muted)" }}>
                        {lang.count}{" "}
                        {language === "id"
                          ? "repo"
                          : lang.count === 1
                            ? "repo"
                            : "repos"}{" "}
                        ({lang.percentage}%)
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full"
                      style={{
                        background: "var(--portfolio-border)",
                      }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(lang.percentage, 3)}%`,
                          background: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct profile CTA */}
            <div
              className="mt-6 border-t pt-4"
              style={{
                borderColor: "var(--portfolio-border)",
              }}>
              <a
                href={data?.profileUrl || "https://github.com/NaufalDsp"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "var(--portfolio-accent)",
                  color: "var(--portfolio-accent-contrast)",
                }}>
                <Github size={15} aria-hidden="true" />
                {language === "id"
                  ? "Lihat Profil GitHub Lengkap"
                  : "View Full GitHub Profile"}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
