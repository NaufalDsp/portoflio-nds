import fallbackContributionsRaw from "../data/githubContributionsFallback.json";

export interface GitHubLanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface GitHubActivityEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  description: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionStats {
  totalLastYear: number;
  startDate: string;
  endDate: string;
  busiestDay: {
    date: string;
    count: number;
  };
  longestStreak: {
    days: number;
    startDate: string;
    endDate: string;
  };
  currentStreak: {
    days: number;
    startDate: string;
    endDate: string;
  };
  contributions: ContributionDay[];
}

export interface GitHubDashboardData {
  username: string;
  profileUrl: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguages: GitHubLanguageStat[];
  recentEvents: GitHubActivityEvent[];
  contributionStats?: ContributionStats;
  lastUpdated: string;
  isFallback?: boolean;
}

const GITHUB_USERNAME = "NaufalDsp";
const CACHE_KEY = `github_dashboard_cache_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Blade: "#F05340",
  PHP: "#777BB4",
  CSS: "#1572B6",
  HTML: "#E34F26",
  Vue: "#42B883",
  Python: "#3776AB",
  Java: "#ED8B00",
  Astro: "#FF5D01",
  Go: "#00ADD8",
  Rust: "#DEA584",
  C: "#555555",
  "C++": "#F34B7D",
  "C#": "#178600",
  Shell: "#89E051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  SCSS: "#C6538C",
  Sass: "#A53B70",
};

export function calculateContributionStats(
  contributions: ContributionDay[],
  totalFromApi?: number,
): ContributionStats {
  if (!contributions || contributions.length === 0) {
    return {
      totalLastYear: 0,
      startDate: "",
      endDate: "",
      busiestDay: { date: "", count: 0 },
      longestStreak: { days: 0, startDate: "", endDate: "" },
      currentStreak: { days: 0, startDate: "", endDate: "" },
      contributions: [],
    };
  }

  let totalCount = 0;
  let busiestDay = {
    date: contributions[0].date,
    count: contributions[0].count,
  };
  let longestStreak = { days: 0, startDate: "", endDate: "" };

  let tempStreakDays = 0;
  let tempStreakStart = "";

  for (let i = 0; i < contributions.length; i++) {
    const day = contributions[i];
    totalCount += day.count;

    if (day.count > busiestDay.count) {
      busiestDay = { date: day.date, count: day.count };
    }

    if (day.count > 0) {
      if (tempStreakDays === 0) {
        tempStreakStart = day.date;
      }
      tempStreakDays++;
      if (tempStreakDays > longestStreak.days) {
        longestStreak = {
          days: tempStreakDays,
          startDate: tempStreakStart,
          endDate: day.date,
        };
      }
    } else {
      tempStreakDays = 0;
    }
  }

  // Calculate current streak backwards from latest day
  let curDays = 0;
  let curEnd = "";
  let curStart = "";
  for (let i = contributions.length - 1; i >= 0; i--) {
    const day = contributions[i];
    if (day.count > 0) {
      if (curDays === 0) curEnd = day.date;
      curDays++;
      curStart = day.date;
    } else {
      // If today has 0 commits yet, check yesterday
      if (curDays === 0 && i === contributions.length - 1) {
        continue;
      }
      break;
    }
  }

  const currentStreak = {
    days: curDays,
    startDate: curStart || contributions[contributions.length - 1].date,
    endDate: curEnd || contributions[contributions.length - 1].date,
  };

  return {
    totalLastYear: totalFromApi ?? totalCount,
    startDate: contributions[0].date,
    endDate: contributions[contributions.length - 1].date,
    busiestDay,
    longestStreak,
    currentStreak,
    contributions,
  };
}

export const FALLBACK_CONTRIBUTION_STATS: ContributionStats =
  calculateContributionStats(fallbackContributionsRaw as ContributionDay[], 595);

const FALLBACK_DATA: GitHubDashboardData = {
  username: GITHUB_USERNAME,
  profileUrl: `https://github.com/${GITHUB_USERNAME}`,
  avatarUrl: "https://avatars.githubusercontent.com/u/145748689?v=4",
  bio: "Full Stack Developer & Software Engineer passionate about modern web apps.",
  publicRepos: 27,
  followers: 36,
  following: 37,
  totalStars: 5,
  totalForks: 1,
  topLanguages: [
    { name: "TypeScript", count: 15, percentage: 52, color: "#3178C6" },
    { name: "Blade", count: 3, percentage: 10, color: "#F05340" },
    { name: "PHP", count: 2, percentage: 7, color: "#777BB4" },
    { name: "JavaScript", count: 2, percentage: 7, color: "#F7DF1E" },
    { name: "Vue", count: 2, percentage: 7, color: "#42B883" },
    { name: "CSS", count: 2, percentage: 7, color: "#1572B6" },
    { name: "Python", count: 1, percentage: 3, color: "#3776AB" },
    { name: "Astro", count: 1, percentage: 3, color: "#FF5D01" },
    { name: "HTML", count: 1, percentage: 3, color: "#E34F26" },
  ],
  recentEvents: [
    {
      id: "fallback-1",
      type: "PushEvent",
      repoName: "NaufalDsp/portfolio-nds",
      repoUrl: "https://github.com/NaufalDsp/portfolio-nds",
      createdAt: new Date().toISOString(),
      description: "Pushed updates to main branch",
    },
    {
      id: "fallback-2",
      type: "PushEvent",
      repoName: "NaufalDsp/company-nexora",
      repoUrl: "https://github.com/NaufalDsp/company-nexora",
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      description: "Updated UI features and responsive components",
    },
    {
      id: "fallback-3",
      type: "PushEvent",
      repoName: "NaufalDsp/vidrop",
      repoUrl: "https://github.com/NaufalDsp/vidrop",
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      description: "Refactored core services and client API",
    },
  ],
  contributionStats: FALLBACK_CONTRIBUTION_STATS,
  lastUpdated: new Date().toISOString(),
  isFallback: true,
};

function formatEventDescription(event: any): string {
  switch (event.type) {
    case "PushEvent": {
      const commitCount = event.payload?.commits?.length || 1;
      return `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""}`;
    }
    case "CreateEvent":
      return `Created ${event.payload?.ref_type || "repository"} ${event.payload?.ref || ""}`.trim();
    case "WatchEvent":
      return "Starred repository";
    case "ForkEvent":
      return "Forked repository";
    case "PullRequestEvent":
      return `${event.payload?.action || "Updated"} pull request`;
    default:
      return "Contributed to repository";
  }
}

export async function fetchGitHubDashboardData(
  forceRefresh = false,
): Promise<GitHubDashboardData> {
  if (typeof window !== "undefined" && !forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - new Date(parsed.lastUpdated).getTime();
        if (age < CACHE_TTL_MS) {
          // If cached data is missing contributionStats, recalculate using fallback or fresh fetch
          if (!parsed.contributionStats) {
            parsed.contributionStats = FALLBACK_CONTRIBUTION_STATS;
          }
          return parsed;
        }
      }
    } catch {
      // Ignore cache errors
    }
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    const [profileRes, reposRes, eventsRes, contribsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
        { headers },
      ),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=8`,
        { headers },
      ),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      ).catch(() => null),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API error: status ${profileRes.status}`);
    }

    const profile = await profileRes.json();
    const repos = await reposRes.json();
    const events = eventsRes.ok ? await eventsRes.json() : [];

    // Aggregate statistics
    let totalStars = 0;
    let totalForks = 0;
    const languageCounts: Record<string, number> = {};

    if (Array.isArray(repos)) {
      for (const repo of repos) {
        if (!repo.fork) {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;
        }
        if (repo.language) {
          languageCounts[repo.language] =
            (languageCounts[repo.language] || 0) + 1;
        }
      }
    }

    const totalLangProjects =
      Object.values(languageCounts).reduce((acc, curr) => acc + curr, 0) || 1;

    // Return ALL detected languages (not sliced to 5)
    const topLanguages: GitHubLanguageStat[] = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalLangProjects) * 100),
        color: LANGUAGE_COLORS[name] || "#A855F7",
      }));

    // Process contribution calendar data
    let contributionStats = FALLBACK_CONTRIBUTION_STATS;
    if (contribsRes && contribsRes.ok) {
      try {
        const contribsData = await contribsRes.json();
        if (Array.isArray(contribsData?.contributions) && contribsData.contributions.length > 0) {
          contributionStats = calculateContributionStats(
            contribsData.contributions,
            contribsData.total?.lastYear,
          );
        }
      } catch {
        // Fallback already assigned
      }
    }

    // Process recent activity events
    const recentEvents: GitHubActivityEvent[] = Array.isArray(events)
      ? events.slice(0, 5).map((e: any) => ({
          id: String(e.id),
          type: e.type,
          repoName: e.repo?.name || "Repository",
          repoUrl: `https://github.com/${e.repo?.name || GITHUB_USERNAME}`,
          createdAt: e.created_at || new Date().toISOString(),
          description: formatEventDescription(e),
        }))
      : FALLBACK_DATA.recentEvents;

    const data: GitHubDashboardData = {
      username: profile.login || GITHUB_USERNAME,
      profileUrl: profile.html_url || `https://github.com/${GITHUB_USERNAME}`,
      avatarUrl: profile.avatar_url || FALLBACK_DATA.avatarUrl,
      bio: profile.bio || FALLBACK_DATA.bio,
      publicRepos: profile.public_repos ?? FALLBACK_DATA.publicRepos,
      followers: profile.followers ?? FALLBACK_DATA.followers,
      following: profile.following ?? FALLBACK_DATA.following,
      totalStars,
      totalForks,
      topLanguages:
        topLanguages.length > 0 ? topLanguages : FALLBACK_DATA.topLanguages,
      recentEvents:
        recentEvents.length > 0 ? recentEvents : FALLBACK_DATA.recentEvents,
      contributionStats,
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch {
        // Ignore cache storage errors
      }
    }

    return data;
  } catch (error) {
    console.warn(
      "Failed to fetch live GitHub stats, using fallback telemetry:",
      error,
    );
    return { ...FALLBACK_DATA, lastUpdated: new Date().toISOString() };
  }
}
