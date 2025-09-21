import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/application/auth/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    try {
      const tokenPayload = await this.tokenService.verifyAccessToken(token);
      request.user = tokenPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authorization =
      request.headers['authorization'] ??
      (request.headers['Authorization'] as string | undefined);

    if (!authorization) return null;

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) return null;

    return token;
  }
}
