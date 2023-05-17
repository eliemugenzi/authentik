import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import httpResponse, { HttpResponse } from 'src/helpers/httpResponse';

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
}
