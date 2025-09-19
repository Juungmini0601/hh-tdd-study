import { TokenService } from 'src/application/auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token } from 'src/domain/auth/auth.domain';

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(() => {
    // 테스트용 비밀값/만료 주입
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    process.env.JWT_REFRESH_EXPIRES = '7d';

    jwtService = new JwtService({
      secret: 'test-access-secret',
      signOptions: { expiresIn: '15m' },
    });
    
    configService = new ConfigService();
    tokenService = new TokenService(jwtService, configService);
  });

  afterEach(() => {
    delete process.env.JWT_REFRESH_SECRET;
    delete process.env.JWT_REFRESH_EXPIRES;
  });

  it('issueTokens: 액세스/리프레시 토큰을 모두 발급해야 한다', async () => {
    const token = await tokenService.issueTokens('user-id', 'user@mail');

    expect(token).toBeInstanceOf(Token);
    expect(token.getAccessToken()).not.toBeNull();
    expect(token.getRefreshToken()).not.toBeNull();
  });
});
