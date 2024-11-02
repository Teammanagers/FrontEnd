import { AxiosInstance } from '@/apis/new/axios-instance';
import { calendarApiUrlWithTeamId, calendarApiUrl } from '@/apis/new/urls';
import {
  getCalendarDetailResponse,
  getCalendarResponse,
  getComingCalendarResponse
} from '@/types/new/response/calendar';

// 캘린더 생성
export const createCalendar = async (teamId: number): Promise<void> => {
  const response = await AxiosInstance.post(calendarApiUrlWithTeamId(teamId));
  return response.data;
};

// 팀 캘린더 조회
export const getCalendar = async (
  teamId: number
): Promise<getCalendarResponse> => {
  const response = await AxiosInstance.get(calendarApiUrlWithTeamId(teamId));
  return response.data;
};

// 다가오는 캘린더 조회
export const getComingCalendar = async (
  teamId: number
): Promise<getComingCalendarResponse> => {
  const response = await AxiosInstance.get(
    `${calendarApiUrlWithTeamId(teamId)}/coming`
  );
  return response.data;
};

// 캘린더 상세 조회
export const getCalendarDetail = async (
  calendarId: number
): Promise<getCalendarDetailResponse> => {
  const response = await AxiosInstance.get(calendarApiUrl(calendarId));
  return response.data;
};

// 캘린더 수정
export const updateCalendar = async (calendarId: number): Promise<void> => {
  const response = await AxiosInstance.patch(calendarApiUrl(calendarId));
  return response.data;
};

// 캘린더 상태 수정
export const updateCalendarState = async (
  calendarId: number
): Promise<void> => {
  const response = await AxiosInstance.patch(
    `${calendarApiUrl(calendarId)}/state`
  );
  return response.data;
};

// 캘린더 삭제
export const deleteCalendar = async (calendarId: number): Promise<void> => {
  const response = await AxiosInstance.delete(calendarApiUrl(calendarId));
  return response.data;
};
