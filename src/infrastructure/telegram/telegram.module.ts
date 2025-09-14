import { Module } from '@nestjs/common';
import { TelegramWebHookController } from './web-hook.controller';
import { HandleNewSubscriberService } from './handleNewSubscriber.service';

@Module({
  imports: [],
  controllers: [TelegramWebHookController],
  providers: [HandleNewSubscriberService],
})
export class TelegramModule {}
