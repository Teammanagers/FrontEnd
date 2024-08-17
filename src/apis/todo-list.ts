import { instance } from './instance';

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
