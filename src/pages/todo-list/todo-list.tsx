import { useEffect, useState } from 'react';
import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';
import { getTeamTodos } from '@apis/todo-list';
import { teamId } from '../../constant/index';
import { useTodoStore } from '../../store/todoStore';

export const TodoListPage = () => {
  const { setTeamTodos } = useTodoStore((state) => ({
    setTeamTodos: state.setTeamTodos
  }));
  const [progressValue, setProgressValue] = useState<number>(0);

  //투두 변동생길 때마다 렌더링
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
  }, [setTeamTodos]);

  return (
    <Layout>
      <TeamProgress progressValue={progressValue} />
      <TodoList />
    </Layout>
  );
};
