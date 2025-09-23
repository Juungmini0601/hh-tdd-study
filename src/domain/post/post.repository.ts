import { type Post, type PostId } from './post.domain';
import { PostFindManyCommand } from './post.dto';

export interface PostRepository {
  findById(id: PostId): Promise<Post | null>;
  findByIdOrElseThrow(id: PostId): Promise<Post>;
  findMany(command: PostFindManyCommand): Promise<Post[]>;
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(id: PostId): Promise<void>;
}

export const POST_REPOSITORY = 'PostRepository';
