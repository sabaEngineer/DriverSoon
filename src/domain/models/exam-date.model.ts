export interface ExamDate {
  id: number;
  date: Date;
  examCenterId: number;
  availableTimeSlots: { id: number; time: string }[];
}
