import { AxiosInstance } from '@/apis/new/axios-instance';
import { todoApiUrlWithId, todoApiUrl } from '@/apis/new/urls';
import { getTodoResponse } from '@/types/new/response/todo';

// 투두 생성
export const createTodo = async (teamManageId: number): Promise<void> => {
  const response = await AxiosInstance.post(
    `${todoApiUrlWithId(teamManageId)}`
  );
  return response.data;
};

// 팀 투두리스트 조회
export const getTodo = async (teamId: number): Promise<getTodoResponse> => {
  const response = await AxiosInstance.get(`${todoApiUrlWithId(teamId)}`);
  return response.data;
};

// 투두 수정
export const updateTodo = async (todoId: number): Promise<void> => {
  const response = await AxiosInstance.patch(`${todoApiUrl(todoId)}`);
  return response.data;
};

// 투두 상태 수정
export const updateTodoStatus = async (todoId: number): Promise<void> => {
  const response = await AxiosInstance.patch(`${todoApiUrl(todoId)}/state`);
  return response.data;
};

// 투두 삭제
export const deleteTodo = async (todoId: number): Promise<void> => {
  const response = await AxiosInstance.delete(`${todoApiUrl(todoId)}`);
  return response.data;
};
