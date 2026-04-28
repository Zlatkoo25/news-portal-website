import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);

    return await this.authorRepository.save(author);
  }

  async findAll() {
    const authors = await this.authorRepository.find();

    return authors;
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException();
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.findOne(id);
    if (!author) {
      throw new NotFoundException();
    }

    Object.assign(author, updateAuthorDto);

    return await this.authorRepository.save(author);
  }

  async remove(id: number) {
    const author = await this.findOne(id);

    return await this.authorRepository.remove(author);
  }
}
