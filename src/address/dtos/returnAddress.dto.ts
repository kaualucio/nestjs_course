import { ReturnCityDto } from '../../city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  number_address: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.number_address = address.number_address;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
