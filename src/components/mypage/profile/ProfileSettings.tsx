import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import Kakao from '@assets/mypage/kakao.svg';
import Naver from '@assets/mypage/naver.svg';
import Google from '@assets/mypage/google.svg';
import UserImage from '@assets/mypage/user-image.svg';
import { useTags } from '@hooks/mypage/useTags';
import { TagSection } from '@hooks/mypage/TagSection';
import { ProfileSettingsProps } from './ProfileSettingsProps';

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  name,
  setName,
  contact,
  setContact,
  major,
  setMajor,
  uploadedImage,
  setUploadedImage,
  isEditing,
  toggleEditMode,
  loginProcess,
  updateProfile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFile = useRef<File | null>(null); // 선택된 파일을 저장할 ref
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      selectedFile.current = file;
    }
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const tagsHook = useTags();

  const handleSave = async () => {
    if (isEditing) {
      try {
        const confidentRole: string[] = tagsHook.tags;

        await updateProfile(
          selectedFile.current,
          name,
          major,
          contact,
          confidentRole
        );
        toggleEditMode(); // 수정 모드를 종료
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    } else {
      toggleEditMode(); // 수정 모드 시작
    }
  };

  const renderLoginService = () => {
    switch (loginProcess) {
      case 'KAKAO':
        return (
          <>
            <Kakao />
            카카오 계정으로 로그인 중
          </>
        );
      case 'GOOGLE':
        return (
          <>
            <Google />
            구글 계정으로 로그인 중
          </>
        );
      case 'NAVER':
        return (
          <>
            <Naver />
            네이버 계정으로 로그인 중
          </>
        );
      default:
        // 기본값으로 카카오를 렌더링하도록 설정
        return (
          <>
            <Kakao />
            카카오 계정으로 로그인 중
          </>
        );
    }
  };

  return (
    <SetProfileBox>
      <ProfileHeader>
        프로필 설정
        <ModifyButton onClick={handleSave}>
          {isEditing ? '수정 완료' : '수정'}
        </ModifyButton>
      </ProfileHeader>
      <ProfileDetail>
        <SetProfile>
          <Profile>
            <ImageContainer onClick={handleImageClick} isEditing={isEditing}>
              {uploadedImage ? (
                <ProfileImage
                  src={uploadedImage}
                  alt="업로드된 프로필 이미지"
                />
              ) : (
                <UserImageWrapper>
                  <UserImage />
                </UserImageWrapper>
              )}
              <FileInput
                type="file"
                ref={fileInputRef}
                onChange={onChangeImage}
                accept="image/*"
              />
            </ImageContainer>
            <SetInfo>
              {[
                { label: '이름', value: name, setter: setName },
                { label: '연락처', value: contact, setter: setContact },
                { label: '전공', value: major, setter: setMajor }
              ].map(({ label, value, setter }) => (
                <SetField key={label}>
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    disabled={!isEditing}
                    placeholder={label}
                  />
                </SetField>
              ))}
            </SetInfo>
          </Profile>
          <SetRole isEditing={isEditing}>
            <TagSection
              title="자신있는 역할"
              useTagsHook={tagsHook}
              tagHeight="32px"
              tagFontSize="12px"
              tagBackgroundColor="white"
              tagPadding="10px 8px"
            />
          </SetRole>
        </SetProfile>
        <LoginStatus loginProcess={loginProcess}>
          {renderLoginService()}
        </LoginStatus>
      </ProfileDetail>
    </SetProfileBox>
  );
};

export default ProfileSettings;

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

const SetInfo = styled.div`
  width: 367px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const SetField = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const Input = styled.input`
  font-size: 15px;
  font-weight: 500;
  width: 90%;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
`;

const SetRole = styled.div<{ isEditing: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

// const Tag = styled.div`
//   padding: 5px 10px;
//   background-color: white;
//   border-radius: 20px;
//   font-size: 12px;
//   color: ${({ theme }) => theme.colors.black};
// `;

const LoginStatus = styled.div<{ loginProcess: string }>`
  height: 49px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
  ${({ loginProcess }) => {
    switch (loginProcess) {
      case 'KAKAO':
      default:
        return css`
          background-color: #fee500;
          color: #000000;
        `;
      case 'GOOGLE':
        return css`
          background-color: white;
          color: #1d1d1d;
          border: 1px solid #5a5a5a;
        `;
      case 'NAVER':
        return css`
          background-color: #03c75a;
          color: white;
        `;
    }
  }}
`;

const ImageContainer = styled.div<{ isEditing: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  cursor: ${({ isEditing }) => (isEditing ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const UserImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;
