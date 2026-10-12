import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const botToken = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL || '#general';

  if (!webhookUrl && !botToken) {
    return NextResponse.json({
      configured: false,
      message: 'Slack integration is not configured. Provide SLACK_WEBHOOK_URL or SLACK_BOT_TOKEN in .env.local.',
    }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { text, title, fields } = body;

    if (!text && !title) {
      return NextResponse.json({ error: 'Text or title is required to send a Slack notification.' }, { status: 400 });
    }

    // 1. If Webhook URL is available, send webhook payload
    if (webhookUrl) {
      const payload: any = {
        text: title ? `*${title}*\n${text || ''}` : text,
      };

      if (fields && Array.isArray(fields)) {
        payload.attachments = [
          {
            color: '#4f46e5',
            fields: fields.map((f: any) => ({
              title: f.title,
              value: f.value,
              short: f.short !== false,
            })),
          },
        ];
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return NextResponse.json({ success: false, error: errorText }, { status: 502 });
      }

      return NextResponse.json({ success: true, message: 'Dispatched to Slack channel via Webhook.' });
    }

    // 2. If Bot Token is configured, use Slack Web API
    if (botToken) {
      const res = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel,
          text: title ? `*${title}*\n${text || ''}` : text,
        }),
      });

      const data = await res.json();
      if (!data.ok) {
        return NextResponse.json({ success: false, error: data.error }, { status: 502 });
      }

      return NextResponse.json({ success: true, message: `Dispatched to Slack channel ${channel}.`, ts: data.ts });
    }

    return NextResponse.json({ configured: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: Check Slack integration status
export async function GET() {
  const isConfigured = Boolean(process.env.SLACK_WEBHOOK_URL || process.env.SLACK_BOT_TOKEN);
  return NextResponse.json({
    configured: isConfigured,
    method: process.env.SLACK_WEBHOOK_URL ? 'Webhook' : process.env.SLACK_BOT_TOKEN ? 'Bot Token' : 'None',
    channel: process.env.SLACK_CHANNEL || '#general',
  });
}
