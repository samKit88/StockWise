import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
