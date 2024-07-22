import { Layout } from '@components/todo-list/layout/Layout';
import Progress from '@components/todo-list/Progress';
import TodoList from '@components/todo-list/TodoList';

export const TodoListPage = () => {
  return (
    <Layout>
      <Progress />
      <TodoList />
    </Layout>
  );
};
