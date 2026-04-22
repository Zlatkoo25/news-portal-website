import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { ArticleImage } from '../../article_image/entities/article_image.entity';
import { Category } from '../../category/entities/category.entity';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => ArticleImage, (image) => image.article, { cascade: true })
  images!: ArticleImage[];

  @ManyToOne(() => Author, (author) => author.articles, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author!: Author;

  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];
}
