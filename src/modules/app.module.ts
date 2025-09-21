import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { PostModule } from './post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env'],
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
