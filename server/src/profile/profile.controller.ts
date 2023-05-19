import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileService } from './profile.service';
import httpResponse from 'src/helpers/httpResponse';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  @Put('/')
  @UseGuards(AuthGuard)
  async updateProfile(@Body() data: UpdateProfileDto, @Req() req: any) {
    const updatedUser = await this.profileService.updateProfile({
      user: req.user,
      data,
    });

    return httpResponse({
      status: HttpStatus.OK,
      data: updatedUser,
      message: 'Your profile has been updated',
    });
  }
}
