import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';
import { getTeamTodos } from '@apis/todo-list';
import { useTodoStore } from '../../store/todoStore';
import { teamId } from '../../constant/index';

export const TodoListPage = () => {
  const { setOwnerId, setTeamTodos } = useTodoStore((state) => ({
    setOwnerId: state.setOwnerId,
    setTeamTodos: state.setTeamTodos
  }));
  const [progressValue, setProgressValue] = useState<number>(0);
  // const { data: teamTodos } = useQuery({
  //   queryKey: ['teamTodos'],
  //   queryFn: () => getTeamTodos(teamId)
  // });
  // console.log(teamTodos?.data.result);

  //투두 변동생길 때마다 렌더링
  useEffect(() => {
    const fetchTeamTodos = async () => {
      try {
        const response = await getTeamTodos(teamId);
        const data = response?.data.result;
        setProgressValue(data?.progress);
        setOwnerId(data.ownerTeamManageId);
        setTeamTodos(data.teamTodoList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeamTodos();
  }, [setTeamTodos]);

  // useEffect(() => {
  //   if (teamTodos) setProgress(teamTodos?.data.result.progress);
  // }, []);

  return (
    <Layout>
      <TeamProgress progressValue={progressValue} />
      <TodoList />
    </Layout>
  );
};
