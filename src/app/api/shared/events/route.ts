import { NextRequest, NextResponse } from 'next/server';
import { eventBroker, EventTopic } from '@/lib/events/broker';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 50;

  return NextResponse.json({
    broker: eventBroker.getStats(),
    events: eventBroker.getEvents(limit),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, source, payload } = body;

    if (!topic || !source) {
      return NextResponse.json({ error: 'topic and source are required' }, { status: 400 });
    }

    const event = await eventBroker.publish(topic as EventTopic, source, payload || {});

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
