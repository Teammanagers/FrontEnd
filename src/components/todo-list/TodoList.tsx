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
  row-gap: 36px;
  justify-items: center;
  width: 942px;
  height: 426px;
  padding: 31px 77px;
  overflow: auto;
  background-color: #ffffff;

  &::-webkit-scrollbar {
    width: 9px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f0f0f0;
    border-radius: 76px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }

  ul {
    all: unset;
  }
`;

export default TodoList;
