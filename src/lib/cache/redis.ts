export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  hitCount: number;
}

export class MemoryRedisCache {
  private store: Map<string, CacheEntry<any>> = new Map();
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
  };

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.stats.misses++;
      return null;
    }

    entry.hitCount++;
    this.stats.hits++;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlSeconds: number = 60): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
      hitCount: 0,
    });
    this.stats.sets++;
  }

  del(key: string): void {
    this.store.delete(key);
  }

  flush(): void {
    this.store.clear();
  }

  getStats() {
    return {
      keysCount: this.store.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      sets: this.stats.sets,
      hitRatio:
        this.stats.hits + this.stats.misses > 0
          ? ((this.stats.hits / (this.stats.hits + this.stats.misses)) * 100).toFixed(1) + '%'
          : '0%',
      engine: 'Redis Cache v7.2-compat (In-Memory Fast Layer)',
    };
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }
}

export const redisCache = new MemoryRedisCache();
