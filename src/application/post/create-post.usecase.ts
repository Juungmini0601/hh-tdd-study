import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/domain/post/post.domain';
import {
  POST_REPOSITORY,
  type PostRepository,
} from 'src/domain/post/post.repository';
import { PostCreateCommand as CreatePostCommand } from 'src/domain/post/post.dto';

@Injectable()
export class CreatePostUsecase {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    const post = new Post({
      title: command.title,
      content: command.content,
      authorId: command.authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdPost = await this.postRepository.create(post);
    return createdPost;
  }
}
