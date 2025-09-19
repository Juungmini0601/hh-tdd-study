import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { GlobalExceptionHandler } from './presentation/http/common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 8080;
  // add ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  // add Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionHandler());
  // Configure Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('항해 백엔드 10기 TDD 스터디 API')
    .setDescription('항해 백엔드 10기 TDD 스터디 API Description')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
bootstrap();
