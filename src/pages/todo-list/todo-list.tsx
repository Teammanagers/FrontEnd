import { useEffect, useState } from 'react';
import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';
import { getTeamTodos } from '@apis/todo-list';
import { teamId } from '../../constant/index';
import { useTodoStore } from '../../store/todoStore';
import { useIdStore } from '@store/idStore';
import { SetIdProps } from 'src/types/todo-list';

export const TodoListPage = () => {
  const { setTeamTodos } = useTodoStore((state) => ({
    setTeamTodos: state.setTeamTodos
  }));
  const { setOwnerId, setLeaderId } = useIdStore((state) => ({
    setOwnerId: state.setOwnerId,
    setLeaderId: state.setLeaderId
  }));
  const [progressValue, setProgressValue] = useState<number>(0);

  //투두 변동생길 때마다 렌더링
  useEffect(() => {
    const setId = (data: SetIdProps) => {
      // 사용자 아이디 및 팀장 아이디 전역 설정
      setOwnerId(data.ownerTeamManageId);
      setLeaderId(data.teamTodoList[0].teamManageId);
    };

    const fetchTeamTodos = async () => {
      try {
        const response = await getTeamTodos(teamId);
        const data = response?.data.result;
        setId(data);
        setProgressValue(data?.progress);

        setTeamTodos(data.teamTodoList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeamTodos();
  }, [setTeamTodos]);

  return (
    <Layout>
      <TeamProgress progressValue={progressValue} />
      <TodoList />
    </Layout>
  );
};
