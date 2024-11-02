import { AxiosInstance } from '@/apis/new/axios-instance';

export const getMyTodos = async () => {
  const response = await AxiosInstance.get(`/api/member/todo`);
  return response;
};

export const getTeamTodos = async (teamId: number) => {
  const response = await AxiosInstance.get(`/api/team/${teamId}/todo`);
  return response;
};

export const createTodo = async (teamManageId: number, todo: string) => {
  const response = await AxiosInstance.post(`/api/team/${teamManageId}/todo`, {
    title: todo
  });
  return response;
};

export const updateTodo = async (todoId: number, todo: string) => {
  const response = await AxiosInstance.patch(`/api/todo/${todoId}`, {
    title: todo
  });
  return response;
};

export const updateTodoCheck = async (todoId: number) => {
  const response = await AxiosInstance.patch(`/api/todo/${todoId}/state`);
  return response;
};

export const deleteTodo = async (todoId: number) => {
  const response = await AxiosInstance.delete(`/api/todo/${todoId}`);
  return response;
};

export const sendAwakeAlarm = async (teamId: number, todoId: number) => {
  const response = await AxiosInstance.post(
    `/api/team/${teamId}/alarm/${todoId}`,
    {
      alarmType: 'TODO_AWAKE'
    }
  );
  return response;
};
