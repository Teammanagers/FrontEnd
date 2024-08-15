import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Todos from './Todos';
import { UserInfo } from 'src/types/todo-list';
import MockData from '@assets/todo-list/mock-data.json';
import { createTeam, getTeam } from '@apis/test';

const Mock = MockData as UserInfo[];

const TodoList = () => {
  const location = useLocation();

  const Test = async () => {
    const response = await getTeam();
    console.log(response);
  };
  return (
    <Wrapper isTodoPage={location?.pathname.startsWith('/todo-list')}>
      <Container isTodoPage={location?.pathname.startsWith('/todo-list')}>
        {Mock.map((userInfo: UserInfo) => (
          <Todos userInfo={userInfo} key={userInfo.id} />
        ))}
      </Container>
      <button onClick={Test}>api 불러오기</button>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isTodoPage: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isTodoPage ? '942px' : '442px')};
  height: ${(props) => (props.isTodoPage ? '562px' : '505px')};
  padding: 32px 0;
  background-color: white;
  box-sizing: border-box;
`;

const Container = styled.div<{ isTodoPage: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: flex-start;
  column-gap: 24px;
  row-gap: ${(props) => (props.isTodoPage ? '36px' : '16px')};
  justify-items: center;
  width: ${(props) => (props.isTodoPage ? '820px' : '400px')};
  height: ${(props) => (props.isTodoPage ? '498px' : '468px')};
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
