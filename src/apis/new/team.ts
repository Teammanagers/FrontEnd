import { teamApiUrl } from '@/apis/new/urls';
import { AxiosInstance } from '@/apis/new/axios-instance';
import {
  createTeamResponse,
  deleteTeamResponse,
  getTeamByCodeResponse,
  getTeamMemberDetailResponse,
  getTeamMemberResponse,
  getTeamResponse
} from '@/types/new/response/team';
import { ICreateTeam } from '@/types/new/common';

// 팀 생성
export const createTeam = async (
  formData: ICreateTeam
): Promise<createTeamResponse> => {
  const response = await AxiosInstance.post(teamApiUrl, formData);
  return response.data;
};

// 팀 수정
export const updateTeam = async (teamId: number): Promise<void> => {
  const response = await AxiosInstance.patch(`${teamApiUrl}/${teamId}`);
  return response.data;
};

// 팀 참여
export const joinTeam = async (teamId: number): Promise<void> => {
  const response = await AxiosInstance.post(`${teamApiUrl}/${teamId}`);
  return response.data;
};

// 팀 비밀번호 생성
export const createTeamPassword = async (teamId: number): Promise<void> => {
  const response = await AxiosInstance.patch(
    `${teamApiUrl}/${teamId}/password`
  );
  return response.data;
};

// 팀 조회
export const getTeam = async (teamId: number): Promise<getTeamResponse> => {
  const response = await AxiosInstance.get(`${teamApiUrl}/${teamId}`);
  return response.data;
};

// 팀 조회 (팀 코드)
export const getTeamByCode = async (): Promise<getTeamByCodeResponse> => {
  const response = await AxiosInstance.get(teamApiUrl);
  return response.data;
};

// 팀 멤버 조회
export const getTeamMember = async (
  teamId: number
): Promise<getTeamMemberResponse> => {
  const response = await AxiosInstance.get(`${teamApiUrl}/${teamId}/member`);
  return response.data;
};

// 팀 멤버 조회 (역할 태그 포함)
export const getTeamMemberDetail = async (
  teamId: number
): Promise<getTeamMemberDetailResponse> => {
  const response = await AxiosInstance.get(
    `${teamApiUrl}/${teamId}/member/detail`
  );
  return response.data;
};

// 팀 종료
export const deleteTeam = async (
  teamId: number
): Promise<deleteTeamResponse> => {
  const response = await AxiosInstance.patch(`${teamApiUrl}/${teamId}/state`);
  return response.data;
};

// 팀 나가기
export const exitTeam = async (teamId: number): Promise<void> => {
  const response = await AxiosInstance.delete(`${teamApiUrl}/${teamId}/exit`);
  return response.data;
};

// 팀 멤버 코멘트 생성
export const createMemberComment = async (): Promise<void> => {
  const response = await AxiosInstance.post(`${teamApiUrl}/comment`);
  return response.data;
};
