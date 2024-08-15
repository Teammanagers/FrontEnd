import { Axios } from '@apis/Axios.ts';
import { MemoResponse } from '../types/memo.ts';

// 메모 조회
export const getMemos = async (teamId: number): Promise<MemoResponse> => {
  const response = await Axios.get<MemoResponse>(`/api/team/${teamId}/memo`);
  return response.data;
};
