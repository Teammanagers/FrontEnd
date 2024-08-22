import { Axios } from './axios';
import {
  StorageResponse,
  FeedbackResponse,
  GetFeedback
} from 'src/types/storage';

const teamId = 1;
//팀 자료 조회
export const getStorageList = async (
  teamId: number
): Promise<StorageResponse> => {
  try {
    const response = await Axios.get<StorageResponse>(
      `/api/team/${teamId}/storage`
    );
    console.log('자료조회 중');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('자료조회 fetch 실패:', error);
    throw error;
  }
};

//팀 자료 생성
export const createStorageItem = async (
  teamId: number,
  title: string,
  file: File
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('teamId', teamId.toString());
    formData.append('title', title);
    formData.append('file', file);

    await Axios.post(`/api/team/${teamId}/storage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('자료가 성공적으로 생성되었습니다.');
  } catch (error) {
    console.error('자료 생성 실패:', error);
    throw error;
  }
};

//팀 자료 다운로드
export const downloadStorageItem = async (storageId: number): Promise<Blob> => {
  try {
    const response = await Axios.get(
      `/api/team/${teamId}/storage/${storageId}`,
      {
        responseType: 'blob'
      }
    );

    console.log('자료가 성공적으로 다운로드되었습니다.');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('자료 다운로드 실패:', error);
    throw error;
  }
};

//자료 삭제
export const deleteStorageItem = async (storageId: number) => {
  try {
    await Axios.delete(`/api/storage/${storageId}`);
    console.log('자료 삭제');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
    const response = await Axios.post<FeedbackResponse>(
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
    const response = await Axios.get<GetFeedback>(
      `/api/team/${teamId}/storage`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('자료 피드백 생성 실패:', error);
    throw error;
  }
};
