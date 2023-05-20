import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwt: JwtService) {}
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

      req['user'] = user;

      const roles = this.reflector.get<UserRole[]>(
        'roles',
        context.getHandler(),
      );

      console.log('ROLES', roles);

      if (!roles) {
        return true;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
