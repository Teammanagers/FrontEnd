import { AxiosInstance } from '@/apis/new/axios-instance';
import { memoApiUrl, memoApiUrlWithTeamId } from '@/apis/new/urls';
import { ICreateMemo, IUpdateMemo } from '@/types/new/common';
import {
  getMemoDetailResponse,
  getMemoListResponse
} from '@/types/new/response/memo';

// 팀 메모 생성
export const createMemo = async ({
  teamId,
  title,
  tagList,
  content
}: ICreateMemo): Promise<void> => {
  await AxiosInstance.post(`${memoApiUrlWithTeamId(teamId)}`, {
    title,
    tagList,
    content
  });
};

// 팀 메모 조회
export const getMemoList = async (
  teamId: number
): Promise<getMemoListResponse> => {
  const response = await AxiosInstance.get(`${memoApiUrlWithTeamId(teamId)}`);
  return response.data;
};

// 팀 메모 개별 조회
export const getMemoDetail = async (
  memoId: number
): Promise<getMemoDetailResponse> => {
  const response = await AxiosInstance.get(memoApiUrl(memoId));
  return response.data;
};

// 메모 수정
export const updateMemo = async ({
  memoId,
  title,
  tagList,
  content
}: IUpdateMemo): Promise<void> => {
  await AxiosInstance.patch(memoApiUrl(memoId), {
    title,
    tagList,
    content
  });
};

// 메모 삭제
export const deleteMemo = async (memoId: number): Promise<void> => {
  const response = await AxiosInstance.delete(memoApiUrl(memoId));
  return response.data;
};
