import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserStatus } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly db: DBService) {}

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
}
