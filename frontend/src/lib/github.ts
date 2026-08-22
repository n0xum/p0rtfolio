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

/**
 * Thrown for any non-403 `!response.ok` result. Carries the numeric status
 * so callers that need to branch on a specific code (the README's 404
 * "not found" case) can check `error.status` instead of parsing the message.
 */
class GitHubApiError extends Error {
  constructor(public readonly status: number) {
    super(`GitHub API error: ${status}`);
    this.name = 'GitHubApiError';
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
 * Authenticated GitHub API GET, shared by the README and repo-info fetches:
 * same headers, same 403 -> GitHubRateLimitError translation, same
 * `!response.ok` guard. Callers own everything after a successful response
 * (JSON shape, caching semantics) and their own error handling - the
 * asymmetry between the two callers' catch blocks (one returns a German
 * fallback string, one returns null) is deliberate and lives at the call
 * site, not here.
 * @param path - API path appended to https://api.github.com, e.g. "/repos/owner/repo"
 * @param repo - Repository in format "owner/repo", used only for error messages
 * @param endpointLabel - Human-readable label for the rate-limit error message
 * @param revalidate - Next.js fetch cache window, in seconds
 */
async function githubApiFetch(
  path: string,
  repo: string,
  endpointLabel: string,
  revalidate: number
): Promise<Response> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: githubHeaders(),
    next: { revalidate },
  });

  if (response.status === 403) {
    throw new GitHubRateLimitError(repo, endpointLabel, response.headers.get('x-ratelimit-remaining'));
  }

  if (!response.ok) {
    throw new GitHubApiError(response.status);
  }

  return response;
}

/**
 * Fetches the README from a GitHub repository with caching and error handling
 * @param repo - Repository in format "owner/repo"
 * @returns README content as markdown string
 */
export async function fetchGitHubReadme(repo: string): Promise<string> {
  try {
    // Cache for 24 hours - READMEs rarely change.
    // For static export, this only affects build-time fetching.
    const response = await githubApiFetch(`/repos/${repo}/readme`, repo, 'the README', 86400);
    const data: GitHubReadmeResponse = await response.json();

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    if (error instanceof GitHubRateLimitError) {
      throw error;
    }
    if (error instanceof GitHubApiError && error.status === 404) {
      return `# README nicht gefunden\n\nFür dieses Repository wurde kein README gefunden.`;
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
    // Cache for 6 hours - stats change more frequently than README but
    // still acceptable to be slightly outdated.
    const response = await githubApiFetch(`/repos/${repo}`, repo, 'repo info', 21600);
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
