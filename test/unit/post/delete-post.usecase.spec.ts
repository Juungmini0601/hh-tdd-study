import { PostRepository } from 'src/domain/post/post.repository';
import { Post } from 'src/domain/post/post.domain';
import {
  BaseException,
  NotFoundException,
} from 'src/domain/exception/exception';
import { ERROR_CODE } from 'src/domain/exception/error.code';
import { DeletePostUsecase } from 'src/application/post/delete-post.usecase';

describe('DeletePostUsecase', () => {
  let usecase: DeletePostUsecase;
  let postRepositoryMock: jest.Mocked<PostRepository>;
  beforeEach(() => {
    postRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdOrElseThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    usecase = new DeletePostUsecase(postRepositoryMock);
  });

  it('성공: 게시글을 삭제한다', async () => {
    const postId = 'postId';
    const authorId = 'authorId';
    const post = new Post({
      id: postId,
      title: 'title',
      content: 'content',
      authorId: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    postRepositoryMock.findByIdOrElseThrow.mockResolvedValue(post);

    const result = await usecase.execute(postId, authorId);

    expect(result.getTitle()).toBe(post.getTitle());
    expect(result.getContent()).toBe(post.getContent());
    expect(result.getAuthorId()).toBe(post.getAuthorId());
  });

  it('실패: 유저 ID가 다르면 게시글 삭제에 실패한다.', async () => {
    const postId = 'postId';
    const authorId = 'authorId';
    const invalidAuthorId = 'invalidAuthorId';

    postRepositoryMock.findByIdOrElseThrow.mockResolvedValue(
      new Post({
        authorId: invalidAuthorId,
        title: 'title',
        content: 'content',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(usecase.execute(postId, authorId)).rejects.toThrow(
      BaseException,
    );
  });

  it('실패: 게시글을 찾을 수 없다', async () => {
    const postId = 'postId';
    const authorId = 'authorId';

    postRepositoryMock.findByIdOrElseThrow.mockRejectedValue(
      new NotFoundException(
        '게시글을 찾을 수 없습니다.',
        ERROR_CODE.NOT_FOUND_EXCEPTION,
      ),
    );

    await expect(usecase.execute(postId, authorId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
