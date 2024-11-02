import { memberApiUrl } from '@/apis/new/urls';
import { AxiosInstance } from '@/apis/new/axios-instance';
import {
  getMyPortfolioDetailResponse,
  getMyPortfolioResponse,
  getMyProfileResponse,
  getMyTeamResponse,
  getMyTodoListResponse
} from '@/types/new/response/member';

// 내 프로필 조회
export const getMyProfile = async (): Promise<getMyProfileResponse> => {
  const response = await AxiosInstance.get(memberApiUrl);
  return response.data;
};

// 내 투두리스트 조회
export const getMyTodoList = async (): Promise<getMyTodoListResponse> => {
  const response = await AxiosInstance.get(`${memberApiUrl}/todo`);
  return response.data;
};

// 내 프로필 수정
export const updateMyProfile = async (): Promise<void> => {
  await AxiosInstance.patch(memberApiUrl);
};

// 내 프로필 한마디 상태 변경
export const updateMyProfileCommentState = async (
  commentId: number
): Promise<void> => {
  await AxiosInstance.patch(`/api/comment/${commentId}/state`);
};

// 내 포트폴리오 조회
export const getMyPortfolio = async (): Promise<getMyPortfolioResponse> => {
  const response = await AxiosInstance.get(`${memberApiUrl}/portfolio`);
  return response.data;
};

// 내 포트폴리오 상세 조회
export const getMyPortfolioDetail = async (
  teamId: number
): Promise<getMyPortfolioDetailResponse> => {
  const response = await AxiosInstance.get(
    `${memberApiUrl}/portfolio/${teamId}`
  );
  return response.data;
};

// 내 팀 조회
export const getMyTeam = async (): Promise<getMyTeamResponse> => {
  const response = await AxiosInstance.get(`${memberApiUrl}/team`);
  return response.data;
};
