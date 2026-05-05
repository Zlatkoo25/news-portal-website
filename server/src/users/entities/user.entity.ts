import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Exclude()
  @Column({ select: false })
  password!: string;

  @Exclude()
  @Column({ type: 'text', nullable: true, select: false })
  refresh_token!: string | null;
}
