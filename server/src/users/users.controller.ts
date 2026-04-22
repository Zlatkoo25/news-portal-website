import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import type { AuthenticatedRequest } from '../auth/dto/payload.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  findProfile(@Req() req: AuthenticatedRequest) {
    console.log('GET userId:', req.user.userId);
    return this.usersService.findById(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('PATCH userId:', req.user.userId);
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
