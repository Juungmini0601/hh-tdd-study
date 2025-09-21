import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post, type PostId } from 'src/domain/post/post.domain';
import { type PostRepository } from 'src/domain/post/post.repository';

@Injectable()
export class PostPrismaRepository implements PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: PostId): Promise<Post | null> {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    if (!post) {
      return null;
    }

    return new Post({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  }

  async create(post: Post): Promise<Post> {
    const created = await this.prismaService.post.create({
      data: {
        title: post.getTitle(),
        content: post.getContent(),
        authorId: post.getAuthorId(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
      },
    });

    return new Post({
      id: created.id,
      title: created.title,
      content: created.content,
      authorId: created.authorId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }
}
