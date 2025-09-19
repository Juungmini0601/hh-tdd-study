import { LoginUsecase } from '../../../src/application/auth/login.usecase';
import { PasswordEncoder } from '../../../src/application/auth/password-encoder';
import { TokenService } from '../../../src/application/auth/token.service';
import { UserRepository } from '../../../src/domain/user/user.repository';
import { User } from '../../../src/domain/user/user.domain';
import { Token } from '../../../src/domain/auth/auth.domain';
import { PasswordMismatchException } from '../../../src/domain/exception/exception';
import { ERROR_CODE } from '../../../src/domain/exception/error.code';

describe('LoginUsecase', () => {
  let usecase: LoginUsecase;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let passwordEncoderMock: jest.Mocked<PasswordEncoder>;
  let tokenServiceMock: jest.Mocked<TokenService>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      existsByEmail: jest.fn(),
      findByEmail: jest.fn(),
      findByEmailOrElseThrow: jest.fn(),
    };

    passwordEncoderMock = {
      encode: jest.fn(),
      matches: jest.fn(),
    };

    tokenServiceMock = {
      signAccessToken: jest.fn(),
      signRefreshToken: jest.fn(),
      issueTokens: jest.fn(),
    } as unknown as jest.Mocked<TokenService>;

    usecase = new LoginUsecase(
      passwordEncoderMock,
      userRepositoryMock,
      tokenServiceMock,
    );
  });

  it('성공: 비밀번호가 일치하면 토큰을 발급한다', async () => {
    const user = new User({
      id: 'user-id',
      email: 'user@mail',
      password: 'encoded',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    userRepositoryMock.findByEmailOrElseThrow.mockResolvedValue(user);
    passwordEncoderMock.matches.mockResolvedValue(true);
    tokenServiceMock.issueTokens.mockResolvedValue(
      new Token({ accessToken: 'access', refreshToken: 'refresh' }),
    );

    const result = await usecase.execute({
      email: user.getEmail(),
      password: user.getPassword(),
    });

    expect(result).toBeInstanceOf(Token);
    expect(result.getAccessToken()).toBe('access');
    expect(result.getRefreshToken()).toBe('refresh');
  });

  it('실패: 비밀번호가 불일치하면 PasswordMismatchException을 던진다', async () => {
    const user = new User({
      id: 'user-id',
      email: 'user@mail',
      password: 'encoded',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    userRepositoryMock.findByEmailOrElseThrow.mockResolvedValue(user);
    passwordEncoderMock.matches.mockResolvedValue(false);

    await expect(
      usecase.execute({ email: 'user@mail', password: 'wrong' }),
    ).rejects.toThrow(PasswordMismatchException);

    await usecase
      .execute({ email: 'user@mail', password: 'wrong' })
      .catch((err) => {
        expect(err).toBeInstanceOf(PasswordMismatchException);
        expect(err.errorCode).toBe(ERROR_CODE.PASSWORD_MISMATCH_EXCEPTION);
      });
  });
});
