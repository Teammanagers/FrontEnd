import styled from 'styled-components';
import Move from '@assets/mypage/move.svg';
import Profile from '@assets/mypage/profile.svg';
import Portfolio from '@assets/mypage/portfolio.svg';
import Headset from '@assets/mypage/headset.svg';
import Speaker from '@assets/mypage/speaker.svg';
import Exclamation from '@assets/mypage/exclamation.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyTodos } from '@apis/todo-list';
import { MyTodoList } from 'src/types/todo-list';
import MyTodos from '@components/todo-list/MyTodos';

export const MyPage = () => {
  const navigate = useNavigate();
  const [myTodos, setMyTodos] = useState<MyTodoList[]>([]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // 내 투두리스트
  useEffect(() => {
    const fetchMyTodos = async () => {
      const response = await getMyTodos();
      setMyTodos(response.data.result.myTodoListDtos);
    };
    fetchMyTodos();
  }, []);

  return (
    <MyPageContainer>
      <ContentContainer>
        <Header>
          <Title>마이 페이지</Title>
        </Header>
        <SubHeader>
          <SubTitle>나의 투두리스트</SubTitle>
          <IconContainer
            onClick={() => {
              handleNavigate('/todo-list');
            }}
          >
            <Move />
          </IconContainer>
        </SubHeader>
        <MainContent>
          <TodoListContainer>
            <Wrapper>
              {myTodos.map((myTodos: MyTodoList, index) => (
                <MyTodos myTodos={myTodos} key={index} />
              ))}
            </Wrapper>
          </TodoListContainer>
          <MenuContainer>
            <MenuItem
              id="profile"
              onClick={() => {
                handleNavigate('/mypage/profile');
              }}
            >
              <Profile />
              프로필 수정
              <MoveIcon />
            </MenuItem>
            <MenuItem
              id="portfolio"
              onClick={() => {
                handleNavigate('/mypage/portfolio');
              }}
            >
              <Portfolio />
              포트폴리오
              <MoveIcon />
            </MenuItem>
            <MenuItem id="ask">
              <Headset />
              문의하기
              <MoveIcon />
            </MenuItem>
            <MenuItem id="notice">
              <Speaker />
              공지사항
              <MoveIcon />
            </MenuItem>
            <MenuItem id="terms">
              <Exclamation />
              이용약관 및 개인정보처리방침
              <MoveIcon />
            </MenuItem>
          </MenuContainer>
        </MainContent>
      </ContentContainer>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentContainer = styled.div`
  flex: 1;
  padding-top: 90px;
  padding-left: 186px;
`;
const Header = styled.div`
  width: 442px;
  height: 32px;
  top: 90px;
  margin-bottom: 50px;
`;
const Title = styled.h1`
  font-size: 21px;
  line-height: 32px;
  font-weight: bold;
`;
const SubHeader = styled.div`
  width: 171px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 18.24px;
  margin-bottom: 19px;
`;
const SubTitle = styled.h2`
  font-size: 18.24px;
  font-weight: 700;
  line-height: 27.36px;
`;
const IconContainer = styled.div`
  width: 30.4px;
  height: 30.4px;
  cursor: pointer;
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 907px;
`;
const TodoListContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 442px;
  height: 328px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.subLightBlue};
  border-radius: 9px;
  padding: 19px 0;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 407px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 12px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #f0f0f0;
    border: 2px solid white;
    border-radius: 76px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const MenuContainer = styled.div`
  width: 442px;
  height: 328px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 23px;
`;
const MenuItem = styled.div`
  width: 100%;
  height: 49px;
  border: 0.76px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 3.04px;
  padding: 0px 9.12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12.16px;
  background-color: white;
`;
const MoveIcon = styled(Move)`
  margin-left: auto;
  cursor: pointer;
`;
