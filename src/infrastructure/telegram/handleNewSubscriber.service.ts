import { Injectable } from '@nestjs/common';
import { ExamCenterChannels } from './enums';

@Injectable()
export class HandleNewSubscriberService {
  private readonly COLUMNS = 2;

  private buildKeyboard() {
    const buttons = ExamCenterChannels.map((channel) => ({
      text: `${channel.examCenterName}`,
      url: channel.joinUrl,
    }));

    const rows = [];
    for (let i = 0; i < buttons.length; i += this.COLUMNS) {
      rows.push(buttons.slice(i, i + this.COLUMNS));
    }

    return { inline_keyboard: rows };
  }

  public suggestAvailableChannels(chatId: number) {
    return {
      method: 'sendMessage',
      text: 'აირჩიე ქალაქის არხ(ებ)ი და ჩაერთე ↓',
      chat_id: chatId,
      reply_markup: this.buildKeyboard(),
      disable_web_page_preview: true,
    };
  }
}
