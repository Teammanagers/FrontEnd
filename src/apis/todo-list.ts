import { instance } from './instance';

export const getTeamTodos = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/todo`);
  return response;
};

export const createTodo = async (teamId: number, todo: string) => {
  const response = await instance.post(`/api/team/${teamId}/todo`, {
    title: todo
  });
  return response;
};
