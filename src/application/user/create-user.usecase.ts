import { User } from 'src/domain/user/user.domain';
import { CreateUserCommand } from 'src/domain/user/user.dto';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/domain/user/user.repository';
import { DuplicateException } from 'src/domain/exception/exception';
import { Inject, Injectable } from '@nestjs/common';
import { ERROR_CODE } from 'src/domain/exception/error.code';
import {
  type PasswordEncoder,
  PASSWORD_ENCODER,
} from '../auth/password-encoder';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_ENCODER) private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = new User({
      email: command.email,
      password: await this.passwordEncoder.encode(command.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (await this.userRepository.existsByEmail(user.getEmail())) {
      throw new DuplicateException(
        '이미 존재하는 이메일입니다.',
        ERROR_CODE.DUPLICATE_EXCEPTION,
      );
    }

    await this.userRepository.save(user);
  }
}
