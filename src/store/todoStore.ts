import { create } from 'zustand';
import { UserInfo } from 'src/types/todo-list';

type TodoState = {
  ownerTeamManageId: number;
  teamTodoList: UserInfo[];
};

type TodoAction = {
  setOwnerId: (ownerTeamManageId: number) => void;
  setTeamTodos: (teamTodoList: UserInfo[]) => void;
};

export const useTodoStore = create<TodoState & TodoAction>()((set) => ({
  ownerTeamManageId: 0,
  teamTodoList: [],
  setOwnerId: (ownerTeamManageId) =>
    set(() => ({ ownerTeamManageId: ownerTeamManageId })),
  setTeamTodos: (teamTodoList) => set(() => ({ teamTodoList: teamTodoList }))
}));
