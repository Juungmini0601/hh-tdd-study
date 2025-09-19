import { User } from 'src/domain/user.domain';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/domain/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

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
}
