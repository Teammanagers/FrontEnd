import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';
import { getTeamTodos } from '@apis/todo-list';
import { teamId } from '../../constant/index';

export const TodoListPage = () => {
  const [progress, setProgress] = useState<number>(0);

  const { data: teamTodos } = useQuery({
    queryKey: ['teamTodos'],
    queryFn: () => getTeamTodos(teamId)
  });
  console.log(teamTodos?.data.result);

  useEffect(() => {
    if (teamTodos) setProgress(teamTodos?.data.result.progress);
  }, []);

  return (
    <Layout>
      <TeamProgress progress={progress} />
      <TodoList />
    </Layout>
  );
};
