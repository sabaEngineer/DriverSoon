import { ExamCenterChannel } from 'src/domain/models';
import { ExamCenterIds, ExamCenterNames } from 'src/infrastructure/gov/enums';

export const ExamCenterChannels: ExamCenterChannel[] = [
  {
    id: 1,
    name: 'Rustavi',
    joinUrl: 'https://t.me/+4BZ0ZD9g',
    examCenterId: ExamCenterIds[ExamCenterNames.Rustavi],
    examCenterName: ExamCenterNames.Rustavi,
  },
  {
    id: 2,
    name: 'Batumi',
    joinUrl: 'https://t.me/+4BZ0ZD9g',
    examCenterId: ExamCenterIds[ExamCenterNames.Batumi],
    examCenterName: ExamCenterNames.Batumi,
  },
];
