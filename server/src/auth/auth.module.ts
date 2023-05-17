import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DBService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [AuthService, DBService, JwtService],
  controllers: [AuthController],
  imports: [
    DbModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
})
export class AuthModule {}
