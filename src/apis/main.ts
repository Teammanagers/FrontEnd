import { Axios } from './axios';

export const getTeamInfo = async (teamId: number) => {
  const response = await Axios.get(`/api/team/${teamId}`);
  return response;
};

export const getNoticeRecent = async (teamId: number) => {
  const response = await Axios.get(`/api/team/${teamId}/notice/recent`);
  return response;
};

export const getNoticeList = async (teamId: number) => {
  const response = await Axios.get(`/api/team/${teamId}/notice`);
  return response;
};

export const createNotice = async (teamId: number, notice: string) => {
  const response = await Axios.post(`/api/team/${teamId}/notice`, {
    content: notice
  });
  return response;
};
