import { ExamCenterNames } from '../enum';
import { ExamDate } from '../model';

export abstract class IGetExamDatesService {
  abstract getExamDates(examCenter: ExamCenterNames): Promise<ExamDate[]>;
}
