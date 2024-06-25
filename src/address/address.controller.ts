import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findeCityById(createAddressDto.city_id);
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
