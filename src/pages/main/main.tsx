import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Notice from '@components/main/Notice';
import NavigateBtn from '@assets/main/navigate-btn.svg';
import EventCalendar from '@components/calendar/EventCalendar';
import TodoList from '@components/todo-list/TodoList';
import { syncTodos } from '@utils/todoUtils';
import { teamId } from '../../constant/index';
import { useTodoStore } from '@store/todoStore';
import { useIdStore } from '@store/idStore';
import { getTeamTodos } from '@apis/todo-list';
import { UserInfo } from 'src/types/todo-list';

const MainPage = () => {
  const { setOwnerId, setLeaderId } = useIdStore((state) => ({
    setOwnerId: state.setOwnerId,
    setLeaderId: state.setLeaderId
  }));
  const setTeamTodos = useTodoStore((state) => state.setTeamTodos);

  const handleCopyClipBoard = (copyCode: string) => {
    try {
      navigator.clipboard.writeText(copyCode);
    } catch (e) {
      alert('팀코드 복사에 실패하였습니다!');
    }
  };

  // 사용자 아이디 및 팀장 아이디 전역 설정
  const setMemberId = async () => {
    const response = await getTeamTodos(teamId);
    const data = response.data.result;
    const members = data.teamTodoList.map((v: UserInfo) => v.teamManageId);

    setOwnerId(data.ownerTeamManageId);
    setLeaderId(Math.min(...members));
  };

  useEffect(() => {
    setMemberId();
    syncTodos({ teamId, setTeamTodos });
  }, []);

  return (
    <Layout>
      <header>
        <Notice />
        <TeamCodeCopy>
          <strong>X65VRG34</strong>
          <button onClick={() => handleCopyClipBoard('X65VRG34')}>
            팀 코드복사
          </button>
        </TeamCodeCopy>
      </header>

      <Main>
        <div className="calendar">
          <Link to={'/calendar'}>
            <h2>캘린더 </h2>
            <NavigateBtn />
          </Link>
          <EventCalendar />
        </div>
        <div className="todo-list">
          <Link to={'/todo-list'}>
            <h2>투두리스트</h2>
            <NavigateBtn />
          </Link>
          <TodoList />
        </div>
      </Main>
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 36px 0 0 119px;
  background-color: #f9fbff;
  box-sizing: border-box;

  header {
    display: flex;
    margin-bottom: 24px;
  }
`;

const TeamCodeCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 163px;
  height: 73px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.subLightBlue};

  strong {
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    color: ${(props) => props.theme.colors.mainBlue};
  }

  button {
    width: 69px;
    height: 24px;
    border: none;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    line-height: 13.5px;
    color: white;
    background-color: ${(props) => props.theme.colors.mainBlue};
    cursor: pointer;
    outline: none;

    &:active {
      background-color: ${(props) => props.theme.colors.subBlue};
    }
  }
`;

const Main = styled.div`
  display: flex;

  a,
  h2 {
    all: unset;
  }

  h2 {
    margin-right: 12px;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    color: #1d1d1d;
  }

  a {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    cursor: pointer;
  }

  .calendar {
    margin-right: 30px;
  }
`;
