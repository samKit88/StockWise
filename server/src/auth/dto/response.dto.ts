import { IsEmail, IsString } from 'class-validator';

export class ResponseDto {
  @IsString()
  user: string;
  @IsString()
  accessToken: string;
  @IsString()
  refreshToken: string;
}

export class CreateUserDto {
  @IsString()
  user: string;
}
