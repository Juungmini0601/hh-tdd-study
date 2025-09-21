import { Module, forwardRef } from '@nestjs/common';
import { BcryptEncoder } from '../application/auth/bcrypt-encoder';
import { PASSWORD_ENCODER } from 'src/application/auth/password-encoder';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '../application/auth/token.service';
import { AuthController } from '../presentation/http/auth/auth.controller';
import { LoginUsecase } from '../application/auth/login.usecase';

@Module({
  imports: [
    forwardRef(() => UserModule), // TODO 순환 참조 에러 해결 방법 공부
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_EXPIRES', '15m'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: PASSWORD_ENCODER, useClass: BcryptEncoder },
    TokenService,
    LoginUsecase,
  ],
  exports: [PASSWORD_ENCODER, TokenService],
})
export class AuthModule {}
