import { User } from 'src/domain/user/user.domain';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/domain/user/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ERROR_CODE } from 'src/domain/exception/error.code';
import { NotFoundException } from 'src/domain/exception/exception';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: {
        email: user.getEmail(),
        password: user.getPassword(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });

    return new User({
      id: createdUser.id,
      email: createdUser.email,
      password: createdUser.password,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user !== null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user ? new User(user) : null;
  }

  async findByEmailOrElseThrow(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        '존재하지 않는 이메일입니다.',
        ERROR_CODE.NOT_FOUND_EXCEPTION,
      );
    }

    return user;
  }
}
