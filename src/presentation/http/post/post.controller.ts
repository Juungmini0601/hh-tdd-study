import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from './post.dto';
import { ApiCreatePost, ApiGetPost, ApiUpdatePost } from './post.docs';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostUsecase } from 'src/application/post/create-post.usecase';
import { PostCreateCommand, PostUpdateCommand } from 'src/domain/post/post.dto';
import { GetPostUsecase } from 'src/application/post/get-post.usecase';
import { UpdatePostUsecase } from 'src/application/post/update-post.usecase';

@ApiTags('Post API')
@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUsecase: CreatePostUsecase,
    private readonly getPostUsecase: GetPostUsecase,
    private readonly updatePostUsecase: UpdatePostUsecase,
  ) {}

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

  @Get(':id')
  @ApiGetPost()
  async getPost(@Param('id') id: string) {
    const post = await this.getPostUsecase.execute(id);
    return ApiResponseDto.success<GetPostResponse>({
      id: post.getId() as string,
      title: post.getTitle(),
      content: post.getContent(),
      authorId: post.getAuthorId(),
      createdAt: post.getCreatedAt(),
      updatedAt: post.getUpdatedAt(),
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiUpdatePost()
  async updatePost(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() request: UpdatePostRequest,
  ) {
    const authorId = req.user.getSub();
    const command: PostUpdateCommand = {
      id: id,
      title: request.title,
      content: request.content,
      authorId: authorId,
    };

    const updatedPost = await this.updatePostUsecase.execute(command);

    return ApiResponseDto.success<UpdatePostResponse>({
      id: updatedPost.getId() as string,
      title: updatedPost.getTitle(),
      content: updatedPost.getContent(),
      authorId: updatedPost.getAuthorId(),
      createdAt: updatedPost.getCreatedAt(),
      updatedAt: updatedPost.getUpdatedAt(),
    });
  }
}
