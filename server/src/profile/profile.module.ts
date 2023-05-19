import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DBService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, DBService, JwtService],
})
export class ProfileModule {}
