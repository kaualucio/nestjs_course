import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategoriesDto {
  id: number;
  name: string;

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
  }
}
