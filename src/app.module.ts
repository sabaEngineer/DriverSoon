import { Module } from '@nestjs/common';
import { TelegramModule } from './infrastructure/telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { GovModule } from './infrastructure/gov/gov.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './infrastructure/cron';
import { CacheModule } from './infrastructure/cache';

@Module({
  imports: [
    TelegramModule,
    GovModule,
    CacheModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [TasksService],
  exports: [TelegramModule],
})
export class AppModule {}
