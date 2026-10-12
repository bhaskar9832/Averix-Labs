import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Enforce security check: caller must have valid admin session or permission
  const auth = await requirePermission(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  const apiKey = process.env.GITHUB_API_KEY || process.env.GITHUB_TOKEN;
  const targetOwner = process.env.GITHUB_OWNER || 'averixlabs001';

  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      message: 'GitHub API Key / PAT is not configured in .env.local',
    }, { status: 400 });
  }

  try {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Averix-Labs-Platform/2.0',
    };

    // 1. Fetch User Profile & Account Data
    const userRes = await fetch('https://api.github.com/user', { headers });
    const userData = await userRes.json();

    if (!userRes.ok) {
      return NextResponse.json({ configured: false, error: userData.message }, { status: userRes.status });
    }

    // 2. Fetch ALL Repositories accessible by this token
    const reposRes = await fetch('https://api.github.com/user/repos?per_page=100&sort=pushed&affiliation=owner,collaborator,organization_member', { headers });
    const rawRepos = await reposRes.json();
    const repos = Array.isArray(rawRepos) ? rawRepos : [];

    // Filter repos belonging to the target account or organizations if specified
    const accountRepos = repos.filter((r: any) => 
      r.owner?.login?.toLowerCase() === targetOwner.toLowerCase() ||
      r.owner?.login?.toLowerCase() === userData.login?.toLowerCase()
    );

    // 3. Fetch User Activity Events (Audit Stream)
    const eventsRes = await fetch(`https://api.github.com/users/${userData.login}/events?per_page=50`, { headers });
    const rawEvents = await eventsRes.json();
    const events = Array.isArray(rawEvents) ? rawEvents : [];

    // 4. Multi-Repo Aggregation Metrics
    let totalStars = 0;
    let totalForks = 0;
    let totalOpenIssues = 0;
    let totalWatchers = 0;
    let totalSizeKb = 0;

    const languagesAggregate: Record<string, number> = {};
    const repoBarData: Array<{ name: string; stars: number; forks: number; sizeKb: number; issues: number }> = [];

    // Fetch deep details for repositories in parallel (up to 10 repos)
    const detailedRepos = await Promise.all(
      accountRepos.slice(0, 10).map(async (repo: any) => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        totalOpenIssues += repo.open_issues_count || 0;
        totalWatchers += repo.watchers_count || 0;
        totalSizeKb += repo.size || 0;

        repoBarData.push({
          name: repo.name,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          sizeKb: repo.size || 0,
          issues: repo.open_issues_count || 0,
        });

        // Fetch repo languages
        const langRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`, { headers });
        const langData = await langRes.json();
        if (langData && typeof langData === 'object' && !langData.message) {
          Object.entries(langData).forEach(([lang, bytes]) => {
            languagesAggregate[lang] = (languagesAggregate[lang] || 0) + (Number(bytes) || 0);
          });
        }

        // Fetch latest commits for this repo
        const commitsRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=10`, { headers });
        const commitsData = await commitsRes.json();

        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          isPrivate: repo.private,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues: repo.open_issues_count,
          language: repo.language || 'Documentation',
          updatedAt: repo.updated_at,
          pushedAt: repo.pushed_at,
          commits: Array.isArray(commitsData) ? commitsData.map((c: any) => ({
            sha: c.sha?.substring(0, 7),
            message: c.commit?.message?.split('\n')[0] || '',
            author: c.commit?.author?.name || c.author?.login,
            date: c.commit?.author?.date,
            url: c.html_url,
          })) : [],
        };
      })
    );

    // Calculate Language percentages for Pie Chart
    const totalLangBytes = Object.values(languagesAggregate).reduce((a, b) => a + b, 0);
    const languagePieData = Object.entries(languagesAggregate).map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalLangBytes > 0 ? Number(((bytes / totalLangBytes) * 100).toFixed(1)) : 0,
    }));

    // If languages were empty (e.g., pure markdown/config repos), supply Markdown breakdown
    if (languagePieData.length === 0) {
      languagePieData.push({
        name: 'Markdown & Docs',
        bytes: totalSizeKb * 1024,
        percentage: 100,
      });
    }

    // Process Event distribution for event type pie/bar chart
    const eventTypeMap: Record<string, number> = {};
    events.forEach((e: any) => {
      const type = e.type?.replace('Event', '') || 'General';
      eventTypeMap[type] = (eventTypeMap[type] || 0) + 1;
    });

    const eventDistribution = Object.entries(eventTypeMap).map(([type, count]) => ({
      name: type,
      count,
    }));

    // Compile global commit activity across all repositories
    const allRecentCommits = detailedRepos.flatMap((r) => 
      r.commits.map((c) => ({
        ...c,
        repoName: r.name,
      }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 15);

    // Timeline cadence for Area Chart
    const timelineMap: Record<string, number> = {};
    allRecentCommits.forEach((c) => {
      if (c.date) {
        const d = new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        timelineMap[d] = (timelineMap[d] || 0) + 1;
      }
    });
    const commitTimeline = Object.entries(timelineMap).map(([date, count]) => ({
      date,
      commits: count,
    }));

    return NextResponse.json({
      configured: true,
      account: {
        login: userData.login,
        name: userData.name || 'Averix Labs',
        avatarUrl: userData.avatar_url,
        bio: userData.bio,
        htmlUrl: userData.html_url,
        publicRepos: userData.public_repos || accountRepos.length,
        followers: userData.followers || 0,
        following: userData.following || 0,
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
      },
      summary: {
        totalRepositories: accountRepos.length,
        totalStars,
        totalForks,
        totalOpenIssues,
        totalWatchers,
        totalSizeMb: (totalSizeKb / 1024).toFixed(2),
      },
      charts: {
        languages: languagePieData,
        repoBarData,
        eventDistribution,
        commitTimeline,
      },
      repositories: detailedRepos,
      recentCommits: allRecentCommits,
      activityFeed: events.slice(0, 10).map((e: any) => ({
        id: e.id,
        type: e.type?.replace('Event', ''),
        repoName: e.repo?.name,
        actor: e.actor?.login,
        avatar: e.actor?.avatar_url,
        createdAt: e.created_at,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
