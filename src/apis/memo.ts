import { Axios } from '@apis/Axios.ts';
import { MemoResponse } from '../types/memo.ts';

// 메모 조회
export const getMemos = async (teamId: number): Promise<MemoResponse> => {
  const response = await Axios.get<MemoResponse>(`/api/team/${teamId}/memo`);
  return response.data;
};

// 메모 생성
export const createMemo = async (
  teamId: number,
  title: string,
  tagList: string[],
  content: string
) => {
  try {
    const response = await Axios.post(`/api/team/${teamId}/memo`, {
      title: title,
      tagList: tagList,
      content: content
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
