import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(key: string): Promise<T | null> {
    const allData: T = await this.cacheManager.get(key);

    if (allData) return allData;

    return null;
  }

  async setCache<T>(key: string, data: T): Promise<void> {
    await this.cacheManager.set(key, data);
  }
}
