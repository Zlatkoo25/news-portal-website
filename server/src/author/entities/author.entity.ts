import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  first_name!: string;

  @Column({ type: 'varchar' })
  last_name!: string;

  @OneToMany(() => Article, (article) => article.author)
  articles!: Article[];
}
