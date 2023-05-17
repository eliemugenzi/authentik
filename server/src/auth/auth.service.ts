import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { SignUpDto } from './dto/signup.dto';
import { comparePassword, hashPassword } from 'src/helpers/password';
import { UserStatus } from '@prisma/client';
import { omit } from 'lodash';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DBService,
    private readonly jwtService: JwtService,
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
      status: UserStatus.PENDING,
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

    const jwtPayload = {
      id: foundUser.id,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      email: foundUser.email,
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '7d',
    });

    return {
      ...omit(foundUser, ['password']),
      access_token: jwtToken,
    };
  }
}
