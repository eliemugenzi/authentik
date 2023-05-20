import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DBService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  providers: [AuthService, DBService, JwtService, RolesGuard],
  controllers: [AuthController],
  imports: [
    DbModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    NotificationsModule,
    HttpModule,
  ],
})
export class AuthModule {}
