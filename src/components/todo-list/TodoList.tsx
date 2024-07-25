import styled from 'styled-components';
import Todos from './Todos';
import MockData from '@assets/todo-list/mock-data.json';

interface UserInfo {
  id: number;
  username: string;
  tags: string[];
}

const Mock: UserInfo[] = MockData as UserInfo[];

const TodoList = () => {
  return (
    <Container>
      <ul>
        {Mock.map((userInfo: UserInfo) => (
          <Todos userInfo={userInfo} />
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 942px;
  height: 426px;
  padding: 31px 77px;
  background-color: lightgreen;
  background-color: #ffffff;
`;

export default TodoList;
