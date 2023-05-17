import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DBService } from './db/db.service';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [AppController],
  providers: [AppService, DBService],
})
export class AppModule {}
