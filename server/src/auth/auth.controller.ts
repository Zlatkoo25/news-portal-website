import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { RefreshGuard } from './guard/refresh.guard';
import type { AuthenticatedRequest } from './dto/payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(
    @Req() req: Request & { user: { userId: number }; refreshToken: string },
  ) {
    return this.authService.refresh(req.user.userId, req['refreshToken']);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.userId);
  }
}
