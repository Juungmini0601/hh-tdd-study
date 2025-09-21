import { Inject } from '@nestjs/common';
import {
  POST_REPOSITORY,
  type PostRepository,
} from 'src/domain/post/post.repository';
import { type Post } from 'src/domain/post/post.domain';

export class GetPostUsecase {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: string): Promise<Post> {
    return this.postRepository.findByIdOrElseThrow(id);
  }
}
