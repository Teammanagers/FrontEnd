import { getStoageFeedbackResponse } from '@/types/new/response/feedback';
import { AxiosInstance } from './axios-instance';
import { feedbackApiUrlWithStorageId } from '@/apis/new/urls';

// 자료 피드백 생성
export const createStoageFeedback = async (
  storageId: number
): Promise<void> => {
  const response = await AxiosInstance.post(
    `${feedbackApiUrlWithStorageId(storageId)}`
  );
  return response.data;
};

// 자료 피드백 조회
export const getStoageFeedback = async (
  storageId: number
): Promise<getStoageFeedbackResponse> => {
  const response = await AxiosInstance.get(
    `${feedbackApiUrlWithStorageId(storageId)}`
  );
  return response.data;
};
