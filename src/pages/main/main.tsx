import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Notice from '@components/main/Notice';
import NavigateBtn from '@assets/main/navigate-btn.svg';
import EventCalendar from '@components/calendar/EventCalendar';
import TodoList from '@components/todo-list/TodoList';
import { syncTodos } from '@utils/todoUtils';
import { useTodoStore } from '@store/todoStore';
import { getTeamInfo } from '@apis/main';
import { useIdStore } from '@store/idStore';

const MainPage = () => {
  const { teamId, setTeamId } = useIdStore((state) => ({
    teamId: state.teamId,
    setTeamId: state.setTeamId
  }));
  const setTeamTodos = useTodoStore((state) => state.setTeamTodos);
  const [teamCode, setTeamCode] = useState<number | null>(null);
  const [teamCodeCopy, setTeamCodeCopy] = useState<boolean>(false);

  const handleCopyClipBoard = (copyCode: string) => {
    try {
      setTeamCodeCopy(true);
      setTimeout(() => {
        setTeamCodeCopy(false);
      }, 2000);
      navigator.clipboard.writeText(copyCode);
    } catch (e) {
      alert('팀코드 복사에 실패하였습니다!');
    }
  };

  // 팀 코드 가져오기
  const fetchTeamCode = async (teamId: number) => {
    const respose = await getTeamInfo(teamId);
    setTeamCode(respose.data.result.team.teamCode);
  };

  // 팀 아이디 가져오기
  const getTeamId = () => {
    const id = localStorage.getItem('teamId');
    setTeamId(Number(id));
    if (teamId) {
      syncTodos({ teamId, setTeamTodos });
      fetchTeamCode(teamId);
    }
  };

  useEffect(() => {
    getTeamId();
  }, [teamId]);

  return (
    <Layout>
      <header>
        <Notice />
        <TeamCodeCopy>
          <strong>{teamCode}</strong>
          <button
            className={teamCodeCopy ? 'active' : 'unactive'}
            onClick={() => handleCopyClipBoard(String(teamCode))}
          >
            팀 코드복사
          </button>
          {teamCodeCopy && (
            <p className="team-code-copy-text">
              <span className="highlight">팀 코드</span>가 복사되었습니다
            </p>
          )}
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
  position: relative;
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
    cursor: pointer;
    outline: none;
  }
  .active {
    background-color: ${(props) => props.theme.colors.subBlue};
  }
  .unactive {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }

  .team-code-copy-text {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 70px;
    left: 3px;
    width: 155px;
    height: 32px;
    border-radius: 4px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
    font-size: 9px;
    font-weight: 400;
    line-height: 13.5px;
    background-color: white;
    opacity: 0;
    transform: translateY(-10px);
    animation: fadeInOut 4s ease-in-out;
  }

  .team-code-copy-text.active {
    opacity: 1;
    transform: translateY(0);
  }

  .highlight {
    color: ${(props) => props.theme.colors.mainBlue};
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
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
    width: 170px;
    margin-bottom: 12px;
    cursor: pointer;
  }

  .calendar {
    margin-right: 30px;
  }
`;
