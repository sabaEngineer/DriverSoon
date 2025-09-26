import { Injectable } from '@nestjs/common';
import { IGetExamDatesService } from 'src/domain/interface';
import { ExamDate } from 'src/domain/model';
import { ExamCenterIds } from './enums';
import { GovRepository } from './gov.repository';
import { ExamCenterNames } from 'src/domain/enum';

@Injectable()
export class getExamDatesService implements IGetExamDatesService {
  constructor(private readonly repository: GovRepository) {}

  public async getExamDates(examCenter: ExamCenterNames): Promise<ExamDate[]> {
    try {
      const examCenterId = ExamCenterIds[examCenter];
      const examDays = await this.repository.getExamDays(examCenterId);

      if (examDays.length <= 5 && examDays.length > 0) {
        const withSlots = await Promise.all(
          examDays.map(async (examDay) => {
            const availableTimeSlots =
              await this.repository.getAvailableTimeSlots(
                examCenterId,
                examDay.date,
              );

            return {
              id: examDay.id,
              date: examDay.date,
              examCenterId,
              availableTimeSlots,
            };
          }),
        );

        return withSlots.filter((d) => d.availableTimeSlots.length > 0);
      }

      return examDays.map((examDay) => ({
        id: examDay.id,
        date: examDay.date,
        examCenterId,
        availableTimeSlots: [],
      }));
    } catch (error: any) {
      console.error('Error on getExamDates', error.message);
      throw new Error('Error on getExamDates');
    }
  }
}
