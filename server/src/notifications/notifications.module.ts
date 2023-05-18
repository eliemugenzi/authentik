import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService],
  imports: [HttpModule],
})
export class NotificationsModule {}
