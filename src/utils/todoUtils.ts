import { getTeamTodos } from '@apis/todo-list';
import { UserInfo } from 'src/types/todo-list';

interface SyncTodosProps {
  teamId: number;
  setTeamTodos: (teamTodoList: UserInfo[]) => void;
}

export const syncTodos = async ({ teamId, setTeamTodos }: SyncTodosProps) => {
  try {
    const response = await getTeamTodos(teamId);
    const data = response?.data.result;
    // 팀 투두 변동사항 업데이트
    setTeamTodos(data.teamTodoList);
  } catch (error) {
    console.error(error);
  }
};
