import {
  Body,
  Controller,
  Post as HttpPost,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { CreatePostRequest, CreatePostResponse } from './post.dto';
import { ApiCreatePost } from './post.docs';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostUsecase } from 'src/application/post/create-post.usecase';
import { PostCreateCommand } from 'src/domain/post/post.dto';

@ApiTags('Post API')
@Controller('posts')
export class PostController {
  constructor(private readonly createPostUsecase: CreatePostUsecase) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatePost()
  async createPost(@Req() req: Request, @Body() request: CreatePostRequest) {
    const command: PostCreateCommand = {
      title: request.title,
      content: request.content,
      authorId: req.user.getSub(),
    };

    const createdPost = await this.createPostUsecase.execute(command);

    return ApiResponseDto.success<CreatePostResponse>({
      title: createdPost.getTitle(),
      content: createdPost.getContent(),
      authorId: createdPost.getAuthorId(),
    });
  }
}
