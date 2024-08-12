import { Layout } from '@components/todo-list/layout/Layout';
import TeamProgress from '@components/todo-list/TeamProgress';
import TodoList from '@components/todo-list/TodoList';

export const TodoListPage = () => {
  return (
    <Layout>
      <TeamProgress />
      <TodoList />
    </Layout>
  );
};
