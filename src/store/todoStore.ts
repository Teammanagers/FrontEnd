import { create } from 'zustand';
import { UserInfo } from 'src/types/todo-list';

type TodoState = {
  teamTodoList: UserInfo[];
};

type TodoAction = {
  setTeamTodos: (teamTodoList: UserInfo[]) => void;
};

export const useTodoStore = create<TodoState & TodoAction>()((set) => ({
  teamTodoList: [],
  setTeamTodos: (teamTodoList) => set(() => ({ teamTodoList: teamTodoList }))
}));
