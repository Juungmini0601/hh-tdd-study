import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../../../src/modules/app.module';
import { PrismaService } from '../../../src/infrastructure/database/prisma.service';

// NestJS에서 제공하는 테스트 모듈에 대한 학습 필요
describe('UserController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

    await app.init();
    // TODO 데이터베이스 스키마 생성 관련 코드 만들기
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await app.close();
  });

  it('GET /users/hello ', () => {
    return request(app.getHttpServer())
      .get('/users/hello')
      .expect(200)
      .expect('hello');
  });

  it('POST /users ', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({ email: 'test@example.com', password: 'Password123' })
      .expect(201);
  });
});
