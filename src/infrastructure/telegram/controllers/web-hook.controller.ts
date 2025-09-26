import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Inject,
  Post,
} from '@nestjs/common';
import { IMessageBody, IMessageHeaders } from '../interfaces';
import { HandleNewSubscriberService } from '../services/handle-new-subscriber.service';
import { ConfigService } from '@nestjs/config';
import { ISendMessageInChannel } from 'src/domain/interface';

@Controller()
export class TelegramWebHookController {
  private readonly WEBHOOK_SECRET: string | null = null;
  constructor(
    private readonly handleNewSubscriberService: HandleNewSubscriberService,
    private readonly configService: ConfigService,
    @Inject(ISendMessageInChannel.name)
    private readonly chatClient: ISendMessageInChannel,
  ) {
    this.WEBHOOK_SECRET = this.configService.get('WEBHOOK_SECRET');

    if (!this.WEBHOOK_SECRET) {
      throw new Error('WEBHOOK_SECRET is not set');
    }
  }

  @Post('telegram-webhook')
  @HttpCode(200)
  handleUpdate(
    @Body() body: IMessageBody,
    @Headers() headers: IMessageHeaders,
  ) {
    console.info(`body:`, body);

    const secret = headers['x-telegram-bot-api-secret-token'];
    if (secret !== this.WEBHOOK_SECRET) {
      const message = `❌ Invalid webhook secret \n Secret: ${secret} \n `;
      console.error(message);
      this.chatClient.sendErrorMessagesInInternalChannel(message);

      return 'Invalid webhook secret';
    }

    const msg = body.message;
    if (msg?.text === '/start') {
      return this.handleNewSubscriberService.suggestAvailableChannels(
        msg.chat.id,
      );
    }

    return 'OK';
  }
}
