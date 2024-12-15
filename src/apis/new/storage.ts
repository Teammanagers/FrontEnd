import { AxiosInstance } from '@/apis/new/axios-instance';
import { storageApiUrlWithTeamId, storageApiUrl } from '@/apis/new/urls';
import { getStorageResponse } from '@/types/new/response/storage';

// 팀 자료 생성
export const createStorage = async (
  teamId: number,
  title: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('teamId', teamId.toString());
  formData.append('title', title);
  formData.append('file', file);

  await AxiosInstance.post(`${storageApiUrlWithTeamId(teamId)}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 팀 자료 조회
export const getStorage = async (
  teamId: number
): Promise<getStorageResponse> => {
  const response = await AxiosInstance.get(
    `${storageApiUrlWithTeamId(teamId)}`
  );
  return response.data;
};

// 자료 다운로드
export const downloadStorage = async (
  teamId: number,
  storageId: number
): Promise<void> => {
  await AxiosInstance.get(`${storageApiUrlWithTeamId(teamId)}/${storageId}`);
};

// 자료 삭제
export const deleteStorage = async (storageId: number): Promise<void> => {
  await AxiosInstance.delete(`${storageApiUrl(storageId)}`);
};
