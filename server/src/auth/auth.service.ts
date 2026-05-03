import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './dto/payload.dto';
import { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async generateTokens(payload: JwtPayload) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
        ) as unknown as StringValue,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user?.username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const tokens = await this.generateTokens(payload);

    await this.usersService.updateRefreshToken(
      user.id,
      await bcrypt.hash(tokens.refresh_token, 10),
    );

    return {
      ...tokens,
      user: { id: user.id, username: user.username },
    };
  }

  async refresh(userId: number, incomingRefreshToken: string) {
    const user = await this.usersService.findByIdWithRefreshToken(userId);

    if (!user?.refresh_token) {
      throw new ForbiddenException('Access denied');
    }

    const tokenMatches = await bcrypt.compare(
      incomingRefreshToken,
      user.refresh_token,
    );

    if (!tokenMatches) {
      throw new ForbiddenException('Access denied');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const tokens = await this.generateTokens(payload);

    await this.usersService.updateRefreshToken(
      user.id,
      await bcrypt.hash(tokens.refresh_token, 10),
    );

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }
}
