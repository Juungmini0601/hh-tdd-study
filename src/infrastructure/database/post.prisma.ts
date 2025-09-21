import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post, type PostId } from 'src/domain/post/post.domain';
import { type PostRepository } from 'src/domain/post/post.repository';
import { NotFoundException } from 'src/domain/exception/exception';
import { ERROR_CODE } from 'src/domain/exception/error.code';

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

  async findByIdOrElseThrow(id: PostId): Promise<Post> {
    const post = await this.findById(id);

    if (!post) {
      throw new NotFoundException(
        '게시글을 찾을 수 없습니다.',
        ERROR_CODE.NOT_FOUND_EXCEPTION,
      );
    }

    return post;
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

  async update(post: Post): Promise<Post> {
    const updated = await this.prismaService.post.update({
      where: { id: post.getId() },
      data: { title: post.getTitle(), content: post.getContent() },
    });

    return new Post({
      id: updated.id,
      title: updated.title,
      content: updated.content,
      authorId: updated.authorId,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }
}
