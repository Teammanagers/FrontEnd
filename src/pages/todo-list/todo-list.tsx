import { useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';
import { getTeamTodos } from '@apis/todo-list';
import { useTodoStore } from '../../store/todoStore';
import { teamId } from '../../constant/index';

export const TodoListPage = () => {
  const progress = useTodoStore((state) => state.progress);
  const { setTeamTodos } = useTodoStore((state) => ({
    setTeamTodos: state.setTeamTodos
  }));

  // const { data: teamTodos } = useQuery({
  //   queryKey: ['teamTodos'],
  //   queryFn: () => getTeamTodos(teamId)
  // });
  // console.log(teamTodos?.data.result);

  useEffect(() => {
    const fetchTeamTodos = async () => {
      try {
        const response = await getTeamTodos(teamId);
        const data = response?.data.result;
        console.log(data);
        setTeamTodos({
          progress: data.progress,
          teamTodoList: data.teamTodoList
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamTodos();
  }, []);

  // useEffect(() => {
  //   if (teamTodos) setProgress(teamTodos?.data.result.progress);
  // }, []);

  return (
    <Layout>
      <TeamProgress progress={progress} />
      <TodoList />
    </Layout>
  );
};
