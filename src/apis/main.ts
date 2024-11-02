import { AxiosInstance } from '@/apis/new/axios-instance';

export const getTeamInfo = async (teamId: number) => {
  const response = await AxiosInstance.get(`/api/team/${teamId}`);
  return response;
};

export const getNoticeRecent = async (teamId: number) => {
  const response = await AxiosInstance.get(`/api/team/${teamId}/notice/recent`);
  return response;
};

export const getNoticeList = async (teamId: number) => {
  const response = await AxiosInstance.get(`/api/team/${teamId}/notice`);
  return response;
};

export const createNotice = async (teamId: number, notice: string) => {
  const response = await AxiosInstance.post(`/api/team/${teamId}/notice`, {
    content: notice
  });
  return response;
};
