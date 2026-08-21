interface GitHubReadmeResponse {
  content: string;
  encoding: string;
  name: string;
}

/**
 * Thrown when the GitHub API responds with 403 (rate limit exceeded).
 * Unlike other failure modes, this must not be swallowed: an unauthenticated
 * or exhausted-token build should fail loudly instead of silently shipping a
 * half-rendered page.
 */
class GitHubRateLimitError extends Error {
  constructor(repo: string, endpoint: string, remaining: string | null) {
    super(
      `GitHub API rate limit exceeded while fetching ${endpoint} for "${repo}" ` +
      `(x-ratelimit-remaining: ${remaining ?? 'unknown'}). Set the GITHUB_TOKEN ` +
      `environment variable so build-time requests are authenticated instead of ` +
      `degrading silently.`
    );
    this.name = 'GitHubRateLimitError';
  }
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  // Add GitHub token if available (for higher rate limits)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

/**
 * Fetches the README from a GitHub repository with caching and error handling
 * @param repo - Repository in format "owner/repo"
 * @returns README content as markdown string
 */
export async function fetchGitHubReadme(repo: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/readme`,
      {
        headers: githubHeaders(),
        // Cache for 24 hours - READMEs rarely change
        // For static export, this only affects build-time fetching
        next: { revalidate: 86400 }
      }
    );

    if (response.status === 403) {
      throw new GitHubRateLimitError(repo, 'the README', response.headers.get('x-ratelimit-remaining'));
    }

    if (!response.ok) {
      if (response.status === 404) {
        return `# README nicht gefunden\n\nFür dieses Repository wurde kein README gefunden.`;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubReadmeResponse = await response.json();

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    if (error instanceof GitHubRateLimitError) {
      throw error;
    }
    console.error(`Error fetching README for ${repo}:`, error);
    return `# README nicht verfügbar\n\nDas README für dieses Projekt konnte nicht geladen werden.\n\nMöglicherweise wurde das GitHub-API-Ratenlimit überschritten oder das Repository ist nicht verfügbar.`;
  }
}

/**
 * Fetches repository information from GitHub with caching
 * @param repo - Repository in format "owner/repo"
 * @returns Repository stats (stars, forks, language, etc.) or null on error
 */
export async function fetchGitHubRepoInfo(repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}`,
      {
        headers: githubHeaders(),
        // Cache for 6 hours - stats change more frequently than README
        // but still acceptable to be slightly outdated
        next: { revalidate: 21600 }
      }
    );

    if (response.status === 403) {
      throw new GitHubRateLimitError(repo, 'repo info', response.headers.get('x-ratelimit-remaining'));
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      updatedAt: data.updated_at,
      url: data.html_url,
    };
  } catch (error) {
    // A 403 means the build is running unauthenticated (or with an
    // exhausted token) and is being rate-limited by GitHub. Shipping a
    // portfolio with a flickering, half-rendered stats block is worse than
    // a failed build, so this must propagate and fail `next build` loudly.
    if (error instanceof GitHubRateLimitError) {
      throw error;
    }
    console.error(`Error fetching repo info for ${repo}:`, error);
    return null;
  }
}
