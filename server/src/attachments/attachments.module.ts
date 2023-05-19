import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';

@Module({
  providers: [AttachmentsService],
  controllers: [AttachmentsController],
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class AttachmentsModule {}
