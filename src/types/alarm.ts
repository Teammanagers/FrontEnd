export interface AlarmListType {
  result: {
    alarmList: AlarmItemType[];
  };
}

export interface AlarmItemType {
  alarmId: number;
  type: string;
  referenceId: number;
  date: Date;
  isRead: boolean;
}
