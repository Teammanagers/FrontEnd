export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface TeamMemberType {
  teamManageId: number;
  name: string;
}

export type ModalProps = {
  date: Value;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export interface ScheduleInfoType {
  date: string; // ISO 8601 형식의 문자열
  title: string;
  participants: {
    teamManageId: number;
    name: string;
  }[];
  content: string;
}

export interface ParticipantsListType {
  scheduleInfo: ScheduleInfoType;
  setScheduleInfo: React.Dispatch<React.SetStateAction<ScheduleInfoType>>;
}
