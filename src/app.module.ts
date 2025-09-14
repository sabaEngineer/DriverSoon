import { Module } from '@nestjs/common';
import { TelegramModule } from './infrastructure/telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
