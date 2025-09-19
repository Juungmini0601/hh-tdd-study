import { CreateUserUsecase } from '../../../src/application/user/create-user.usecase';
import { UserRepository } from '../../../src/domain/user.repository';
import { User } from '../../../src/domain/user.domain';
import { DuplicateException } from '../../../src/domain/exception/exception';
import { PasswordEncoder } from '../../../src/application/auth/password-encoder';

describe('CreateUserUsecase', () => {
  let usecase: CreateUserUsecase;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let passwordEncoderMock: jest.Mocked<PasswordEncoder>;
  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      existsByEmail: jest.fn(),
    };

    passwordEncoderMock = {
      encode: jest.fn(),
      matches: jest.fn(),
    };

    usecase = new CreateUserUsecase(userRepositoryMock, passwordEncoderMock);
  });

  it('성공: 신규 이메일이면 사용자를 생성한다', async () => {
    const email = 'test@example.com';
    const password = 'test1234';

    userRepositoryMock.existsByEmail.mockResolvedValue(false);
    passwordEncoderMock.encode.mockResolvedValue(password);
    userRepositoryMock.save.mockResolvedValue(
      new User({
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    passwordEncoderMock.matches.mockResolvedValue(true);

    await expect(usecase.execute({ email, password })).resolves.toBeUndefined();
  });

  it('실패: 중복 이메일이면 DuplicateException을 던진다', async () => {
    const email = 'dup@example.com';
    const password = 'test1234';

    passwordEncoderMock.matches.mockResolvedValue(false);

    userRepositoryMock.existsByEmail.mockResolvedValue(true);

    await expect(usecase.execute({ email, password })).rejects.toThrow(
      DuplicateException,
    );
  });
});
