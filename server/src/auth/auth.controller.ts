import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import httpResponse, { HttpResponse } from 'src/helpers/httpResponse';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() data: SignUpDto): Promise<HttpResponse> {
    const result = await this.authService.signUp(data);

    return httpResponse({
      status: HttpStatus.CREATED,
      data: result,
      message: 'A user has been registered!',
    });
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data);

    return httpResponse({
      status: HttpStatus.OK,
      message: 'A user is successfully logged in',
      data: result,
    });
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(data);

    return httpResponse({
      status: HttpStatus.OK,
      data: result,
      message:
        'Please check the link that was sent to your email address to reset your password',
    });
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() data: ResetPasswordDto,
    @Query('token') token: string,
  ) {
    const result = await this.authService.resetPassword(data, token);

    return httpResponse({
      status: HttpStatus.OK,
      message: 'Your password was changed successfully!',
      data: result,
    });
  }
}
