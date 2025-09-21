import { UserId } from '../user/user.domain';

export class PostCreateCommand {
  title: string;
  content: string;
  authorId: UserId;
}
