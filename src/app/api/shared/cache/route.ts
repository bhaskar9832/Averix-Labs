import { NextRequest, NextResponse } from 'next/server';
import { redisCache } from '@/lib/cache/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    cache: redisCache.getStats(),
    cachedKeys: redisCache.keys(),
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (key) {
    redisCache.del(key);
    return NextResponse.json({ success: true, deletedKey: key });
  }
  redisCache.flush();
  return NextResponse.json({ success: true, message: 'Redis cache flushed' });
}
