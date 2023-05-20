import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileService } from './profile.service';
import httpResponse from 'src/helpers/httpResponse';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from 'src/auth/auth.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('/')
  @UseGuards(AuthGuard)
  async getMyProfile(@Req() req: any) {
    const { user } = req;
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

  @Get('/list')
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  async getUsers(@Req() req: any) {
    const { user } = req;

    console.log('USER', user);

    const users = await this.profileService.getUsers({
      currentUser: user,
    });

    return httpResponse({
      status: HttpStatus.OK,
      data: users,
    });
  }

  @Put('/list/:id/verify')
  @UseGuards(AuthGuard)
  async verifyUser(@Req() req: any, @Param('id') userId: string) {
    const { user } = req;
    const verifiedUser = await this.profileService.verifyUser({
      userId,
      currentUser: user,
    });

    return httpResponse({
      status: HttpStatus.OK,
      data: verifiedUser,
    });
  }
}
