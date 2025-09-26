import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CarCategoryIds, ExamCenters } from './enums';
import { AvaliableTimeSlotsResponse, TExamDaysResponse } from './types';
import { parseCustomDateToJsDate, parseJsDateToCustomDate } from './helpers';
import { ISendMessageInChannel } from 'src/domain/interface';

@Injectable()
export class GovRepository {
  private readonly govUrl: string | null = null;
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    @Inject(ISendMessageInChannel.name)
    private readonly chatClient: ISendMessageInChannel,
  ) {
    if (!this.configService.get('GOV_URL')) {
      throw new Error('GOV_URL is not set');
    }
    this.govUrl = this.configService.get('GOV_URL');
  }

  public async getExamDays(
    examCenterId: number,
  ): Promise<{ id: number; date: Date }[]> {
    const url = `${this.govUrl}/DrivingLicenseExamsDates2?CategoryCode=${CarCategoryIds.Automatic}&CenterId=${examCenterId}`;

    try {
      const res = await firstValueFrom(
        this.http.get<TExamDaysResponse>(url, {
          headers: { Accept: 'application/json' },
        }),
      );
      const options = res.data;

      return options
        .filter((o) => o.bookingDateStatus)
        .map((o, i) => ({
          id: i + 1,
          date: parseCustomDateToJsDate(o.bookingDate),
        }));
    } catch (error) {
      const centerName = ExamCenters.find((c) => c.id === examCenterId)?.name;
      const message = `
           Error on getExamDays \n
           Center: ${centerName} \n
           RequestUrl: ${url} \n
           Error: ${error.response?.data || error?.message}
        `;
      this.chatClient.sendErrorMessagesInInternalChannel(message);
      console.error(message);
      return [];
    }
  }

  public async getAvailableTimeSlots(
    examCenterId: number,
    date: Date,
  ): Promise<{ id: number; time: string }[]> {
    const examDate = parseJsDateToCustomDate(date);
    const url = `${this.govUrl}/DrivingLicenseExamsDateFrames2?CategoryCode=${CarCategoryIds.Automatic}&CenterId=${examCenterId}&ExamDate=${encodeURIComponent(examDate)}`;

    try {
      const res = await firstValueFrom(
        this.http.get<AvaliableTimeSlotsResponse>(url, {
          headers: { Accept: 'application/json' },
        }),
      );
      const options = res.data;

      return options.map((r) => ({
        id: r.timeFrameId,
        time: r.timeFrameName,
      }));
    } catch (error) {
      const centerName = ExamCenters.find((c) => c.id === examCenterId)?.name;
      const message = `
           Error on getAvailableTimeSlots \n
           Center: ${centerName} \n
           ExamDate: ${date} \n
           RequestUrl: ${url} \n
           Error: ${error.response?.data || error?.message}
        `;
      this.chatClient.sendErrorMessagesInInternalChannel(message);
      console.error(message);
      return [];
    }
  }
}
