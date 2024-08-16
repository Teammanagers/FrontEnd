import { create } from 'zustand';
import { UserInfo } from 'src/types/todo-list';

type TodoState = {
  progress: number;
  teamTodoList: UserInfo[];
};

type TodoAction = {
  setTeamTodos: (data: { progress: number; teamTodoList: UserInfo[] }) => void;
};

export const useTodoStore = create<TodoState & TodoAction>()((set) => ({
  progress: 0,
  teamTodoList: [],

  setTeamTodos: (data) =>
    set(() => ({
      progress: data.progress,
      teamTodoList: data.teamTodoList
    }))
}));
