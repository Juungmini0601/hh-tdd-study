import { Module } from '@nestjs/common';
import { UserController } from '../presentation/http/users/user.controller';
import { CreateUserUsecase } from '../application/user/create-user.usecase';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { UserPrismaRepository } from '../infrastructure/database/user.prisma';
import { USER_REPOSITORY } from '../domain/user.repository';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
    CreateUserUsecase,
  ],
})
export class UserModule {}
