import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleImage } from './entities/article_image.entity';
import { CreateArticleImageDto } from './dto/create-article_image.dto';
import { UpdateArticleImageDto } from './dto/update-article_image.dto';

@Injectable()
export class ArticleImageService {
  constructor(
    @InjectRepository(ArticleImage)
    private readonly articleImageRepository: Repository<ArticleImage>,
  ) {}

  async create(createArticleImageDto: CreateArticleImageDto) {
    if (!createArticleImageDto.article_id) {
      throw new BadRequestException('Article ID is required');
    }

    const image = this.articleImageRepository.create({
      file_path: createArticleImageDto.file_path,
      article: { id: createArticleImageDto.article_id },
    });

    return await this.articleImageRepository.save(image);
  }

  async findAll() {
    const images = await this.articleImageRepository.find({
      relations: ['article'],
    });

    if (!images.length) {
      throw new NotFoundException('No article images found');
    }

    return images;
  }

  async findOne(id: number) {
    const image = await this.articleImageRepository.findOne({
      where: { id },
      relations: ['article'],
    });

    if (!image) {
      throw new NotFoundException();
    }
    return image;
  }

  async update(id: number, updateArticleImageDto: UpdateArticleImageDto) {
    const image = await this.findOne(id);

    Object.assign(image, updateArticleImageDto);

    return await this.articleImageRepository.save(image);
  }

  async remove(id: number) {
    const image = await this.findOne(id);

    return await this.articleImageRepository.remove(image);
  }
}
