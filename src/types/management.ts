export interface Tag {
  name: string;
}

export interface TeamTag extends Tag {
  tagId?: number;
}

export interface RoleTag extends Tag {
  teamManageId?: number;
}

export interface TeamData {
  teamId?: number;
  title?: string;
  teamCode?: string;
  imageUrl?: string;
  teamTagList?: TeamTag[];
}

export interface TeamProps {
  teamId: number;
  title: string;
  imageUrl: string;
}

export interface ScheduleRequestBody {
  monday: { value: string[] };
  tuesday: { value: string[] };
  wednesday: { value: string[] };
  thursday: { value: string[] };
  friday: { value: string[] };
  saturday: { value: string[] };
  sunday: { value: string[] };
}

export interface TimeTable {
  value: string[]; // 48개의 "0" 또는 "1"로 구성된 문자열 배열
}

export interface ScheduleDto {
  monday: TimeTable;
  tuesday: TimeTable;
  wednesday: TimeTable;
  thursday: TimeTable;
  friday: TimeTable;
  saturday: TimeTable;
  sunday: TimeTable;
}

export interface ScheduleResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    participants: [];
    scheduleDto: ScheduleDto;
  };
}
