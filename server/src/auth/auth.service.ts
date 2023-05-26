import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { SignUpDto } from './dto/signup.dto';
import { comparePassword, hashPassword } from 'src/helpers/password';
import { CodeStatus, UserStatus } from '@prisma/client';
import { omit } from 'lodash';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { randomOTP } from 'src/helpers/randomOTP';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DBService,
    private readonly jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async signUp(body: SignUpDto) {
    const foundUser = await this.db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (foundUser) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = hashPassword(body.password);

    const userData = {
      ...body,
      password: hashedPassword,
      status: UserStatus.UNVERIFIED,
      birth_date: new Date(body.birth_date),
    };

    const newUser = await this.db.user.create({
      data: userData,
    });

    return omit(newUser, ['password']);
  }

  async login(body: LoginDto) {
    const foundUser = await this.db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!comparePassword(body.password, foundUser.password)) {
      throw new BadRequestException('Invalid Credentials');
    }

    await this.db.oTPCode.deleteMany({
      where: {
        user_id: foundUser.id,
      },
    });

    const createdCode = await this.db.oTPCode.create({
      data: {
        code: String(randomOTP()),
        user_id: foundUser.id,
        status: CodeStatus.ACTIVE,
      },
    });

    this.eventEmitter.emit('send-mail', {
      email: foundUser.email,
      subject: 'Two-Factor Authentication',
      message: `Dear ${foundUser.first_name}, kindly verify your login using the following OTP: ${createdCode.code}`,
    });

    return {
      ...omit(foundUser, ['password']),
    };
  }

  async forgotPassword(body: ForgotPasswordDto) {
    const foundUser = await this.db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }
    const authToken = await this.jwtService.signAsync(
      { ...body, id: foundUser.id },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '3h',
      },
    );

    const emailContent = `
    Dear ${foundUser.first_name} ${foundUser.last_name}, here is the link you can use to set your new password: \n
    ${process.env.FRONTEND_URL}/reset-password?token=${authToken}
    `;

    this.eventEmitter.emit('send-mail', {
      email: body.email,
      subject: 'Reset your password',
      message: emailContent,
    });
    return body;
  }

  async resetPassword(data: ResetPasswordDto, token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const hashedPassword = hashPassword(data.new_password);
      const user = await this.db.user.update({
        where: {
          id: decoded.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Unable to reset your password');
    }
  }

  async verifyOtp(code: string) {
    const foundOtp = await this.db.oTPCode.findFirst({
      where: {
        code: String(code),
        status: CodeStatus.ACTIVE,
      },
      include: {
        user: true,
      },
    });

    if (!foundOtp) {
      throw new NotFoundException('Invalid OTP');
    }

    await this.db.oTPCode.update({
      data: {
        status: CodeStatus.EXPIRED,
      },
      where: {
        user_id: foundOtp.user_id,
      },
    });

    const jwtPayload = {
      id: foundOtp.user.id,
      first_name: foundOtp.user.first_name,
      last_name: foundOtp.user.last_name,
      email: foundOtp.user.email,
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '7d',
    });

    return {
      ...omit(foundOtp.user, ['password']),
      access_token: jwtToken,
    };
  }
}
