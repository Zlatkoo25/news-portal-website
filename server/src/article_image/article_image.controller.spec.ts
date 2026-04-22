import { Test, TestingModule } from '@nestjs/testing';
import { ArticleImageController } from './article_image.controller';
import { ArticleImageService } from './article_image.service';

describe('ArticleImageController', () => {
  let controller: ArticleImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleImageController],
      providers: [ArticleImageService],
    }).compile();

    controller = module.get<ArticleImageController>(ArticleImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
