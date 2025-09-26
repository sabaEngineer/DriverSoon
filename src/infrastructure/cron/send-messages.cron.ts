import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  ICacheService,
  IGetExamDatesService,
  ISendMessageInChannel,
} from 'src/domain/interface';
import { CoreService } from 'src/domain/services';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly core: CoreService;

  constructor(
    @Inject(IGetExamDatesService.name)
    private readonly getExamDatesService: IGetExamDatesService,
    @Inject(ISendMessageInChannel.name)
    private readonly channelProvider: ISendMessageInChannel,
    @Inject(ICacheService.name) private readonly cacheService: ICacheService,
  ) {
    this.core = new CoreService(
      this.getExamDatesService,
      this.channelProvider,
      this.cacheService,
    );
  }

  @Cron('* * * * *')
  async handleCron() {
    this.logger.debug('Running cron job every minute');
    await this.core.sendMessagesInChannels();
  }
}
