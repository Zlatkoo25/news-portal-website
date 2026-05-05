import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { ArticleResponseDto } from './dto/single-response-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  private toResponseDto(article: Article) {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      created_at: article.created_at,
      author: article.author,
      categories: article.categories,
      images: article.images,
    };
  }

  async create(dto: CreateArticleDto): Promise<ArticleResponseDto> {
    const article = this.articleRepository.create({
      title: dto.title,
      content: dto.content,
      excerpt: dto.excerpt,
      author: { id: dto.author_id },
      categories: dto.categories?.map((id) => ({ id })),
    });

    const saved = await this.articleRepository.save(article);

    const fullArticle = await this.findOne(saved.id);

    return fullArticle;
  }

  async findAll(): Promise<ArticleResponseDto[]> {
    const articles = await this.articleRepository.find({
      relations: ['author', 'images', 'categories'],
    });

    return articles.map((article) => this.toResponseDto(article));
  }

  async findOne(id: number): Promise<ArticleResponseDto> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author', 'images', 'categories'],
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    return this.toResponseDto(article);
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

  async remove(id: number): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    await this.articleRepository.remove(article);
  }
}
