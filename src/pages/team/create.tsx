import styled from 'styled-components';
import TeamContainer from '@components/team/TeamContainer';
import RegisterProfile from '@assets/team/register-profile.svg';
import { TagInputSection } from '@components/team/TagInputSection';
import { useTagInput } from '@hooks/useTagInput';
import { useState } from 'react';
import { useCreateTeam } from '@hooks/team/useCreateTeam';

export const CreateTeamPage = () => {
  const [title, setTitle] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const tagInput = useTagInput();

  // useCreateTeam 훅 사용
  const createTeamMutation = useCreateTeam();

  const isFormValid =
    title.trim() !== '' && tagInput.tags.length > 0 && profileImage !== null;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg')
    ) {
      setProfileImage(file);
    } else {
      alert('PNG, JPG, JPEG 파일만 업로드 가능합니다.');
    }
  };

  const profileImageUrl = profileImage
    ? URL.createObjectURL(profileImage)
    : RegisterProfile;

  const handleCreateTeam = () => {
    if (isFormValid) {
      createTeamMutation.mutate({
        title,
        teamTagList: tagInput.tags,
        imageFile: profileImage
      });
    }
  };

  return (
    <TeamContainer>
      <TeamIndexContainer>
        <SelectTeamComponent>
          <TeamLogoComponent
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            {profileImage ? (
              <ProfileImage src={profileImageUrl} alt="Profile" />
            ) : (
              <RegisterProfile />
            )}
            <HiddenFileInput
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
          </TeamLogoComponent>
          <TeamInfoComponent>
            <TitleInputWrapper>
              <TitleInputDiv>
                <TitleLabel>Title</TitleLabel>
                <TitleInput
                  placeholder="팀명 또는 프로젝트를 입력해 주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={20}
                />
              </TitleInputDiv>
              <TagInputSection {...tagInput} />
            </TitleInputWrapper>
            <SubmitButton isFormValid={isFormValid} onClick={handleCreateTeam}>
              팀 생성 완료
            </SubmitButton>
          </TeamInfoComponent>
        </SelectTeamComponent>
      </TeamIndexContainer>
    </TeamContainer>
  );
};

// 스타일 컴포넌트 정의
const TeamIndexContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 23px;
`;

const SelectTeamComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 76px;
  width: 163px;
  padding: 0px 47px;
`;

const TeamLogoComponent = styled.div`
  width: 163px;
  height: 163px;
  cursor: pointer; // 클릭 가능하게 커서 변경
  position: relative; // 자식 요소의 절대 위치를 위한 설정
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TeamInfoComponent = styled.div`
  width: 536px;
  height: 283px;
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

const TitleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 37px;
  width: 100%;
  max-width: 536px;
`;

const TitleInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleLabel = styled.span`
  font-size: 15px;
  line-height: 23px;
  font-weight: 500;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 13px 18px;
  height: 49px;
  font-size: 18px;
  line-height: 23px;
  font-weight: 500;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 6px;
  background-color: white;
  color: #1d1d1d;
`;

const SubmitButton = styled.button<{ isFormValid: boolean }>`
  margin-top: 49px;
  width: 536px;
  height: 48px;
  border-radius: 4px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background-color: ${(props) => (props.isFormValid ? '#5C9EFF' : '#cccccc')};
  cursor: ${(props) => (props.isFormValid ? 'pointer' : 'default')};
`;

export default CreateTeamPage;
