import styled from 'styled-components';
import Todos from './Todos';
import MockData from '@assets/todo-list/mock-data.json';
import { UserInfo } from 'src/types/todo-list';

const Mock = MockData as UserInfo[];

const TodoList = () => {
  return (
    <Wrapper>
      <Container>
        {Mock.map((userInfo: UserInfo) => (
          <Todos userInfo={userInfo} key={userInfo.id} />
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 942px;
  height: 562px;
  padding: 32px 0;
  background-color: white;
  box-sizing: border-box;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 36px;
  justify-items: center;
  width: 880px;
  height: 498px;
  overflow: auto;
  background-color: #ffffff;

  ul {
    all: unset;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #f0f0f0;
    border: 3px solid white;
    border-radius: 76px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

export default TodoList;
