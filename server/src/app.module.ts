import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DBService } from './db/db.service';
import { NotificationsModule } from './notifications/notifications.module';
import { EventsService } from './events/events.service';
import { ProfileModule } from './profile/profile.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    DbModule,
    NotificationsModule,
    HttpModule,
    EventEmitterModule.forRoot(),
    ProfileModule,
    AttachmentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DBService, EventsService],
  exports: [HttpModule],
})
export class AppModule {}
