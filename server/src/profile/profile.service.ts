import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

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
}
