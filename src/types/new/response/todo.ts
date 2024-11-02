import { ITodoList } from '@/types/new/common';

export interface getTodoResponse {
  ownerTeamManageId: number;
  teamTodoList: ITodoList; // 팀 전체 투두리스트
  progress: number; // 진행도
}
