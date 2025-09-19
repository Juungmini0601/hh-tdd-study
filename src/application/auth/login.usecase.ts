import { Inject, Injectable } from '@nestjs/common';
import { PASSWORD_ENCODER, type PasswordEncoder } from './password-encoder';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/domain/user/user.repository';
import { PasswordMismatchException } from 'src/domain/exception/exception';
import { ERROR_CODE } from 'src/domain/exception/error.code';
import { LoginCommand } from 'src/domain/auth/auth.dto';
import { Token, TOKEN_TYPE } from 'src/domain/auth/auth.domain';
import { TokenService } from './token.service';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(PASSWORD_ENCODER) private readonly passwordEncoder: PasswordEncoder,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginCommand): Promise<Token> {
    const user = await this.userRepository.findByEmailOrElseThrow(
      command.email,
    );

    await this.validatePassword(command.password, user.getPassword());

    return this.tokenService.issueTokens(
      user.getId() as string, // DB에서 유저 조회 시 id가 항상 존재함
      user.getEmail(),
    );
  }

  private async validatePassword(
    rawPassword: string,
    encodedPassword: string,
  ): Promise<void> {
    if (!(await this.passwordEncoder.matches(rawPassword, encodedPassword))) {
      throw new PasswordMismatchException(
        '비밀번호가 일치하지 않습니다.',
        ERROR_CODE.PASSWORD_MISMATCH_EXCEPTION,
      );
    }
  }
}
