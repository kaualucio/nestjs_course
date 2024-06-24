import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 1000 * 60 * 60 * 8, // 8 horas
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
