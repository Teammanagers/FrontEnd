import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Back from '@assets/mypage/back.svg';
import WrongUser from '@assets/mypage/wrong-user.svg';
import { useNavigate } from 'react-router-dom';
import { QuitModal } from '@components/mypage/QuitModal';
import ProfileSettings from '@components/mypage/profile/ProfileSettings';
import TeamComments from '@components/mypage/profile/TeamComments';
import { getProfile, updateProfile } from '@apis/mypage';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isHiddenArray, setIsHiddenArray] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [loginProcess, setLoginProcess] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        console.log('Profile Data:', profileData);
        if (profileData.result) {
          setName(profileData.result.name);
          setContact(profileData.result.phoneNumber);
          setMajor(profileData.result.belong);
          setLoginProcess(profileData.result.loginProcess);
          setUploadedImage(profileData.result.imageUrl);
          console.log(profileData.result);
        } else {
          console.error('Profile data is missing the "result" field');
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const toggleHidden = (index: number) => {
    setIsHiddenArray((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const openQuitModal = () => setIsQuitModalOpen(true);
  const closeQuitModal = () => setIsQuitModalOpen(false);
  const toggleEditMode = () => setIsEditing((prev) => !prev);

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
          {/* 프로필 수정 */}
          <ProfileSettings
            name={name}
            setName={setName}
            contact={contact}
            setContact={setContact}
            major={major}
            setMajor={setMajor}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            isEditing={isEditing}
            toggleEditMode={toggleEditMode}
            loginProcess={loginProcess}
            updateProfile={updateProfile}
          />
          {/* 팀원들의 한마디 */}
          <TeamComments
            isHiddenArray={isHiddenArray}
            toggleHidden={toggleHidden}
          />
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
