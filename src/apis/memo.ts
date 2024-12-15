import { AxiosInstance } from '@/apis/new/axios-instance.ts';

// 메모 개별 조회
export const getMemoById = async (memoId: number) => {
  try {
    const response = await AxiosInstance.get(`/api/memo/${memoId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 메모 수정
export const updateMemo = async (
  memoId: number,
  title: string,
  tagList: string[],
  content: string
) => {
  try {
    const response = await AxiosInstance.patch(`api/memo/${memoId}`, {
      title: title,
      tagList: tagList,
      content: content
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 메모 삭제
export const deleteMemo = async (memoId: number) => {
  try {
    await AxiosInstance.delete(`/api/memo/${memoId}`);
    console.log('메모 삭제');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
