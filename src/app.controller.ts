import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Post('telegram-webhook')
  @HttpCode(200) // respond fast with 200
  handleUpdate(@Body() body: any, @Headers() headers: Record<string, string>) {
    const secret = headers['x-telegram-bot-api-secret-token'];
    console.log(`Webhook hit. secret=${secret ?? 'none'}`);
    console.debug(`body:`, body);
    console.debug(`headers:`, headers);
    return 'OK';
  }
}
