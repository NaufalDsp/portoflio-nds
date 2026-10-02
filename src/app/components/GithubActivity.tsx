import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Code2,
  GitBranch,
  GitCommit,
  Github,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import {
  fetchGitHubDashboardData,
  type GitHubDashboardData,
} from "../services/githubService";

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function GithubActivity() {
  const { isDark } = useTheme();
  const [data, setData] = useState<GitHubDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"activity" | "languages">(
    "activity",
  );

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
    background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
    borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    boxShadow: isDark
      ? "0 4px 30px rgba(0,0,0,0.4)"
      : "0 4px 30px rgba(0,0,0,0.05)",
  };

  return (
    <section
      id="activity"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #0D0D12 0%, #0F0F18 100%)"
          : "linear-gradient(180deg, #F0F4FF 0%, #F8F9FF 100%)",
      }}>
      {/* Background glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(79,172,254,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(79,172,254,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold mb-3.5"
            style={{
              background: isDark
                ? "rgba(52,211,153,0.08)"
                : "rgba(16,185,129,0.08)",
              borderColor: isDark
                ? "rgba(52,211,153,0.25)"
                : "rgba(16,185,129,0.25)",
              color: isDark ? "#34D399" : "#059669",
            }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live Telemetry
          </div>
          <h2
            className="mb-4 text-3xl font-extrabold sm:text-4xl"
            style={{
              color: isDark ? "#E8EAF0" : "#1F2937",
              letterSpacing: "-0.02em",
            }}>
            Open Source &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              GitHub Activity
            </span>
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
            Real-time activity and repository metrics fetched directly from my
            GitHub profile.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          {[
            {
              icon: GitBranch,
              label: "Public Repositories",
              value: data ? `${data.publicRepos}` : "27",
              color: "#4FACFE",
            },
            {
              icon: Star,
              label: "Stargazers Earned",
              value: data ? `${data.totalStars}` : "5",
              color: "#FBBF24",
            },
            {
              icon: Users,
              label: "Network Followers",
              value: data ? `${data.followers}` : "36",
              color: "#A855F7",
            },
            {
              icon: Code2,
              label: "Primary Language",
              value: data?.topLanguages[0]?.name || "TypeScript",
              color: "#34D399",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-center gap-4 rounded-2xl border p-5 transition-transform duration-200 hover:-translate-y-1"
                style={cardStyle}>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    background: `${item.color}15`,
                    borderColor: `${item.color}30`,
                    color: item.color,
                  }}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <div
                    className="text-2xl font-extrabold tracking-tight"
                    style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                    {loading ? "..." : item.value}
                  </div>
                  <div
                    className="text-xs font-medium leading-snug mt-0.5"
                    style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
                    {item.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dual Panel Layout: Heatmap & Recent Events/Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contribution Heatmap Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3 flex flex-col justify-between rounded-2xl border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)",
                      color: "#4FACFE",
                    }}>
                    <Activity size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold"
                      style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                      Contribution Graph
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
                      Contributions across open repositories over the last year
                    </p>
                  </div>
                </div>

                <a
                  href={`https://github.com/${data?.username || "NaufalDsp"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-500 hover:text-sky-400 transition-colors">
                  <Github size={14} aria-hidden="true" />@
                  {data?.username || "NaufalDsp"}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>

              {/* Heatmap Image Wrapper with Horizontal Scroll on small devices */}
              <div
                className="overflow-x-auto rounded-xl border p-3.5 sm:p-4"
                style={{
                  background: isDark
                    ? "rgba(0,0,0,0.3)"
                    : "rgba(240,244,255,0.5)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.06)",
                }}>
                <img
                  src={`https://ghchart.rshah.org/4FACFE/${data?.username || "NaufalDsp"}`}
                  alt={`${data?.username || "NaufalDsp"}'s GitHub Contributions`}
                  loading="lazy"
                  className="min-w-[620px] w-full select-none"
                  style={{
                    filter: isDark ? "contrast(1.15) brightness(1.1)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Bottom meta row */}
            <div
              className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(0,0,0,0.07)",
                color: isDark ? "#707890" : "#8B91A5",
              }}>
              <span>Source: GitHub REST API · Refreshes periodically</span>
              <button
                type="button"
                onClick={() => void loadData(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 font-semibold text-sky-500 hover:text-sky-400 transition-colors disabled:opacity-50">
                <RefreshCw
                  size={12}
                  className={refreshing ? "animate-spin" : ""}
                  aria-hidden="true"
                />
                {refreshing ? "Refreshing..." : "Sync now"}
              </button>
            </div>
          </motion.div>

          {/* Right Panel: Tabs for Recent Events or Languages (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col justify-between rounded-2xl border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              {/* Tab Selector */}
              <div
                className="grid grid-cols-2 gap-1 rounded-xl p-1 mb-6 border"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.03)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                }}>
                <button
                  type="button"
                  onClick={() => setActiveTab("activity")}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    activeTab === "activity"
                      ? "shadow-sm"
                      : "hover:text-sky-500"
                  }`}
                  style={{
                    background:
                      activeTab === "activity"
                        ? isDark
                          ? "#1B1B26"
                          : "#FFFFFF"
                        : "transparent",
                    color:
                      activeTab === "activity"
                        ? isDark
                          ? "#FFFFFF"
                          : "#1F2937"
                        : isDark
                          ? "#8B91A5"
                          : "#6B7280",
                  }}>
                  Recent Activity
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("languages")}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    activeTab === "languages"
                      ? "shadow-sm"
                      : "hover:text-sky-500"
                  }`}
                  style={{
                    background:
                      activeTab === "languages"
                        ? isDark
                          ? "#1B1B26"
                          : "#FFFFFF"
                        : "transparent",
                    color:
                      activeTab === "languages"
                        ? isDark
                          ? "#FFFFFF"
                          : "#1F2937"
                        : isDark
                          ? "#8B91A5"
                          : "#6B7280",
                  }}>
                  Top Languages
                </button>
              </div>

              {/* Tab 1: Activity */}
              <AnimatePresence mode="wait">
                {activeTab === "activity" ? (
                  <motion.div
                    key="tab-activity"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4">
                    {data?.recentEvents && data.recentEvents.length > 0 ? (
                      data.recentEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="flex items-start gap-3 rounded-xl border p-3.5 transition-colors"
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,0.02)"
                              : "rgba(0,0,0,0.015)",
                            borderColor: isDark
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.06)",
                          }}>
                          <div
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sky-400"
                            style={{
                              background: isDark
                                ? "rgba(79,172,254,0.1)"
                                : "rgba(79,172,254,0.08)",
                              borderColor: "rgba(79,172,254,0.25)",
                            }}>
                            <GitCommit size={14} aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <p
                                className="text-xs font-bold truncate"
                                style={{
                                  color: isDark ? "#E8EAF0" : "#1F2937",
                                }}>
                                {evt.repoName.replace(`${data.username}/`, "")}
                              </p>
                              <span
                                className="text-[11px] shrink-0 font-medium"
                                style={{
                                  color: isDark ? "#6B7080" : "#9CA3AF",
                                }}>
                                {formatRelativeTime(evt.createdAt)}
                              </span>
                            </div>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
                              {evt.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p
                        className="text-center py-8 text-xs"
                        style={{ color: isDark ? "#6B7080" : "#9CA3AF" }}>
                        No recent activity recorded.
                      </p>
                    )}
                  </motion.div>
                ) : (
                  /* Tab 2: Top Languages */
                  <motion.div
                    key="tab-languages"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4">
                    {data?.topLanguages.map((lang) => (
                      <div key={lang.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className="font-bold inline-flex items-center gap-2"
                            style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: lang.color }}
                            />
                            {lang.name}
                          </span>
                          <span
                            className="font-semibold"
                            style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
                            {lang.count} {lang.count === 1 ? "repo" : "repos"} (
                            {lang.percentage}%)
                          </span>
                        </div>
                        <div
                          className="h-2 w-full overflow-hidden rounded-full"
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.06)",
                          }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${lang.percentage}%`,
                              background: lang.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct profile CTA */}
            <div
              className="mt-6 border-t pt-4"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(0,0,0,0.07)",
              }}>
              <a
                href={data?.profileUrl || "https://github.com/NaufalDsp"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                  boxShadow: "0 4px 18px rgba(79,172,254,0.3)",
                }}>
                <Github size={15} aria-hidden="true" />
                View Full GitHub Profile
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
