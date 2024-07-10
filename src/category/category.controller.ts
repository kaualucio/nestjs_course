import { Controller, Get } from '@nestjs/common';
import { ReturnCategoriesDto } from './dtos/return-categories.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategoriesDto[]> {
    const categories = await this.categoryService.findAllCategories();
    return categories.map((category) => new ReturnCategoriesDto(category));
  }
}
