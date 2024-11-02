// 유저 도메인
export const memberApiUrl = '/api/member';

// 약관 도메인
export const termsApiUrl = '/api/terms';

// 팀 도메인
export const teamApiUrl = '/api/team';

// 공지 도메인
export const noticeApiUrl = (teamId: number) => {
  return `/api/team/${teamId}/notice`;
};

// 캘린더 도메인
export const calendarApiUrl = (calendarId: number) => {
  return `/api/calendar/${calendarId}`;
};
export const calendarApiUrlWithTeamId = (teamId: number) => {
  return `/api/team/${teamId}/calendar`;
};

// 알림 도메인
export const alarmApiUrl = '/api/alarm';
export const alarmApiUrlWithTeamId = (teamId: number) => {
  return `/api/team/${teamId}/alarm`;
};

// 투두 도메인
export const todoApiUrl = (todoId: number) => {
  return `/api/team/${todoId}`;
};
export const todoApiUrlWithId = (id: number) => {
  return `/api/team/${id}/todo`;
};

// 메모 도메인
export const memoApiUrl = (memoId: number) => {
  return `/api/team/${memoId}`;
};
export const memoApiUrlWithTeamId = (teamId: number) => {
  return `/api/team/${teamId}/memo`;
};

// 자료 도메인
export const storageApiUrl = (storageId: number) => {
  return `/api/storage/${storageId}`;
};
export const storageApiUrlWithTeamId = (teamId: number) => {
  return `/api/team/${teamId}/storage`;
};

// 피드백 도메인
export const feedbackApiUrlWithStorageId = (storageId: number) => {
  return `/api/storage/${storageId}/feedback`;
};
