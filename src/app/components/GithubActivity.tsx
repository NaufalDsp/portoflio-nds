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
  useTheme();
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
    background: "var(--portfolio-surface)",
    borderColor: "var(--portfolio-border)",
  };

  return (
    <section
      id="activity"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded px-2.5 py-1 text-xs font-mono font-semibold mb-3 border"
            style={{
              background: "var(--portfolio-surface-raised)",
              borderColor: "var(--portfolio-border)",
              color: "var(--portfolio-accent)",
            }}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live GitHub Telemetry
          </div>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            Open Source &amp; Activity
          </h2>
          <p
            className="max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            Public repository metrics, continuous contributions, and recent
            commits fetched directly from my GitHub profile.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          {[
            {
              icon: GitBranch,
              label: "Public Repositories",
              value: data ? `${data.publicRepos}` : "27",
            },
            {
              icon: Star,
              label: "Stargazers Earned",
              value: data ? `${data.totalStars}` : "5",
            },
            {
              icon: Users,
              label: "Network Followers",
              value: data ? `${data.followers}` : "36",
            },
            {
              icon: Code2,
              label: "Primary Language",
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

        {/* Dual Panel Layout: Heatmap & Recent Events/Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contribution Heatmap Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-3 flex flex-col justify-between rounded-lg border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-md border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-accent)",
                    }}>
                    <Activity size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold"
                      style={{ color: "var(--portfolio-text)" }}>
                      Contribution Graph
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--portfolio-muted)" }}>
                      Public activity across open repositories over the last
                      year
                    </p>
                  </div>
                </div>

                <a
                  href={`https://github.com/${data?.username || "NaufalDsp"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                  style={{ color: "var(--portfolio-accent)" }}>
                  <Github size={14} aria-hidden="true" />@
                  {data?.username || "NaufalDsp"}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>

              {/* Heatmap Image Wrapper */}
              <div
                className="overflow-x-auto rounded-md border p-3.5 sm:p-4"
                style={{
                  background: "var(--portfolio-surface-raised)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <img
                  src={`https://ghchart.rshah.org/146B66/${data?.username || "NaufalDsp"}`}
                  alt={`${data?.username || "NaufalDsp"}'s GitHub Contributions`}
                  loading="lazy"
                  className="min-w-[620px] w-full select-none"
                />
              </div>
            </div>

            {/* Bottom meta row */}
            <div
              className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs font-mono"
              style={{
                borderColor: "var(--portfolio-border)",
                color: "var(--portfolio-muted)",
              }}>
              <span>Source: GitHub REST API</span>
              <button
                type="button"
                onClick={() => void loadData(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 font-semibold transition-opacity disabled:opacity-50 hover:underline"
                style={{ color: "var(--portfolio-accent)" }}>
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
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-2 flex flex-col justify-between rounded-lg border p-6 sm:p-7"
            style={cardStyle}>
            <div>
              {/* Tab Selector */}
              <div
                className="grid grid-cols-2 gap-1 rounded-md p-1 mb-6 border"
                style={{
                  background: "var(--portfolio-surface-raised)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <button
                  type="button"
                  onClick={() => setActiveTab("activity")}
                  className="rounded py-1.5 text-xs font-semibold transition-all"
                  style={{
                    background:
                      activeTab === "activity"
                        ? "var(--portfolio-surface)"
                        : "transparent",
                    color:
                      activeTab === "activity"
                        ? "var(--portfolio-text)"
                        : "var(--portfolio-muted)",
                    boxShadow:
                      activeTab === "activity"
                        ? "0 1px 3px rgba(0,0,0,0.08)"
                        : "none",
                  }}>
                  Recent Commits
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("languages")}
                  className="rounded py-1.5 text-xs font-semibold transition-all"
                  style={{
                    background:
                      activeTab === "languages"
                        ? "var(--portfolio-surface)"
                        : "transparent",
                    color:
                      activeTab === "languages"
                        ? "var(--portfolio-text)"
                        : "var(--portfolio-muted)",
                    boxShadow:
                      activeTab === "languages"
                        ? "0 1px 3px rgba(0,0,0,0.08)"
                        : "none",
                  }}>
                  Top Languages
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "activity" ? (
                  <motion.div
                    key="tab-activity"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3">
                    {data?.recentEvents && data.recentEvents.length > 0 ? (
                      data.recentEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="flex items-start gap-3 rounded-md border p-3 transition-colors"
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
                              <p
                                className="text-xs font-bold truncate font-mono"
                                style={{
                                  color: "var(--portfolio-text)",
                                }}>
                                {evt.repoName.replace(`${data.username}/`, "")}
                              </p>
                              <span
                                className="text-[10px] shrink-0 font-mono"
                                style={{
                                  color: "var(--portfolio-muted)",
                                }}>
                                {formatRelativeTime(evt.createdAt)}
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
                        No recent activity recorded.
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-languages"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3.5">
                    {data?.topLanguages.map((lang) => (
                      <div key={lang.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className="font-semibold inline-flex items-center gap-1.5"
                            style={{ color: "var(--portfolio-text)" }}>
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: lang.color }}
                            />
                            {lang.name}
                          </span>
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: "var(--portfolio-muted)" }}>
                            {lang.count} {lang.count === 1 ? "repo" : "repos"} (
                            {lang.percentage}%)
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
                View Full GitHub Profile
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
