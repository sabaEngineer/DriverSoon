import { ExamCenter } from 'src/domain/models';

export const ExamCenterNames = {
  Rustavi: 'რუსთავი',
  Batumi: 'ბათუმი',
};

export const ExamCenterIds = {
  [ExamCenterNames.Batumi]: 15,
  [ExamCenterNames.Rustavi]: 3,
};

export const ExamCenters: ExamCenter[] = Object.keys(ExamCenterNames).map(
  (key) => ({
    id: ExamCenterIds[key],
    name: ExamCenterNames[key],
  }),
);
