import { AxiosInstance } from '@/apis/new/axios-instance';
import { CreateEventProps, UpdateEventProps } from 'src/types/calendar';
import { calendarApiUrl, calendarApiUrlWithTeamId } from './new/urls';

// 캘린더 생성
export const createCalendarEvent = async (
  teamId: number,
  event: CreateEventProps
) => {
  await AxiosInstance.post(calendarApiUrlWithTeamId(teamId), event);
};

// 팀 캘린더 조회
export const getCalendarEventList = async (
  teamId: number,
  month: number | null
) => {
  const response = await AxiosInstance.get(
    `${calendarApiUrlWithTeamId(teamId)}?month=${month}`
  );
  return response;
};

// 다가오는 캘린더 조회
export const getUpcomingEvent = async (teamId: number) => {
  const response = await AxiosInstance.get(
    `${calendarApiUrlWithTeamId(teamId)}/coming`
  );
  return response;
};

// 캘린더 상세 조회
export const getCalendarEventDetail = async (calendarId: number) => {
  const response = await AxiosInstance.get(calendarApiUrl(calendarId));
  return response;
};

// 캘린더 수정
export const updateCalendarEvent = async (
  calendarId: number,
  data: UpdateEventProps
) => {
  const response = await AxiosInstance.patch(calendarApiUrl(calendarId), data);
  return response;
};

// 캘린더 상태 수정
export const updateEventState = async (calendarId: number) => {
  const response = await AxiosInstance.patch(
    `${calendarApiUrl(calendarId)}/state`
  );
  return response;
};

// 캘린더 삭제
export const deleteCalendarEvent = async (calendarId: number) => {
  const response = await AxiosInstance.delete(calendarApiUrl(calendarId));
  return response;
};
