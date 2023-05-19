import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest<Request>();

      if (!req.headers.authorization) {
        return false;
      }

      const [jwtType, jwtToken] = req.headers.authorization.split(' ');

      if (jwtType !== 'JWT' || !jwtToken) {
        return false;
      }

      const user = await this.jwt.verifyAsync(jwtToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      console.log('DECODED', user);

      // if (req.headers.role && user.role !== req.headers.role) {
      //   return false;
      // }

      req['user'] = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
