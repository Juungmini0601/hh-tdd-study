import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token, TOKEN_TYPE, TokenPayload } from 'src/domain/auth/auth.domain';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signAccessToken(userId: string, email: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
      email,
      tokenType: TOKEN_TYPE.ACCESS,
    });
  }

  async signRefreshToken(userId: string, email: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        email,
        tokenType: TOKEN_TYPE.REFRESH,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES', '7d'),
      },
    );
  }

  async issueTokens(userId: string, email: string): Promise<Token> {
    const accessToken = await this.signAccessToken(userId, email);
    const refreshToken = await this.signRefreshToken(userId, email);
    return new Token({ accessToken, refreshToken });
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    const payload = await this.jwtService.verifyAsync(token);
    const tokenPayload = new TokenPayload(payload);

    if (!tokenPayload.isAccessToken()) {
      throw new UnauthorizedException('Invalid token type');
    }

    return tokenPayload;
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    const tokenPayload = new TokenPayload(payload);

    if (!tokenPayload.isRefreshToken()) {
      throw new UnauthorizedException('Invalid token type');
    }

    return tokenPayload;
  }
}
