import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  number_address: number;

  @IsString()
  cep: string;

  @IsInt()
  city_id: number;
}
