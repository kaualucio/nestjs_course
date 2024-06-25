import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new NotFoundException('Email e/ou senha inválidos.');
    }

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Email e/ou senha inválidos.');
    }

    return user;
  }
}
