import { Test, TestingModule } from '@nestjs/testing';
// import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should be return user if password and email are valid', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      access_token: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should be return an error if password invalid', async () => {
    expect(
      service.login({ ...loginUserMock, password: '789456' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should be return an error if email doesnt exists', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrow(NotFoundException);
  });

  it('should be return an error if something went wrong in UserService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrow(Error);
  });
});
