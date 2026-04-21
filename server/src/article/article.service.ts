import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    if (!createArticleDto.author_id) {
      throw new BadRequestException('Author ID is required');
    }

    const article = this.articleRepository.create({
      title: createArticleDto.title,
      content: createArticleDto.content,
      excerpt: createArticleDto.excerpt,
      author: { id: createArticleDto.author_id },
      categories: createArticleDto.categories?.map((id) => ({ id })),
    });

    return await this.articleRepository.save(article);
  }

  async findAll() {
    const articles = await this.articleRepository.find({
      relations: ['author', 'images', 'categories'],
    });

    if (!articles.length) {
      throw new NotFoundException('No articles found');
    }

    return articles;
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author', 'images', 'categories'],
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);

    Object.assign(article, {
      ...updateArticleDto,
      author: updateArticleDto.author_id
        ? { id: updateArticleDto.author_id }
        : article.author,
      categories: updateArticleDto.categories
        ? updateArticleDto.categories.map((id) => ({ id }))
        : article.categories,
    });

    return await this.articleRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    return await this.articleRepository.remove(article);
  }
}
