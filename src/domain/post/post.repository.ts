import { Post, PostId } from './post.domain';

export interface PostRepository {
  findById(id: PostId): Promise<Post | null>;
  create(post: Post): Promise<Post>;
}

export const POST_REPOSITORY = 'PostRepository';
