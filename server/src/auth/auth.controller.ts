import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import httpResponse, { HttpResponse } from 'src/helpers/httpResponse';
import { LoginDto } from './dto/login.dto';

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
}
