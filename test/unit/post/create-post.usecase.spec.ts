import { CreatePostUsecase } from 'src/application/post/create-post.usecase';
import { Post } from 'src/domain/post/post.domain';
import { PostCreateCommand } from 'src/domain/post/post.dto';
import { type PostRepository } from 'src/domain/post/post.repository';

describe('CreatePostUsecase', () => {
  let usecase: CreatePostUsecase;
  let postRepositoryMock: jest.Mocked<PostRepository>;
  beforeEach(() => {
    postRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdOrElseThrow: jest.fn(),
    };

    usecase = new CreatePostUsecase(postRepositoryMock);
  });

  it('성공: 게시글을 생성한다', async () => {
    const command: PostCreateCommand = {
      title: 'test',
      content: 'test',
      authorId: 'test',
    };

    postRepositoryMock.create.mockResolvedValue(
      new Post({
        title: command.title,
        content: command.content,
        authorId: command.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const result = await usecase.execute(command);

    expect(result.getTitle()).toBe(command.title);
    expect(result.getContent()).toBe(command.content);
    expect(result.getAuthorId()).toBe(command.authorId);
  });
});
