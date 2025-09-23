import { Inject } from '@nestjs/common';
import {
  POST_REPOSITORY,
  type PostRepository,
} from 'src/domain/post/post.repository';
import { type Post } from 'src/domain/post/post.domain';
import { PostFindManyCommand } from 'src/domain/post/post.dto';

export class GetPostsUsecase {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: PostFindManyCommand): Promise<Post[]> {
    const posts = await this.postRepository.findMany(command);
    return posts;
  }
}
