import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  async createCategory({ name }: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryExists = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (categoryExists)
      throw new BadRequestException('Theres already a category with this name');

    const category = await this.categoryRepository.save({
      name,
    });

    return category;
  }
}
