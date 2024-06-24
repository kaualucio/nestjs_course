import { Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from './../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(CityEntity)
    private readonly stateRepository: Repository<CityEntity>,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const citiesCache: CityEntity[] = await this.cacheService.getCache<
      CityEntity[]
    >(`state_${stateId}`);

    if (citiesCache) return citiesCache;

    const cities = await this.stateRepository.find({
      where: {
        stateId,
      },
    });

    await this.cacheService.setCache(`state_${stateId}`, cities);

    return cities;
  }
}
