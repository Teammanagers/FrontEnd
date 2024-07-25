import styled from 'styled-components';
import Todos from './Todos';
import MockData from '@assets/todo-list/mock-data.json';
import { UserInfo } from 'src/types/todo-list';

const Mock: UserInfo[] = MockData as UserInfo[];

const TodoList = () => {
  return (
    <Container>
      {Mock.map((userInfo: UserInfo) => (
        <Todos userInfo={userInfo} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  width: 942px;
  height: 426px;
  padding: 31px 77px;
  background-color: lightgreen;
  background-color: #ffffff;

  ul {
    all: unset;
  }
`;

export default TodoList;
