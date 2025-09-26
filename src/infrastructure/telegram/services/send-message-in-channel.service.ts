import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExamCenterNames } from 'src/domain/enum';
import { ISendMessageInChannel } from 'src/domain/interface';
import { ExamCenterChannels } from '../enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramChannelNotifierService implements ISendMessageInChannel {
  private readonly botToken: string | null = null;
  private readonly baseUrl: string | null = null;

  constructor(private readonly configService: ConfigService) {
    this.botToken = this.configService.get('BOT_TOKEN');
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is missing in env');
    }

    this.baseUrl = this.configService.get('CHANNEL_PROVIDER_URL');
    if (!this.baseUrl) {
      throw new Error('CHANNEL_PROVIDER_URL is missing in env');
    }
  }

  async sendMessageInChannel(
    channelName: ExamCenterNames,
    message: string,
  ): Promise<boolean> {
    const channel = ExamCenterChannels.find(
      (chan) => chan.examCenterName === channelName,
    );

    try {
      if (!channel) {
        throw new Error(`No channel configured for ${channelName}`);
      }

      const url = `${this.baseUrl}${this.botToken}/sendMessage`;
      await axios.post(url, {
        chat_id: channel.name,
        text: message,
        parse_mode: 'Markdown',
      });

      return true;
    } catch (err: any) {
      const errorMessage = `Error on sendMessageInChannel \n Channel: ${channel.name} \n Message: ${message} \n Error: ${err.message}`;
      this.sendErrorMessagesInInternalChannel(errorMessage);
      console.error(message);
      return false;
    }
  }

  async sendErrorMessagesInInternalChannel(message: string): Promise<boolean> {
    try {
      const internalChannelId = '-1002901085934';
      const url = `${this.baseUrl}${this.botToken}/sendMessage`;
      await axios.post(url, {
        chat_id: internalChannelId,
        text: message,
        parse_mode: 'Markdown',
      });

      return true;
    } catch (err: any) {
      console.error('Error on sendErrorMessagesInInternalChannel', err.message);
      return false;
    }
  }
}
