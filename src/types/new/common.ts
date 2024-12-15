export enum Status {
  PROCEEDING, // 진행 중
  COMPLETED // 완료
}

export enum SocialType {
  NAVER,
  KAKAO,
  GOOGLE
}

export enum AlarmType {
  TODO_AWAKE,
  CALENDAR_REMIND,
  TEAM_FINISH
}

export interface IComment {
  commentId: number; // 코멘트 ID
  content: string; // 내용
  isHidden: boolean; // 숨김 상태
}

export interface IRegisterComment {
  teamManageId: number; // 팀-멤버 ID
  content: string; // 내용
}

export interface IStorage {
  storageId: number; // 자료 ID
  title: string; // 제목
  size: string; // 크기
  uploadAt: Date; // 업로드 날짜
  fileUrl: string; // 파일 경로
  uploader: string; // 업로더 이름
}

export interface ITeam {
  teamId: number; // 팀 ID
  title: string; // 팀명
  teamCode: string; // 팀 코드
  imageUrl: string; // 팀 프로필 이미지
  teamTagList: ITag[]; // 팀 태그 리스트
}

export interface INotice {
  noticeId: number; // 공지 ID
  content: string; // 내용
  createdAt: Date; // 생성 시간
}

export interface ICalendar {
  calendarId: number; // 캘린더 ID
  title: string; // 캘린더 제목
  status: Status; // 캘린더 완료 상태
  isAlarm: boolean; // 알림 설정
  date: Date; // 날짜
}
export interface ICalendarDetail {
  calendarId: number; // 캘린더 ID
  title: string; // 캘린더 제목
  content: string; // 내용
  participants: number[]; // 참여자(teamManageId)
}

export interface ICalendarList {
  date: Date; // 날짜
  calendarList: ICalendar[]; // 해당 날짜의 캘린더 리스트
}
export interface ISimplePortfolio {
  teamId: number; // 팀 ID
  name: string; // 프로젝트 이름
  start: Date; // 프로젝트 개설 일자
  end: Date; // 프로젝트 종료 일자
}

export interface IAlarm {
  alarmId: number; // 알림 ID
  type: AlarmType; // 알림 종류
  referenceId: number; // 참조 ID
  content: string; // 내용
  date: Date; // 날짜
  isRead: boolean; // 읽음 여부
}
export interface ITodo {
  todoId: number; // 투두 ID
  title: string; // 제목
  status: Status; // 완료 상태
}
export interface ITodoList {
  teamManageId: number; // 팀-멤버 ID
  name: string; // 이름
  roleTagList: ITag[]; // 역할 태그 리스트
  todoList: ITodo[]; // 투두리스트
}
export interface IMyTodoList {
  title: string; // 팀 제목
  roleTagList: ITag[]; // 팀 태그 리스트
  todoList: ITodo[]; // 투두리스트
}

export interface IMemo {
  memoId: number; // 메모 ID
  title: string; // 제목
  tagList: ITag[]; // 태그 리스트
  content: string; // 내용
}
export interface IFeedback {
  parentId: number; // 대댓글의 경우, 부모 피드백 ID (깊이가 0인 경우 null)
  feedbackId: number; // 피드백 ID
  content: string; // 내용
}
export interface ISchedule {
  monday: string[]; // 월요일
  tuesday: string[]; // 화요일
  wednesday: string[]; // 수요일
  thursday: string[]; // 목요일
  friday: string[]; // 금요일
  saturday: string[]; // 토요일
  sunday: string[]; // 일요일
}
export interface ITag {
  tagId: number; // 태그 ID
  name: string; // 태그 이름
}
export interface ITeamMember {
  teamManageId: number; // 팀-멤버 ID
  name: string; // 이름
  imageUrl: string; // 멤버 프로필 이미지
  roleList: ITag[]; // 역할 태그 리스트
}
export interface ISimpleTeamMember {
  teamManageId: number; // 팀-멤버 ID
  name: string; // 이름
}

export interface ITeamMember {
  teamManageId: number; // 팀-멤버 ID
  name: string; // 이름
  imageUrl: string; // 멤버 프로필 이미지
  roleList: ITag[]; // 역할 태그 리스트
}
export interface ISimpleTeamManage {
  teamManageId: number; // 팀-멤버 ID
  name: string; // 이름
}

export interface ITerms {
  termsOfUse: boolean;
  privacyPolicy: boolean;
}

export interface ICreateTeam {
  title: string; // 팀명
  teamTagList: string[]; // 팀 태그 리스트
  imageFile: File; // 프로필 이미지 (최대 10MB)
}

export interface IUpdateTeam {
  teamId: number;
  teamCode: string;
  password: string;
}

export interface IUpdateMyProfile {
  image: File | null;
  name: string;
  belong: string;
  phoneNumber: string;
  confidentRole: string[];
}
