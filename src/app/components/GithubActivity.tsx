import { useEffect, useState } from "react";
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
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  fetchGitHubDashboardData,
  FALLBACK_CONTRIBUTION_STATS,
  type GitHubDashboardData,
} from "../services/githubService";
import { Github3DActivity } from "./Github3DActivity";

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
  const { language, t } = useLanguage();
  const [data, setData] = useState<GitHubDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const cardStyle = {
    background: "var(--portfolio-surface)",
    borderColor: "var(--portfolio-border)",
  };

  const contributionStats =
    data?.contributionStats || FALLBACK_CONTRIBUTION_STATS;

  return (
    <section
      id="activity"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <div
            className="inline-flex items-center gap-2 rounded px-2.5 py-1 text-xs font-mono font-semibold mb-3 border"
            style={{
              background: "var(--portfolio-surface-raised)",
              borderColor: "var(--portfolio-border)",
              color: "var(--portfolio-accent)",
            }}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {language === "id"
              ? "Telemetri Langsung GitHub"
              : "Live GitHub Telemetry"}
          </div>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            {language === "id"
              ? "Open Source & Aktivitas"
              : "Open Source & Activity"}
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            {language === "id"
              ? "Metrik repositori publik, visualisasi aktivitas 3D, dan pemetaan seluruh bahasa pemrograman yang digunakan."
              : "Public repository metrics, 3D activity visualization, and telemetry of all programming languages used."}
          </p>
        </motion.div>

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
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="flex items-center gap-3.5 rounded-lg border p-4 sm:p-5 transition-colors"
                style={cardStyle}>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-accent)",
                  }}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <div
                    className="text-xl sm:text-2xl font-bold tracking-tight"
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
              </motion.div>
            );
          })}
        </div>

        {/* Featured 3D Graphic Activity Component (Full Width Majestic Card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8">
          <Github3DActivity
            stats={contributionStats}
            username={data?.username || "NaufalDsp"}
          />
        </motion.div>

        {/* Bottom Dual Panels: Recent Commits (Left) & All Languages (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel 1: Recent Activity Events */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex flex-col justify-between rounded-xl border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-md border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-accent)",
                    }}>
                    <GitCommit size={16} aria-hidden="true" />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: "var(--portfolio-text)" }}>
                    {language === "id" ? "Komit Terbaru" : "Recent Commits"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => void loadData(true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-opacity disabled:opacity-50 hover:underline"
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
                      className="flex items-start gap-3 rounded-lg border p-3.5 transition-colors"
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
              <span>{language === "id" ? "Event Publik GitHub" : "Public GitHub Events"}</span>
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
          </motion.div>

          {/* Panel 2: All GitHub Languages (Complete list, not just 5) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col justify-between rounded-xl border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-md border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-accent)",
                    }}>
                    <Code2 size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold"
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

              {/* Languages List with Scrollable container if list is long */}
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
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
