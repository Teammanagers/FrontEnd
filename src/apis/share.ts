import { AxiosInstance } from './new/axios-instance';
import { FeedbackResponse, GetFeedback } from 'src/types/storage';

const teamId = 1;

//자료 피드백 생성
interface CreateFeedbackParams {
  parentId: number | null;
  content: string;
}

export const createFeedback = async (
  teamId: number,
  feedbackData: CreateFeedbackParams
): Promise<FeedbackResponse> => {
  try {
    const response = await AxiosInstance.post<FeedbackResponse>(
      `/api/storage/${teamId}/feedback`,
      feedbackData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('자료 피드백 생성 실패:', error);
    throw error;
  }
};

//자료 피드백 조회
export const getFeedback = async (): Promise<GetFeedback> => {
  try {
    const response = await AxiosInstance.get<GetFeedback>(
      `/api/team/${teamId}/storage`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('자료 피드백 생성 실패:', error);
    throw error;
  }
};
