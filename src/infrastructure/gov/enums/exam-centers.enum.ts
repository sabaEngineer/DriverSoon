import { ExamCenterNames } from 'src/domain/enum';
import { ExamCenter } from 'src/domain/model';

export const ExamCenterIds = {
  [ExamCenterNames.Batumi]: 15,
  [ExamCenterNames.Rustavi]: 3,
  [ExamCenterNames.Gori]: 7,
  [ExamCenterNames.Ozurgeti]: 9,
  [ExamCenterNames.Kutaisi]: 2,
  [ExamCenterNames.Akhaltsikhe]: 5,
  [ExamCenterNames.Zugdidi]: 6,
  [ExamCenterNames.Sachxere]: 10,
  [ExamCenterNames.Poti]: 8,
  [ExamCenterNames.Telavi]: 4,
};

export const ExamCenters: ExamCenter[] = Object.keys(ExamCenterNames).map(
  (key) => ({
    id: ExamCenterIds[ExamCenterNames[key]],
    name: ExamCenterNames[key],
  }),
);
