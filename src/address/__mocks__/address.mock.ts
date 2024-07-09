import { cityMock } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AddressEntity } from '../entities/address.entity';

export const addressMock: AddressEntity = {
  cep: '43253252',
  city_id: cityMock.id,
  complement: 'llkdfja',
  createdAt: new Date(),
  id: 57546,
  number_address: 654,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
