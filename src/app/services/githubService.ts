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
  lastUpdated: string;
  isFallback?: boolean;
}

const GITHUB_USERNAME = "NaufalDsp";
const CACHE_KEY = `github_dashboard_cache_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Blade: "#F05340",
  PHP: "#777BB4",
  CSS: "#1572B6",
  HTML: "#E34F26",
  Vue: "#42B883",
  Python: "#3776AB",
  Java: "#ED8B00",
};

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
    { name: "TypeScript", count: 13, percentage: 59, color: "#3178C6" },
    { name: "Blade", count: 3, percentage: 14, color: "#F05340" },
    { name: "CSS", count: 2, percentage: 9, color: "#1572B6" },
    { name: "JavaScript", count: 2, percentage: 9, color: "#F7DF1E" },
    { name: "PHP", count: 2, percentage: 9, color: "#777BB4" },
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

    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
        { headers },
      ),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=8`,
        { headers },
      ),
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
    const topLanguages: GitHubLanguageStat[] = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalLangProjects) * 100),
        color: LANGUAGE_COLORS[name] || "#A855F7",
      }));

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
