import { instance } from './instance';

export const getMyTodos = async () => {
  const response = await instance.get(`/api/member/todo`);
  return response;
};

export const getTeamTodos = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/todo`);
  return response;
};

export const createTodo = async (teamManageId: number, todo: string) => {
  const response = await instance.post(`/api/team/${teamManageId}/todo`, {
    title: todo
  });
  return response;
};

export const updateTodo = async (todoId: number, todo: string) => {
  const response = await instance.patch(`/api/todo/${todoId}`, {
    title: todo
  });
  return response;
};

export const setTodoCheck = async (todoId: number) => {
  const response = await instance.patch(`/api/todo/${todoId}/state`);
  return response;
};

export const deleteTodo = async (todoId: number) => {
  const response = await instance.delete(`/api/todo/${todoId}`);
  return response;
};

export const sendAwakeAlarm = async (teamId: number, todoId: number) => {
  const response = await instance.post(`/api/team/${teamId}/alarm/${todoId}`, {
    alarmType: 'TODO_AWAKE'
  });
  return response;
};
