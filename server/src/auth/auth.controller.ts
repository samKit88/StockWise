import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Get,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  SigninDto,
  ResetPsswordDto,
  ResetPsswordConfirmationDto,
  ResponseDto,
  CreateUserDto,
} from './dto';
import { Tokens } from './type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { create } from 'domain';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserId } from 'src/decorators/userId.decorator';
import { promises } from 'dns';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  getHello() {
    return 'Hello bro';
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignupDto): Promise<ResponseDto> {
    console.log(dto.email);
    return this.authService.signup(dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto): Promise<ResponseDto> {
    return this.authService.signin(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user as { sub: number };
    return this.authService.logout(user['sub']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const user = req.user as { sub: number; refreshToken: string };
    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPsswordDto) {
    return this.authService.resetPassword(resetPasswordDto.email);
  }

  @Put('/resetPassword-confirmation')
  async resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPsswordConfirmationDto,
  ) {
    return this.authService.resetPasswordConfirmation(
      resetPasswordConfirmationDto.newPassword,
      resetPasswordConfirmationDto.otp,
      resetPasswordConfirmationDto.email,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/ban/:id')
  @HttpCode(HttpStatus.OK)
  async banUser(@Param('id') userId: string, @Req() req: Request) {
    console.log(`admin + ${req.user}`);
    console.log(`ID + ${userId}`);

    const adminEmail = req.user as { email: string };
    return this.authService.banUser(userId, adminEmail['email']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-user')
  @HttpCode(HttpStatus.OK)
  createUser(
    @Req() req: Request,
    @Body() dto: SignupDto,
    @UserId() userId: number,
  ): Promise<CreateUserDto> {
    return this.authService.createUser(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('/images')
  @HttpCode(HttpStatus.OK)
  uploadImage(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return 'file is not there bro';
    }
    const user = req.user as { sub: number };
    const filePath = `uploads/${file.filename}`;
    return this.authService.uploadImage(user['sub'], filePath);
  }
}
