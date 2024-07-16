import styled from 'styled-components';
import Logo from '@assets/sidebar/logo.svg';
import Home from '@assets/sidebar/home.svg';
import HomeClick from '@assets/sidebar/home-click.svg';
import Bell from '@assets/sidebar/bell.svg';
import BellClick from '@assets/sidebar/bell-click.svg';
import List from '@assets/sidebar/list.svg';
import ListClick from '@assets/sidebar/list-click.svg';
import Calendar from '@assets/sidebar/calendar.svg';
import CalendarClick from '@assets/sidebar/calendar-click.svg';
import Memo from '@assets/sidebar/memo.svg';
import MemoClick from '@assets/sidebar/memo-click.svg';
import File from '@assets/sidebar/file.svg';
import FileClick from '@assets/sidebar/file-click.svg';
import Team from '@assets/sidebar/team.svg';
import TeamClick from '@assets/sidebar/team-click.svg';
import MyPage from '@assets/sidebar/mypage.svg';
import MyPageClick from '@assets/sidebar/mypage-click.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const SideBar = () => {
  const [hover, setHover] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  console.log(location);

  return (
    <SideBarContainer
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <LogoImg />
      <Hr style={{ margin: '12px 0 18px 0' }} />
      <IconContainer
        onClick={() => {
          handleNavigate(`/`);
        }}
        selected={isActive(`/`)}
      >
        {isActive(`/`) ? <HomeClick /> : <Home />}
        {hover && <SideBarText selected={isActive(`/`)}>홈</SideBarText>}
      </IconContainer>
      {/*  현재 알림페이지가 없다... 일단 일시적으로 홈으로 라우팅 */}
      <IconContainer
        onClick={() => {
          handleNavigate(`/`);
        }}
        selected={isActive(`/`)}
      >
        {isActive(`/`) ? <BellClick /> : <Bell />}
        {hover && <SideBarText selected={isActive(`/`)}>알림</SideBarText>}
      </IconContainer>
      <IconContainer
        onClick={() => {
          handleNavigate(`/todo-list`);
        }}
        selected={isActive(`/todo-list`)}
      >
        {isActive(`/todo-list`) ? <ListClick /> : <List />}
        {hover && (
          <SideBarText selected={isActive(`/todo-list`)}>
            투두리스트
          </SideBarText>
        )}
      </IconContainer>
      <IconContainer
        onClick={() => {
          handleNavigate(`/calendar`);
        }}
        selected={isActive(`/calendar`)}
      >
        {isActive(`/calendar`) ? <CalendarClick /> : <Calendar />}
        {hover && (
          <SideBarText selected={isActive(`/calendar`)}>캘린더</SideBarText>
        )}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/memo`);
        }}
        selected={isActive(`/memo`)}
      >
        {isActive(`/memo`) ? <MemoClick /> : <Memo />}
        {hover && <SideBarText selected={isActive(`/memo`)}>메모</SideBarText>}
      </IconContainer>
      <IconContainer
        onClick={() => {
          handleNavigate(`/share`);
        }}
        selected={isActive(`/share`)}
      >
        {isActive(`/share`) ? <FileClick /> : <File />}
        {hover && (
          <SideBarText selected={isActive(`/share`)}>자료실</SideBarText>
        )}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          handleNavigate(`/management`);
        }}
        selected={isActive(`/management`)}
      >
        {isActive(`/management`) ? <TeamClick /> : <Team />}
        {hover && (
          <SideBarText selected={isActive(`/management`)}>팀 관리</SideBarText>
        )}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          handleNavigate(`/mypage`);
        }}
        selected={isActive(`/mypage`)}
      >
        {isActive(`/mypage`) ? <MyPageClick /> : <MyPage />}
        {hover && (
          <SideBarText selected={isActive(`/mypage`)}>마이페이지</SideBarText>
        )}
      </IconContainer>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 73px;
  height: 832px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: width 0.3s ease; // 화면 효과 부드럽게 전환

  &:hover {
    width: 158px;
  }
`;

interface SelectedProps {
  selected: boolean;
}

const SideBarText = styled.p<SelectedProps>`
  font-size: 12px;
  font-weight: ${(isActive) => (isActive ? 700 : 400)};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.darkGray};
  margin-left: 18px;
  white-space: nowrap;
  overflow: hidden;
`;

const IconContainer = styled.div<SelectedProps>`
  width: 100%;
  height: 49px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.background : 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled(Logo)`
  width: 37px;
  height: 37px;
  margin-top: 47px;
`;

const Hr = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.colors.subLightBlue};
  margin: 18px 0 18px 0;
`;
