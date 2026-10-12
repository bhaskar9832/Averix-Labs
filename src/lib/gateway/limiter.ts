export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  totalLimit: number;
}

// In-memory sliding window bucket per client IP
const ipBucket = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  clientIp: string,
  limit: number = 100, // 100 requests
  windowMs: number = 60 * 1000 // per 60 seconds
): RateLimitResult {
  const now = Date.now();
  const bucket = ipBucket.get(clientIp);

  if (!bucket || now > bucket.resetAt) {
    ipBucket.set(clientIp, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetMs: windowMs,
      totalLimit: limit,
    };
  }

  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);
  const resetMs = Math.max(0, bucket.resetAt - now);

  return {
    allowed: bucket.count <= limit,
    remaining,
    resetMs,
    totalLimit: limit,
  };
}

export interface GatewayLogItem {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  origin: string;
  subdomain: string;
  status: number;
  latencyMs: number;
  ip: string;
}

const memoryGatewayLogs: GatewayLogItem[] = [];

export function logGatewayRequest(item: GatewayLogItem) {
  memoryGatewayLogs.unshift(item);
  if (memoryGatewayLogs.length > 200) {
    memoryGatewayLogs.pop();
  }
}

export function getGatewayTelemetry() {
  return memoryGatewayLogs.slice(0, 50);
}
