import { TokenService } from 'src/application/auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token, TokenPayload } from 'src/domain/auth/auth.domain';

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

  it('verifyAccessToken 액세스 토큰을 검증해야 한다', async () => {
    const token = await tokenService.issueTokens('user-id', 'user@mail');
    const verifiedToken = await tokenService.verifyAccessToken(
      token.getAccessToken(),
    );

    expect(verifiedToken).toBeInstanceOf(TokenPayload);
    expect(verifiedToken.getSub()).toBe('user-id');
    expect(verifiedToken.getEmail()).toBe('user@mail');
    expect(verifiedToken.isAccessToken()).toBe(true);
  });

  it('verifyAccessToken 만료된 액세스 토큰이면 예외를 던져야 한다', async () => {
    const expiredAccessToken = await jwtService.signAsync(
      { sub: 'user-id', email: 'user@mail', tokenType: 'access' },
      { expiresIn: '1ms' },
    );
    // 1ms 만료된 토큰이면 10ms 후에 검증해야 한다
    await new Promise((r) => setTimeout(r, 10));

    await expect(
      tokenService.verifyAccessToken(expiredAccessToken),
    ).rejects.toThrow();
  });

  it('verifyAccessToken 변조된 액세스 토큰이면 예외를 던져야 한다', async () => {
    const token = await tokenService.issueTokens('user-id', 'user@mail');
    const access = token.getAccessToken();
    const tampered = access.slice(0, -1) + (access.endsWith('a') ? 'b' : 'a');

    await expect(tokenService.verifyAccessToken(tampered)).rejects.toThrow();
  });

  it('verifyRefreshToken 리프레시 토큰을 검증해야 한다', async () => {
    const token = await tokenService.issueTokens('user-id', 'user@mail');
    const verifiedToken = await tokenService.verifyRefreshToken(
      token.getRefreshToken(),
    );

    expect(verifiedToken).toBeInstanceOf(TokenPayload);
    expect(verifiedToken.isRefreshToken()).toBe(true);
  });

  it('verifyRefreshToken 만료된 리프레시 토큰이면 예외를 던져야 한다', async () => {
    const expiredRefreshToken = await jwtService.signAsync(
      { sub: 'user-id', email: 'user@mail', tokenType: 'refresh' },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1ms' },
    );

    // 1ms 만료된 토큰이면 10ms 후에 검증해야 한다
    await new Promise((r) => setTimeout(r, 10));

    await expect(
      tokenService.verifyRefreshToken(expiredRefreshToken),
    ).rejects.toThrow();
  });

  it('verifyRefreshToken 변조된 리프레시 토큰이면 예외를 던져야 한다', async () => {
    const token = await tokenService.issueTokens('user-id', 'user@mail');
    const refresh = token.getRefreshToken();
    const tampered = refresh.slice(0, -1) + (refresh.endsWith('a') ? 'b' : 'a');

    await expect(tokenService.verifyRefreshToken(tampered)).rejects.toThrow();
  });
});
