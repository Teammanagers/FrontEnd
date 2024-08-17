import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';
import { getTeamTodos } from '@apis/todo-list';
import { useTodoStore } from '../../store/todoStore';
import { teamId } from '../../constant/index';

export const TodoListPage = () => {
  const { teamTodoList, setTeamTodos } = useTodoStore((state) => ({
    teamTodoList: state.teamTodoList,
    setTeamTodos: state.setTeamTodos
  }));
  const [progressValue, setProgressValue] = useState<number>(0);

  // const { data: teamTodos } = useQuery({
  //   queryKey: ['teamTodos'],
  //   queryFn: () => getTeamTodos(teamId)
  // });
  // console.log(teamTodos?.data.result);

  //투두 변동생길 때마다 리렌더링
  useEffect(() => {
    const fetchTeamTodos = async () => {
      try {
        const response = await getTeamTodos(teamId);
        const data = response?.data.result;

        setProgressValue(data?.progress);
        setTeamTodos(data.teamTodoList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeamTodos();

    const unsubscribe = useTodoStore.subscribe((state) => state.teamTodoList);

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

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
