import { AxiosInstance } from '@/apis/new/axios-instance.ts';

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
