import { Module, forwardRef } from '@nestjs/common';
import { PostController } from '../presentation/http/post/post.controller';
import { CreatePostUsecase } from '../application/post/create-post.usecase';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { POST_REPOSITORY } from '../domain/post/post.repository';
import { PostPrismaRepository } from '../infrastructure/database/post.prisma';
import { AuthModule } from './auth.module';
import { AuthGuard } from '../presentation/http/auth/guards/auth.guard';
import { GetPostUsecase } from '../application/post/get-post.usecase';
import { UpdatePostUsecase } from '../application/post/update-post.usecase';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [PostController],
  providers: [
    PrismaService,
    { provide: POST_REPOSITORY, useClass: PostPrismaRepository },
    CreatePostUsecase,
    GetPostUsecase,
    UpdatePostUsecase,
    AuthGuard,
  ],
  exports: [POST_REPOSITORY],
})
export class PostModule {}
