import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  async findOne(id: number) {
    const categories = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categories) {
      throw new NotFoundException();
    }
    return categories;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    return await this.categoryRepository.remove(category);
  }
}
