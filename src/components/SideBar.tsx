import styled from 'styled-components';
import Logo from '@assets/sidebar/logo.svg';
import Home from '@assets/sidebar/home.svg';
import Bell from '@assets/sidebar/bell.svg';
import List from '@assets/sidebar/list.svg';
import Calendar from '@assets/sidebar/calendar.svg';
import Memo from '@assets/sidebar/memo.svg';
import File from '@assets/sidebar/file.svg';
import Team from '@assets/sidebar/team.svg';
import Mypage from '@assets/sidebar/mypage.svg';
import { useNavigate } from 'react-router-dom';
export const SideBar = () => {
  const navigate = useNavigate();

  return (
    <SideBarContainer>
      <LogoImg />
      <Hr style={{ margin: '12px 0 18px 0' }} />
      {/*선택되었을 때 / hover 때는 이미지 다르게 */}
      <IconContainer
        onClick={() => {
          navigate(`/`);
        }}
      >
        <HomeLogo />
      </IconContainer>
      <IconContainer>
        <BellLogo />
      </IconContainer>
      <IconContainer
        onClick={() => {
          navigate(`/todo-list`);
        }}
      >
        <ListLogo />
      </IconContainer>
      <IconContainer
        onClick={() => {
          navigate(`/calendar`);
        }}
      >
        <CalendarLogo />
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/memo`);
        }}
      >
        <MemoLogo />
      </IconContainer>
      <IconContainer
        onClick={() => {
          navigate(`/share`);
        }}
      >
        <FileLogo />
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/management`);
        }}
      >
        <TeamLogo />
      </IconContainer>
      <Hr />
      <IconContainer
        onClick={() => {
          navigate(`/mypage`);
        }}
      >
        <MypageLogo />
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

const IconContainer = styled.div`
  width: 100%;
  height: 49px;
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

const HomeLogo = styled(Home)`
  width: 36px;
  height: 36px;
`;

const BellLogo = styled(Bell)`
  width: 36px;
  height: 36px;
`;

const CalendarLogo = styled(Calendar)`
  width: 36px;
  height: 36px;
`;

const ListLogo = styled(List)`
  width: 36px;
  height: 36px;
`;

const MemoLogo = styled(Memo)`
  width: 36px;
  height: 36px;
`;

const FileLogo = styled(File)`
  width: 36px;
  height: 36px;
`;

const TeamLogo = styled(Team)`
  width: 36px;
  height: 36px;
`;

const MypageLogo = styled(Mypage)`
  width: 36px;
  height: 36px;
`;
