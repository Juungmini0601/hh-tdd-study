import { UpdatePostUsecase } from 'src/application/post/update-post.usecase';
import { PostUpdateCommand } from 'src/domain/post/post.dto';
import { PostRepository } from 'src/domain/post/post.repository';
import { Post } from 'src/domain/post/post.domain';
import {
  BaseException,
  NotFoundException,
} from 'src/domain/exception/exception';
import { ERROR_CODE } from 'src/domain/exception/error.code';

describe('UpdatePostUsecase', () => {
  let usecase: UpdatePostUsecase;
  let postRepositoryMock: jest.Mocked<PostRepository>;
  beforeEach(() => {
    postRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdOrElseThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    usecase = new UpdatePostUsecase(postRepositoryMock);
  });

  it('성공: 게시글을 수정한다', async () => {
    const command: PostUpdateCommand = {
      id: 'test',
      title: 'test',
      content: 'test',
      authorId: 'test',
    };

    postRepositoryMock.findByIdOrElseThrow.mockResolvedValue(
      new Post({
        ...command,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    postRepositoryMock.update.mockResolvedValue(
      new Post({
        ...command,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const result = await usecase.execute(command);

    expect(result.getTitle()).toBe(command.title);
    expect(result.getContent()).toBe(command.content);
    expect(result.getAuthorId()).toBe(command.authorId);
  });

  it('실패: 유저 ID가 다르면 게시글 수정에 실패한다.', async () => {
    const command: PostUpdateCommand = {
      id: 'test',
      title: 'test',
      content: 'test',
      authorId: 'invalid-author-id',
    };

    postRepositoryMock.findByIdOrElseThrow.mockResolvedValue(
      new Post({
        ...command,
        authorId: 'valid-author-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(usecase.execute(command)).rejects.toThrow(BaseException);
  });

  it('실패: 게시글을 찾을 수 없다', async () => {
    const command: PostUpdateCommand = {
      id: 'test',
      title: 'test',
      content: 'test',
      authorId: 'invalid-author-id',
    };

    postRepositoryMock.findByIdOrElseThrow.mockRejectedValue(
      new NotFoundException(
        '게시글을 찾을 수 없습니다.',
        ERROR_CODE.NOT_FOUND_EXCEPTION,
      ),
    );

    await expect(usecase.execute(command)).rejects.toThrow(NotFoundException);
  });
});
