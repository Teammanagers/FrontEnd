import { AxiosInstance } from '@/apis/new/axios-instance';
import { noticeApiUrl } from '@/apis/new/urls';
import {
  getNoticeResponse,
  getRecentNoticeResponse
} from '@/types/new/response/notice';

// 팀 공지 생성
export const createNotice = async (teamId: number): Promise<void> => {
  const response = await AxiosInstance.post(noticeApiUrl(teamId));
  return response.data;
};

// 팀 공지 조회
export const getNotice = async (teamId: number): Promise<getNoticeResponse> => {
  const response = await AxiosInstance.post(noticeApiUrl(teamId));
  return response.data;
};

// 팀 최신 공지 조회
export const getRecentNotice = async (
  teamId: number
): Promise<getRecentNoticeResponse> => {
  const response = await AxiosInstance.post(`${noticeApiUrl(teamId)}/recent`);
  return response.data;
};
