import { Module, forwardRef } from '@nestjs/common';
import { UserController } from '../presentation/http/users/user.controller';
import { CreateUserUsecase } from '../application/user/create-user.usecase';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { UserPrismaRepository } from '../infrastructure/database/user.prisma';
import { USER_REPOSITORY } from '../domain/user/user.repository';
import { AuthModule } from './auth.module';
import { AuthGuard } from '../presentation/http/auth/guards/auth.guard';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
    CreateUserUsecase,
    AuthGuard,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
