interface GitHubReadmeResponse {
  content: string;
  encoding: string;
  name: string;
}

/**
 * Fetches the README from a GitHub repository with caching and error handling
 * @param repo - Repository in format "owner/repo"
 * @returns README content as markdown string
 */
export async function fetchGitHubReadme(repo: string): Promise<string> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available (for higher rate limits)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${repo}/readme`,
      {
        headers,
        // Cache for 24 hours - READMEs rarely change
        // For static export, this only affects build-time fetching
        next: { revalidate: 86400 }
      }
    );

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
    console.error(`Error fetching README for ${repo}:`, error);
    return `# README nicht verfügbar\n\nDas README für dieses Projekt konnte nicht geladen werden.\n\nMöglicherweise ist die GitHub API-Rate überschritten oder das Repository ist nicht verfügbar.`;
  }
}

/**
 * Fetches repository information from GitHub with caching
 * @param repo - Repository in format "owner/repo"
 * @returns Repository stats (stars, forks, language, etc.) or null on error
 */
export async function fetchGitHubRepoInfo(repo: string) {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available (for higher rate limits)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${repo}`,
      {
        headers,
        // Cache for 6 hours - stats change more frequently than README
        // but still acceptable to be slightly outdated
        next: { revalidate: 21600 }
      }
    );

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
    console.error(`Error fetching repo info for ${repo}:`, error);
    return null;
  }
}