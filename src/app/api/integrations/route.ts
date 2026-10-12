import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requirePermission } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'system.settings');
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  return NextResponse.json({
    neon: {
      configured: Boolean(process.env.NEON_DATABASE_URL),
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    },
    github: {
      configured: Boolean(process.env.GITHUB_API_KEY || process.env.GITHUB_TOKEN),
      owner: process.env.GITHUB_OWNER || '',
      repo: process.env.GITHUB_REPO || '',
    },
    slack: {
      configured: Boolean(process.env.SLACK_WEBHOOK_URL || process.env.SLACK_BOT_TOKEN),
      channel: process.env.SLACK_CHANNEL || '#general',
      hasWebhook: Boolean(process.env.SLACK_WEBHOOK_URL),
      hasToken: Boolean(process.env.SLACK_BOT_TOKEN),
    },
  });
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'system.settings');
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const {
      neonDatabaseUrl,
      githubApiKey,
      githubOwner,
      githubRepo,
      slackWebhookUrl,
      slackBotToken,
      slackChannel,
    } = body;

    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }

    const updateEnvVar = (content: string, key: string, value?: string) => {
      if (value === undefined) return content;
      const regex = new RegExp(`^${key}=.*$`, 'm');
      const formattedVal = value.includes(' ') || value.includes('"') ? `"${value.replace(/"/g, '\\"')}"` : value;
      if (regex.test(content)) {
        return content.replace(regex, `${key}=${formattedVal}`);
      } else {
        return `${content.trim()}\n${key}=${formattedVal}\n`;
      }
    };

    if (neonDatabaseUrl !== undefined) {
      envContent = updateEnvVar(envContent, 'NEON_DATABASE_URL', neonDatabaseUrl);
      process.env.NEON_DATABASE_URL = neonDatabaseUrl;
    }
    if (githubApiKey !== undefined) {
      envContent = updateEnvVar(envContent, 'GITHUB_API_KEY', githubApiKey);
      process.env.GITHUB_API_KEY = githubApiKey;
    }
    if (githubOwner !== undefined) {
      envContent = updateEnvVar(envContent, 'GITHUB_OWNER', githubOwner);
      process.env.GITHUB_OWNER = githubOwner;
    }
    if (githubRepo !== undefined) {
      envContent = updateEnvVar(envContent, 'GITHUB_REPO', githubRepo);
      process.env.GITHUB_REPO = githubRepo;
    }
    if (slackWebhookUrl !== undefined) {
      envContent = updateEnvVar(envContent, 'SLACK_WEBHOOK_URL', slackWebhookUrl);
      process.env.SLACK_WEBHOOK_URL = slackWebhookUrl;
    }
    if (slackBotToken !== undefined) {
      envContent = updateEnvVar(envContent, 'SLACK_BOT_TOKEN', slackBotToken);
      process.env.SLACK_BOT_TOKEN = slackBotToken;
    }
    if (slackChannel !== undefined) {
      envContent = updateEnvVar(envContent, 'SLACK_CHANNEL', slackChannel);
      process.env.SLACK_CHANNEL = slackChannel;
    }

    fs.writeFileSync(envPath, envContent, 'utf-8');

    await logAuditEvent({
      userId: auth.session?.id,
      action: 'SETTINGS_CHANGED',
      resourceType: 'integrations',
      resourceId: 'api_keys',
      metadata: { updatedKeys: Object.keys(body) },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Admin Dashboard',
    });

    return NextResponse.json({
      success: true,
      message: 'Integration configurations saved and loaded successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
