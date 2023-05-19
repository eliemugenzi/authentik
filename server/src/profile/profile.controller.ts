import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileService } from './profile.service';
import httpResponse from 'src/helpers/httpResponse';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('/')
  @UseGuards(AuthGuard)
  async getMyProfile(@Req() req: any) {
    const { user } = req;

    console.log('HHH', user);

    const currentUser = await this.profileService.getMyProfile(user);

    return httpResponse({
      status: HttpStatus.OK,
      data: currentUser,
    });
  }
}
