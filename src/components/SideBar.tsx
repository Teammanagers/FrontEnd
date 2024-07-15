import styled from 'styled-components';
import Logo from '@assets/sidebar/logo.svg';
import Home from '@assets/sidebar/home.svg';
// import HomeClick from '@assets/sidebar/home-click.svg';
import Bell from '@assets/sidebar/bell.svg';
// import BellClick from '@assets/sidebar/bell-click.svg';
import List from '@assets/sidebar/list.svg';
// import ListClick from '@assets/sidebar/list-click.svg';
import Calendar from '@assets/sidebar/calendar.svg';
// import CalendarClick from '@assets/sidebar/calendar-click.svg';
import Memo from '@assets/sidebar/memo.svg';
// import MemoClick from '@assets/sidebar/memo-click.svg';
import File from '@assets/sidebar/file.svg';
// import FileClick from '@assets/sidebar/file-click.svg';
import Team from '@assets/sidebar/team.svg';
// import TeamClick from '@assets/sidebar/team-click.svg';
import MyPage from '@assets/sidebar/mypage.svg';
// import MyPageClick from '@assets/sidebar/mypage-click.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const SideBar = () => {
  const [hover, setHover] = useState<boolean>(false);
  const navigate = useNavigate();

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
      {/*선택되었을 때 / hover 때는 이미지 다르게 */}
      <IconContainer
        onClick={() => {
          navigate(`/`);
        }}
      >
        {/*<HomeLogo />*/}
        <Home />
        {hover && <SideBarText>홈</SideBarText>}
      </IconContainer>
      <IconContainer>
        <Bell />
        {hover && <SideBarText>알림</SideBarText>}
      </IconContainer>
      <IconContainer
        onClick={() => {
          navigate(`/todo-list`);
        }}
      >
        <List />
        {hover && <SideBarText>투두리스트</SideBarText>}
      </IconContainer>
      <IconContainer
        onClick={() => {
          navigate(`/calendar`);
        }}
      >
        <Calendar />
        {hover && <SideBarText>캘린더</SideBarText>}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/memo`);
        }}
      >
        <Memo />
        {hover && <SideBarText>메모</SideBarText>}
      </IconContainer>
      <IconContainer
        onClick={() => {
          navigate(`/share`);
        }}
      >
        <File />
        {hover && <SideBarText>자료실</SideBarText>}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/management`);
        }}
      >
        <Team />
        {hover && <SideBarText>팀 관리</SideBarText>}
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/mypage`);
        }}
      >
        <MyPage />
        {hover && <SideBarText>마이페이지</SideBarText>}
      </IconContainer>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  width: 73px;
  height: 832px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border: 1px solid red;

  &:hover {
    width: 158px;
  }
`;

const SideBarText = styled.p`
  font-size: 12px;
  // active 상태일 때는 700으로
  font-weight: 400;
  // active 상태일 때는 black
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 18px;
`;

const IconContainer = styled.div`
  width: 100%;
  height: 49px;
  // 전역상태관리로 active 상태를 받아서 active 된 부분은 배경색 및 아이콘 다르게
  background-color: ${(props) => props.theme.colors.background};
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
