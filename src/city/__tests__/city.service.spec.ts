import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CityEntity } from '../entities/city.entity';
import { CityService } from '../city.service';
import { cityMock } from '../__mocks__/city.mock';
import { CacheService } from '../../cache/cache.service';
import { NotFoundException } from '@nestjs/common';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
            find: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return a city by cityId', async () => {
    const city = await service.findCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return an error if city doesnt exists', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findCityById(cityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return cities cached value in get all cities', async () => {
    const cities = await service.getAllCitiesByStateId(cityMock.stateId);

    expect(cities).toEqual([cityMock]);
  });
});
