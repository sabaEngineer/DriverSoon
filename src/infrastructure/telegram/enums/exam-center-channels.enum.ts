import { ExamCenterChannel } from 'src/domain/models';
import { ExamCenterIds, ExamCenterNames } from 'src/infrastructure/gov/enums';

export const ExamCenterChannels: ExamCenterChannel[] = [
  {
    id: 1,
    name: '@rustaviSoon',
    joinUrl: 'https://t.me/rustaviSoon',
    examCenterId: ExamCenterIds[ExamCenterNames.Rustavi],
    examCenterName: ExamCenterNames.Rustavi,
  },
  {
    id: 2,
    name: '@batumiSoon',
    joinUrl: 'https://t.me/batumiSoon',
    examCenterId: ExamCenterIds[ExamCenterNames.Batumi],
    examCenterName: ExamCenterNames.Batumi,
  },
];
