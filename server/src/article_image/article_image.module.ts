import { Module } from '@nestjs/common';
import { ArticleImageService } from './article_image.service';
import { ArticleImageController } from './article_image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleImage } from './entities/article_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleImage])],
  controllers: [ArticleImageController],
  providers: [ArticleImageService],
  exports: [TypeOrmModule],
})
export class ArticleImageModule {}
