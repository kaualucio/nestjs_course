import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enums/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 1,
  name: 'Usuário',
  email: 'user@example.com',
  password: '123456',
  cpf: '999.999.999-99',
  phone: '99 9 99999-9999',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
  addresses: [],
};
