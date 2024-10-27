import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto, ResponseDto, CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './type';

import { JwtService } from '@nestjs/jwt';

import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // --------------- Signup --------------------------------------------

  async signup(dto: SignupDto): Promise<ResponseDto> {
    const firstUser = await this.prismaService.users.findFirst();

    if (!firstUser) {
      const hash = await this.hashData(dto.password);
      const newUser = await this.prismaService.users.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash,
          isSuperAdmin: true,
        },
      });
      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return {
        user: newUser.email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      };
    }

    const checkUser = await this.prismaService.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (checkUser)
      throw new ForbiddenException('You have an account please login');

    const hash = await this.hashData(dto.password);
    const newUser = await this.prismaService.users.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return {
      user: newUser.email,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };
  }

  // --------------- signin --------------------------------------------

  async signin(dto: SigninDto): Promise<ResponseDto> {
    const findUser = await this.prismaService.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!findUser) throw new ForbiddenException('Access Denied');

    const passWordMatches = await bcrypt.compare(dto.password, findUser.hash);
    if (!passWordMatches) throw new ForbiddenException('Incorect Password');

    const tokens = await this.getTokens(findUser.id, findUser.email);
    await this.updateRtHash(findUser.id, tokens.refresh_token);
    return {
      user: findUser.email,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };
  }

  // --------------- Reset Password --------------------------------------------

  async resetPassword(email: string) {
    // -- check user
    const user = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const generatOtp = Math.floor(1000 + Math.random() * 9000);

      const success = await this.mailService.sendPasswordResetEmail(
        email,
        generatOtp,
      );

      if (success) {
        await this.prismaService.otp.create({
          data: {
            otpCode: generatOtp,
            userId: user.id,
            expiryDate,
          },
        });
      }
    }

    return { message: 'If email exist, you will get an email' };
  }

  // --------------- Reset Password Confirmation--------------------------------------------

  async resetPasswordConfirmation(
    newPassword: string,
    otp: number,
    email: string,
  ) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    // check the validity of otp

    const valideOtp = await this.prismaService.otp.findUnique({
      where: {
        userId_otpCode: {
          userId: user.id,
          otpCode: otp,
        },
        expiryDate: {
          gte: new Date(),
        },
      },
    });

    if (!valideOtp) throw new ForbiddenException('Access Denied');

    // compare the new password
    const comparePassword = await bcrypt.compare(newPassword, user.hash);

    if (comparePassword) throw new ForbiddenException('Give new password');

    // hash new password
    const newPasswordHashed = await bcrypt.hash(newPassword, 10);

    // save to db
    const updatedUser = await this.prismaService.users.update({
      where: {
        email: user.email,
      },
      data: {
        hash: newPasswordHashed,
      },
    });

    return { message: `Password reset Successfully + ${updatedUser}` };
  }

  //---------------------------------  Logout ------------------------------

  async logout(userId: number) {
    await this.prismaService.users.updateMany({
      where: {
        id: userId,
        hashedRT: {
          not: null,
        },
      },
      data: {
        hashedRT: null,
      },
    });
  }

  // -------------------------- refresh token ------------------------------------
  async refreshTokens(userId: number, rt: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRT ?? '');
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens.access_token;
  }

  // -------------------------- create user ----------------------------------
  async createUser(userId: number, dto: SignupDto): Promise<CreateUserDto> {
    Logger.debug(typeof userId);
    Logger.debug(userId);
    const findAdmin = await this.prismaService.users.findUnique({
      where: {
        id: userId,
        isSuperAdmin: true,
      },
    });

    if (!findAdmin) throw new ForbiddenException('Access denied');

    const checkUser = await this.prismaService.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (checkUser) throw new ForbiddenException('User Exsis');

    const password = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prismaService.users.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        hash: password,
      },
    });

    return { user: newUser.email };
  }

  // -------------------------- ban user ------------------------------------

  async banUser(userID: string, adminEmail: string) {
    // check if the admin exsist
    const userIdParsed = parseInt(userID);

    const findAdmin = await this.prismaService.users.findUnique({
      where: {
        email: adminEmail,
        isSuperAdmin: true,
      },
    });

    if (!findAdmin) throw new ForbiddenException('Access Denied');

    if (userIdParsed === findAdmin.id)
      throw new ForbiddenException('You are trying to ban your self');

    const banUser = await this.prismaService.users.update({
      where: {
        id: userIdParsed,
      },
      data: {
        isBanned: true,
      },
    });

    if (!banUser) throw new ForbiddenException('No user with this id');

    return { message: `Successfully banned + ${banUser}` };
  }

  // ------------------------- hash ------------------------------------

  hashData(data: string) {
    return bcrypt.hash(data, 0);
  }

  // -------------------------- Get token ------------------------------------

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 60 * 24,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  // -------------------------- update refresh token ------------------------------------

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prismaService.users.update({
      where: {
        id: userId,
      },
      data: {
        hashedRT: hash,
      },
    });
  }

  async uploadImage(id: number, filePath: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('No user');

    const image = await this.prismaService.image.create({
      data: {
        userId: user.id,
        imageURL: filePath,
        // user: { connect: { id: user.id } },
      },
    });

    return image;
  }
}
