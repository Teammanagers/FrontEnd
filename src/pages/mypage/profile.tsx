import { useState } from 'react';
import styled from 'styled-components';
import FirstPage from '@assets/mypage/first-page.svg';
import Back from '@assets/mypage/back.svg';
import Move from '@assets/mypage/move.svg';
import Kakao from '@assets/mypage/kakao.svg';
import WrongUser from '@assets/mypage/wrong-user.svg';
import { AvatarImage } from '@components/mypage/Avatar';
import { useNavigate } from 'react-router-dom';
import { QuitModal } from '@components/mypage/QuitModal';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false);

  const toggleHidden = () => setIsHidden(!isHidden);
  const openQuitModal = () => setIsQuitModalOpen(true);
  const closeQuitModal = () => setIsQuitModalOpen(false);

  return (
    <ProfileContainer>
      <ContentContainer>
        <HeaderContainer>
          <IconContainer onClick={() => navigate(`/mypage`)}>
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
                    <AvatarImage />
                  </SetImage>
                  <SetInfo>
                    {['name', 'contact', 'major'].map((placeholder, index) => (
                      <SetField key={index}>
                        <Input
                          type="text"
                          placeholder={`${placeholder}을 입력하세요`}
                        />
                      </SetField>
                    ))}
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
              {[...Array(5)].map((_, index) => (
                <Comment key={index}>
                  <ToggleText isHidden={isHidden}>
                    PPT를 잘 만들어요!
                  </ToggleText>
                  <ToggleButton isHidden={isHidden} onClick={toggleHidden}>
                    {isHidden ? '해제' : '숨기기'}
                  </ToggleButton>
                </Comment>
              ))}
            </CommentContainer>
          </CommentBox>
        </MainContent>
        <QuitContainer>
          <QuitButton onClick={openQuitModal}>
            <WrongUser />
            탈퇴하기
          </QuitButton>
        </QuitContainer>
        <QuitModal isOpen={isQuitModalOpen} onClose={closeQuitModal} />
      </ContentContainer>
    </ProfileContainer>
  );
};

interface ToggleProps {
  isHidden: boolean;
}

const ToggleButton = styled.button<ToggleProps>`
  width: 96px;
  height: 36px;
  background-color: ${({ isHidden, theme }) =>
    isHidden ? 'white' : theme.colors.mainBlue};
  color: ${({ isHidden, theme }) =>
    isHidden ? theme.colors.mainBlue : 'white'};
  border: ${({ isHidden, theme }) =>
    isHidden ? `1px solid ${theme.colors.mainBlue}` : 'none'};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const ToggleText = styled.div<ToggleProps>`
  width: 444px;
  border-radius: 4px;
  background-color: ${({ isHidden }) => (isHidden ? '#D3D3D3' : 'white')};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ isHidden, theme }) =>
    isHidden ? theme.colors.lightGray : theme.colors.black};
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
`;

const ProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 92px 0 0 125px;
`;

const HeaderContainer = styled.div`
  width: 300px;
  display: flex;
  gap: 60px;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 37px;
  height: 37px;
  cursor: pointer;
`;

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 1123px;
  gap: 35px;
  margin-top: 30px;
`;

const SetProfileBox = styled.div`
  width: 536px;
`;

const ProfileHeader = styled.h1`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModifyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.mainBlue};
  cursor: pointer;
  width: 70px;
  height: 37px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  border: none;
  color: white;
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const SetProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const Profile = styled.div`
  display: flex;
  gap: 19px;
`;

const SetImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  cursor: pointer;
`;

const SetInfo = styled.div`
  width: 367px;
  height: 155px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const SetField = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding: 8px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const Input = styled.input`
  width: 90%;
  height: 23px;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
`;

const SetRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const RoleHeader = styled.h1`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const RoleTag = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
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
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentHeader = styled.h1`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
`;

const SeeMore = styled.div`
  display: flex;
  gap: 6px;
  width: 70px;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuitContainer = styled.div`
  padding-top: 63px;
  padding-left: 880px;
`;

const QuitButton = styled.button`
  width: 216px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.red};
  background-color: white;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
`;
