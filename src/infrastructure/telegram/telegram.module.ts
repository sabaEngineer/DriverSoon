import { Module } from '@nestjs/common';
import { TelegramWebHookController } from './controllers/web-hook.controller';
import { HandleNewSubscriberService } from './services/handle-new-subscriber.service';
import { TelegramChannelNotifierService } from './services';
import { ISendMessageInChannel } from 'src/domain/interface';

@Module({
  imports: [],
  controllers: [TelegramWebHookController],
  providers: [
    HandleNewSubscriberService,
    {
      provide: ISendMessageInChannel.name,
      useClass: TelegramChannelNotifierService,
    },
  ],
  exports: [
    {
      provide: ISendMessageInChannel.name,
      useClass: TelegramChannelNotifierService,
    },
  ],
})
export class TelegramModule {}
