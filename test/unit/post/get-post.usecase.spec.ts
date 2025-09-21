import { GetPostUsecase } from 'src/application/post/get-post.usecase';
import { Post } from 'src/domain/post/post.domain';
import { type PostRepository } from 'src/domain/post/post.repository';
import { NotFoundException } from 'src/domain/exception/exception';
import { ERROR_CODE } from 'src/domain/exception/error.code';

describe('GetPostUsecase', () => {
  let usecase: GetPostUsecase;
  let postRepositoryMock: jest.Mocked<PostRepository>;
  beforeEach(() => {
    postRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdOrElseThrow: jest.fn(),
    };

    usecase = new GetPostUsecase(postRepositoryMock);
  });

  it('성공: 게시글을 조회한다', async () => {
    const post = new Post({
      id: 'test',
      title: 'test',
      content: 'test',
      authorId: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    postRepositoryMock.findByIdOrElseThrow.mockResolvedValue(post);

    const result = await usecase.execute('test');

    expect(result.getId()).toBe(post.getId());
    expect(result.getTitle()).toBe(post.getTitle());
    expect(result.getContent()).toBe(post.getContent());
    expect(result.getAuthorId()).toBe(post.getAuthorId());
  });

  it('실패: 게시글을 조회할 수 없다', async () => {
    postRepositoryMock.findByIdOrElseThrow.mockRejectedValue(
      new NotFoundException('게시글을 찾을 수 없습니다.', ERROR_CODE.NOT_FOUND_EXCEPTION),
    );

    await expect(usecase.execute('test')).rejects.toThrow(NotFoundException);
  });
});
