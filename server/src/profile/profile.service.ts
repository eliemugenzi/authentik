import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserRole, UserStatus } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { emit } from 'process';

@Injectable()
export class ProfileService {
  constructor(
    private readonly db: DBService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getMyProfile(user: any) {
    const currentUser = await this.db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!currentUser) {
      throw new NotFoundException('Profile not found!');
    }

    return currentUser;
  }

  async updateProfile({ user, data }: { user: any; data: UpdateProfileDto }) {
    const currentUser = await this.db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!currentUser) {
      throw new NotFoundException('Profile not found!');
    }
    const updatedUser = await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...data,
        status:
          currentUser.status === UserStatus.UNVERIFIED
            ? UserStatus.PENDING
            : currentUser.status,
      },
    });

    return updatedUser;
  }

  async getUsers({ currentUser }) {
    const foundUser = await this.db.user.findFirst({
      where: {
        id: currentUser.id,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (foundUser.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Unauthorized access');
    }
    const users = await this.db.user.findMany({
      where: {
        NOT: {
          id: currentUser.id,
        },
      },
    });

    return users;
  }

  async verifyUser({
    currentUser,
    userId,
  }: {
    currentUser: Record<string, any>;
    userId: string;
  }) {
    const foundUser = await this.db.user.findFirst({
      where: {
        id: currentUser.id,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (foundUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Forbidden access');
    }

    const userToVerify = await this.db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userToVerify) {
      throw new NotFoundException('A user you want to verify does not exist!');
    }

    if (userToVerify.id === foundUser.id) {
      throw new ForbiddenException('Forbidden Access');
    }

    if (userToVerify.status === UserStatus.VERIFIED) {
      throw new ConflictException('A user is already verified');
    }

    const verifiedUser = await this.db.user.update({
      where: {
        id: userToVerify.id,
      },
      data: {
        status: UserStatus.VERIFIED,
      },
    });

    const emailMessage = `
    Dear ${verifiedUser.first_name} ${verifiedUser.last_name}, your account has been marked as verified. Congrats!
    `;

    this.eventEmitter.emit('send-mail', {
      email: verifiedUser.email,
      subject: 'Your account has been verified!',
      message: emailMessage,
    });

    return verifiedUser;
  }
}
