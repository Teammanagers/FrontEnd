import { instance } from './instance';

export const getNoticeRecent = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/notice/recent`);
  return response;
};

export const getNoticeList = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/notice`);
  return response;
};

export const createNotice = async (teamId: number, notice: string) => {
  const response = await instance.post(`/api/team/${teamId}/notice`, {
    content: notice
  });
  return response;
};
