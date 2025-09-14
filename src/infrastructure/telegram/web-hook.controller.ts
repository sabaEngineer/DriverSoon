import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { IMessageBody, IMessageHeaders } from './interfaces';
import { HandleNewSubscriberService } from './handleNewSubscriber.service';

@Controller()
export class TelegramWebHookController {
  constructor(
    private readonly handleNewSubscriberService: HandleNewSubscriberService,
  ) {}

  @Post('telegram-webhook')
  @HttpCode(200)
  handleUpdate(
    @Body() body: IMessageBody,
    @Headers() headers: IMessageHeaders,
  ) {
    const secret = headers['x-telegram-bot-api-secret-token'];
    console.log(`Webhook hit. secret=${secret ?? 'none'}`);
    console.debug(`body:`, body);
    console.debug(`headers:`, headers);

    const msg = body.message;
    if (msg?.text === '/start') {
      return this.handleNewSubscriberService.suggestAvailableChannels(
        msg.chat.id,
      );
    }

    return 'OK';
  }
}
