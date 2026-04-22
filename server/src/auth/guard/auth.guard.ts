import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest, JwtPayload } from '../dto/payload.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;

    console.log('\n=== AUTH GUARD ===');
    console.log('Method:', request.method);
    console.log('URL:', request.url);
    console.log('Auth header:', authorization);

    const token = authorization?.split(' ')[1];

    if (!token) {
      console.log('NO TOKEN FOUND');
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token);

      console.log('JWT payload:', tokenPayload);

      request.user = {
        userId: Number(tokenPayload.sub),
        username: tokenPayload.username,
      };

      console.log('Mapped user:', request.user);

      return true;
    } catch (err) {
      console.log('JWT ERROR:', err);
      throw new UnauthorizedException();
    }
  }
}
