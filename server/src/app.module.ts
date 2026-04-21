import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { ArticleImageModule } from './article_image/article_image.module';
import { ArticleImage } from './article_image/entities/article_image.entity';
import { Author } from './author/entities/author.entity';
import { Category } from './category/entities/category.entity';
import { Article } from './article/entities/article.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Points to dist/assets
      serveRoot: '/uploads', // Optional: files accessible via http://localhost:3000/static/image.jpg      // Optional: files accessible via http://localhost:3000/static/image.jpg
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Author, Category, ArticleImage, Article, User],
        synchronize: true, // WARNING: NEVER set this as true in prod.
      }),
    }),
    ArticleModule,
    AuthorModule,
    ArticleImageModule,
    CategoryModule,
    ArticleModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
