import { useState } from 'react';
import styled from 'styled-components';
import FirstPage from '@assets/mypage/first-page.svg';
import Back from '@assets/mypage/back.svg';
import Move from '@assets/mypage/move.svg';
import Kakao from '@assets/mypage/kakao.svg';
import WrongUser from '@assets/mypage/wrong-user.svg';
import UserImage from '@assets/mypage/user-image.svg';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <ProfileContainer>
      <ContentContainer>
        <HeaderContainer>
          <IconContainer
            onClick={() => {
              handleNavigate(`/mypage`);
            }}
          >
            <Back />
          </IconContainer>
          <HeaderText>프로필 수정</HeaderText>
        </HeaderContainer>

        <MainContent>
          <SetProfileBox>
            <ProfileHeader>
              프로필 설정
              <ModifyButton>수정</ModifyButton>
            </ProfileHeader>
            <ProfileDetail>
              <SetProfile>
                <Profile>
                  <SetImage>
                    <UserImage />
                  </SetImage>
                  <SetInfo>
                    <SetField>
                      <Input
                        type="text"
                        name="name"
                        placeholder="이름을 입력하세요"
                      />
                    </SetField>
                    <SetField>
                      <Input
                        type="text"
                        name="contact"
                        placeholder="연락처를 입력하세요"
                      />
                    </SetField>
                    <SetField>
                      <Input
                        type="text"
                        name="major"
                        placeholder="전공을 입력하세요"
                      />
                    </SetField>
                  </SetInfo>
                </Profile>
                <SetRole>
                  <RoleHeader>자신있는 역할</RoleHeader>
                  <RoleTag>태그</RoleTag>
                </SetRole>
              </SetProfile>
              <LoginStatus>
                <Kakao />
                카카오 계정으로 로그인 중
              </LoginStatus>
            </ProfileDetail>
          </SetProfileBox>
          <CommentBox>
            <CommentHeader>
              최근 팀원들의 한마디
              <SeeMore>
                <FirstPage />
                <Move />
              </SeeMore>
            </CommentHeader>
            <CommentContainer>
              <Comment>
                <ToggleText isHidden={isHidden}>PPT를 잘 만들어요!</ToggleText>
                <ToggleButton isHidden={isHidden} onClick={toggleHidden}>
                  {isHidden ? '해제' : '숨기기'}
                </ToggleButton>
              </Comment>
              <Comment>
                <ToggleText isHidden={isHidden}>PPT를 잘 만들어요!</ToggleText>
                <ToggleButton isHidden={isHidden} onClick={toggleHidden}>
                  {isHidden ? '해제' : '숨기기'}
                </ToggleButton>
              </Comment>
              <Comment>
                <ToggleText isHidden={isHidden}>PPT를 잘 만들어요!</ToggleText>
                <ToggleButton isHidden={isHidden} onClick={toggleHidden}>
                  {isHidden ? '해제' : '숨기기'}
                </ToggleButton>
              </Comment>
              <Comment>
                <ToggleText isHidden={isHidden}>PPT를 잘 만들어요!</ToggleText>
                <ToggleButton isHidden={isHidden} onClick={toggleHidden}>
                  {isHidden ? '해제' : '숨기기'}
                </ToggleButton>
              </Comment>
              <Comment>
                <ToggleText isHidden={isHidden}>PPT를 잘 만들어요!</ToggleText>
                <ToggleButton isHidden={isHidden} onClick={toggleHidden}>
                  {isHidden ? '해제' : '숨기기'}
                </ToggleButton>
              </Comment>
            </CommentContainer>
          </CommentBox>
        </MainContent>
        <QuitContainer>
          <QuitButton>
            <WrongUser />
            탈퇴하기
          </QuitButton>
        </QuitContainer>
      </ContentContainer>
    </ProfileContainer>
  );
};

const ToggleButton = styled(Button)<{ isHidden: boolean }>`
  width: 96px;
  height: 36px;
  background-color: ${(props) =>
    props.isHidden ? 'white' : props.theme.colors.mainBlue};
  color: ${(props) => (props.isHidden ? props.theme.colors.mainBlue : 'white')};
  border: ${(props) =>
    props.isHidden ? `1px solid ${props.theme.colors.mainBlue}` : 'none'};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const ToggleText = styled.div<{ isHidden: boolean }>`
  width: 444px;
  border-radius: 4px;
  background-color: ${(props) => (props.isHidden ? '#D3D3D3' : 'white')};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  color: ${(props) =>
    props.isHidden ? props.theme.colors.lightGray : props.theme.colors.black};
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
`;

const ProfileContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-top: 92px;
  padding-left: 125px;
`;

const HeaderContainer = styled.div`
  width: 300px;
  gap: 60px;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 37px;
  height: 37px;
  cursor: pointer;
`;

const HeaderText = styled.h1`
  width: 117px;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 1123px;
  height: 381px;
  gap: 35px;
  margin-top: 30px;
`;

const SetProfileBox = styled.div`
  width: 536px;
`;

const ProfileHeader = styled.h1`
  font-size: 18px;
  width: 536px;
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModifyButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.mainBlue};
  cursor: pointer;
  width: 70px;
  height: 37px;
  padding: 8px 13px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  border: none;
`;

const ProfileDetail = styled.div`
  width: 536px;
  height: 319px;
  gap: 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SetProfile = styled.div`
  height: 247px;
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const Profile = styled.div`
  height: 155px;
  display: flex;
  flex-direction: row;
  gap: 19px;
`;

const SetImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 228px;
  border: none;
  cursor: pointer;
`;

const SetInfo = styled.div`
  width: 367px;
  gap: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SetField = styled.div`
  height: 39px;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 0px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.silver};
`;

const Input = styled.input`
  width: 90%;
  height: 23px;
  border: none;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.black};
`;

const SetRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  height: 73px;
`;

const RoleHeader = styled.h1`
  height: 18px;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const RoleTag = styled.div`
  height: 48px;
  border-bottom: 1px solid ${(props) => props.theme.colors.silver};
`;

const LoginStatus = styled.div`
  height: 49px;
  background-color: #fee500;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
`;

const CommentBox = styled.div`
  width: 552px;
  height: 381px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentHeader = styled.h1`
  font-size: 18px;
  font-weight: 700;
  height: 27px;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const SeeMore = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  width: 70px;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  height: 325px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Comment = styled.div`
  height: 49px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const QuitContainer = styled.div`
  width: 216px;
  display: flex;
  padding-top: 63px;
  padding-left: 880px;
`;
const QuitButton = styled(Button)`
  width: 100%;
  height: 48px;
  border: 1px solid ${(props) => props.theme.colors.red};
  background-color: white;
  color: ${(props) => props.theme.colors.red};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 0;
  border-radius: 8px;
  cursor: pointer;
`;
