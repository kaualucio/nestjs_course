import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCategoriesDto } from './dtos/return-categories.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async findAllCategories(): Promise<ReturnCategoriesDto[]> {
    const categories = await this.categoryService.findAllCategories();
    return categories.map((category) => new ReturnCategoriesDto(category));
  }
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post('/create')
  async createCategory(
    @Body() { name }: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryService.createCategory({ name });

    return category;
  }
}
