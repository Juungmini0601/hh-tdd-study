import { Inject, Injectable } from '@nestjs/common';
import {
  POST_REPOSITORY,
  type PostRepository,
} from 'src/domain/post/post.repository';
import { PostUpdateCommand } from 'src/domain/post/post.dto';
import { Post } from 'src/domain/post/post.domain';

@Injectable()
export class UpdatePostUsecase {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: PostUpdateCommand): Promise<Post> {
    const { title, content, authorId } = command;
    const post = await this.postRepository.findByIdOrElseThrow(command.id);

    post.validateAuthor(authorId);
    post.update({ title, content });

    const updatedPost = await this.postRepository.update(post);
    
    return updatedPost;
  }
}
