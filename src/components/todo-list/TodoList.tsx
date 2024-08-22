import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Todos from './Todos';
import { useTodoStore } from '@store/todoStore';
import { UserInfo } from 'src/types/todo-list';
import { getTeamTodos } from '@apis/todo-list';
import { teamId } from '../../constant/index';
import { useIdStore } from '@store/idStore';

const TodoList = () => {
  const location = useLocation();
  const { setOwnerId, setLeaderId } = useIdStore((state) => ({
    setOwnerId: state.setOwnerId,
    setLeaderId: state.setLeaderId
  }));

  const teamTodoList = useTodoStore((state) => state.teamTodoList);

  // 사용자 아이디 및 팀장 아이디 전역 설정
  useEffect(() => {
    const setMemberId = async () => {
      const response = await getTeamTodos(teamId);
      const data = response.data.result;
      const members = data.teamTodoList.map((v: UserInfo) => v.teamManageId);

      setOwnerId(data.ownerTeamManageId);
      setLeaderId(Math.min(...members));
    };
    setMemberId();
  }, []);

  return (
    <Wrapper isTodoPage={location.pathname.startsWith('/todo-list')}>
      <Container isTodoPage={location.pathname.startsWith('/todo-list')}>
        {teamTodoList.map((userInfo: UserInfo) => (
          <Todos userInfo={userInfo} key={userInfo.teamManageId} />
        ))}
      </Container>
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

  &::-webkit-scrollbar-thumb:active {
    background-color: #5a5a5a;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

export default TodoList;
