export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface ScheduleInfo {
  date: string;
  title: string;
  memo: string;
}
