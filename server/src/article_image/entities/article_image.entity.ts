import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity({ name: 'article_images' })
export class ArticleImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  file_path!: string;

  @ManyToOne(() => Article, (article) => article.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article!: Article;
}
