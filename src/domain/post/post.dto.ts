import { UserId } from '../user/user.domain';
import { PostId } from './post.domain';

export class PostCreateCommand {
  title: string;
  content: string;
  authorId: UserId;
}

export class PostUpdateCommand {
  id: PostId;
  title: string;
  content: string;
  authorId: UserId;
}

export class PostFindManyCommand {
  cursor?: string;
  limit?: number;
}
