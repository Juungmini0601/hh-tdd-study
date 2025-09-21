import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/domain/post/post.domain';
import {
  POST_REPOSITORY,
  type PostRepository,
} from 'src/domain/post/post.repository';
import { UserId } from 'src/domain/user/user.domain';

@Injectable()
export class DeletePostUsecase {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: string, authorId: UserId): Promise<Post> {
    const post = await this.postRepository.findByIdOrElseThrow(id);
    post.validateAuthor(authorId);
    await this.postRepository.delete(id);

    return post;
  }
}
