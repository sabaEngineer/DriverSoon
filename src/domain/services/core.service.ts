import {
  ICacheService,
  IGetExamDatesService,
  ISendMessageInChannel,
} from '../interface';
import { ExamCenterNames, ExamCentersGeorgianNames } from '../enum';
import { ExamDate } from '../model';
import { formatDate } from '../utils';

export class CoreService {
  constructor(
    private readonly getExamDatesService: IGetExamDatesService,
    private readonly chatClient: ISendMessageInChannel,
    private readonly cacheService: ICacheService,
  ) {}

  public async sendMessagesInChannels(): Promise<void> {
    try {
      const centersNames = Object.values(ExamCenterNames);

      for (const centerName of centersNames) {
        try {
          const examDates: ExamDate[] =
            await this.getExamDatesService.getExamDates(centerName);

          if (!examDates?.length) continue;

          const cacheKey = this.buildCacheKey(centerName);
          const currentExamDates = this.buildDatesSignature(examDates);
          const cachedExamDates = await this.cacheService.get<string>(cacheKey);
          if (cachedExamDates && cachedExamDates === currentExamDates) {
            continue;
          }

          await this.chatClient.sendMessageInChannel(
            centerName,
            this.formatMessage(ExamCentersGeorgianNames[centerName], examDates),
          );

          await this.cacheService.add(cacheKey, currentExamDates);
        } catch (centerErr: any) {
          console.error(
            `❌ Failed for ${centerName}: ${centerErr?.message ?? centerErr}`,
          );
        }
      }
    } catch (error: any) {
      console.error('Error on sendMessagesInChannels', error?.message ?? error);
      throw new Error('Error on sendMessagesInChannels');
    }
  }

  private buildCacheKey(centerName: ExamCenterNames): string {
    return `${centerName}:Dates`;
  }

  private buildDatesSignature(examDates: ExamDate[]): string {
    const days = examDates
      .map((d) => formatDate(d.date).date)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    return days.join(',');
  }

  private formatMessage(examCenterName: string, examDates: ExamDate[]): string {
    let message = `${examCenterName}-ს საგამოცდო დროები 🚘 🚙  \n`;

    for (const examDate of examDates) {
      const { DateInGeorgian } = formatDate(examDate.date);

      if (examDate.availableTimeSlots.length > 1) {
        const times = examDate.availableTimeSlots.map((s) => s.time);
        const joined = this.joinWithOr(times);
        message += `- ${DateInGeorgian} ${joined}-ზე.\n`;
      } else if (examDate.availableTimeSlots.length === 1) {
        const time = examDate.availableTimeSlots[0].time;
        message += `- ${DateInGeorgian} ${time}-ზე. \n`;
      } else {
        message += `- ${DateInGeorgian} \n`;
      }
    }

    message +=
      '\n დაჯავშნე გამოცდა - https://my.sa.gov.ge/drivinglicenses/practicalexam';

    message += '\n წარმარებები 💚';

    return message;
  }

  private joinWithOr(times: string[]): string {
    if (times.length <= 1) return times.join('');
    return times.slice(0, -1).join(', ') + ' ან ' + times[times.length - 1];
  }
}
