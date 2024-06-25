import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createUserMock } from '../__mocks__/create-user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return a user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return an error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return an error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
      Error,
    );
  });

  it('should return a user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return an error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return an error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow(Error);
  });

  it('should return a user in getUserByIdUsingReference', async () => {
    const user = await service.getUserByIdUsingReference(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return an error if user already exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return a new user if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});
