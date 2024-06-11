import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const newUser = this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });

    return newUser;
  }

  async getAllUser(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
