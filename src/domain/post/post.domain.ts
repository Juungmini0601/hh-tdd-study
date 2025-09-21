import { UserId } from '../user/user.domain';

export type PostId = string;

export class Post {
  private id?: PostId;
  private title: string;
  private content: string;
  private createdAt: Date;
  private updatedAt: Date;

  private authorId: UserId;

  constructor(props: {
    id?: PostId;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: UserId;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.authorId = props.authorId;
  }

  getId(): PostId | undefined {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getAuthorId(): UserId {
    return this.authorId;
  }
}
