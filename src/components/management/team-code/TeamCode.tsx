import styled from 'styled-components';
import Add from '@assets/management/add-icon.svg';
import Delete from '@assets/management/delete-icon.svg';
import DefaultProfileImg from '@assets/management/profile-img-default.svg';
import Upload from '@assets/management/upload-icon.svg';
import { ButtonHTMLAttributes, ChangeEvent, useRef, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useTags } from '@hooks/useTags.ts';

export const TeamCode = () => {
  const [profileImg, setProfileImg] = useState<string>(DefaultProfileImg);
  const [copyCode, setCopyCode] = useState<boolean>(false);

  const {
    tags,
    showTagInput,
    newTag,
    editTagIndex,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    handleDeleteTag,
    setShowTagInput,
    setEditTagIndex,
    setNewTag
  } = useTags();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);

      setProfileImg(imgUrl);
    }
    // 서버 API 연동시 추가 로직 필요
    console.log(file);
  };

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleCopyCode = () => {
    copy('X65VRG34'); // 추후에 생성된 팀코드 복사되도록 로직 변경 필요
    setCopyCode(true);
    setTimeout(() => setCopyCode(false), 2000);
  };

  return (
    <TeamCodeContainer>
      <ProfileContainer>
        <ProfileImg src={profileImg} onClick={handleImgClick} />
        <UploadIcon />
        <ImgUploadInput
          type="file"
          ref={fileInputRef}
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImgChange}
        />
      </ProfileContainer>

      <TextContainer>
        <TopContainer>
          <TitleBox>
            <TitleText>Title</TitleText>
            <Title>UMC 6th 팀매니저</Title>
          </TitleBox>
          <CodeContainer>
            <TeamCodeBox>
              <TitleText>Team Code</TitleText>
              <Code>X65VRG34</Code>
            </TeamCodeBox>
          </CodeContainer>
          <CopyBtn onClick={handleCopyCode} copied={copyCode}>
            팀 코드복사
          </CopyBtn>
        </TopContainer>
        {copyCode && <CopyText>코드가 복사되었습니다.</CopyText>}

        <BottomContainer>
          <TagBox>
            <TitleText>Tag</TitleText>
            <Tags>
              {tags.map((tag, index) => (
                <TagContainer
                  key={index}
                  onClick={() => startEditingTag(index)}
                >
                  {/* 태그 수정 */}
                  {editTagIndex === index ? (
                    <TagInputContainer>
                      <TagInput
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => handleEditTag(e, index)}
                        maxLength={5}
                        autoFocus
                      />
                      <DeleteBtn onClick={() => handleDeleteTag(index)} />
                    </TagInputContainer>
                  ) : (
                    <>
                      <span>{tag}</span>
                    </>
                  )}
                </TagContainer>
              ))}
              {showTagInput && editTagIndex === null && (
                <TagInputContainer>
                  {/* 태그 생성 */}
                  <TagInput
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    maxLength={5}
                    autoFocus
                  />
                  <DeleteBtn onClick={() => handleDeleteTag(-1)} />
                </TagInputContainer>
              )}
              {!showTagInput && tags.length < 3 && (
                <AddTagBtn
                  onClick={() => {
                    setShowTagInput(true);
                    setEditTagIndex(null);
                  }}
                >
                  <Add />
                </AddTagBtn>
              )}
            </Tags>
          </TagBox>
        </BottomContainer>
      </TextContainer>
    </TeamCodeContainer>
  );
};

const TeamCodeContainer = styled.div`
  width: 935px;
  height: 163px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 52px;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 163px;
  height: 163px;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 163px;
  height: 163px;
  border-radius: 38px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
`;

const UploadIcon = styled(Upload)`
  position: absolute;
  bottom: -10px;
  right: -10px;
`;

const ImgUploadInput = styled.input`
  display: none;
`;

const TextContainer = styled.div`
  width: 748px;
  height: 144px;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
`;

const Box = styled.div`
  height: 65px;
  display: flex;
  flex-direction: column;
  border-bottom: 0.76px solid ${({ theme }) => theme.colors.silver};
`;

const TitleBox = styled(Box)`
  width: 350px;
`;

export const TitleText = styled.h1`
  font-size: 15px;
  font-weight: 700;
  line-height: 22.5px;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 22.5px;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 11px;
`;

const TeamCodeBox = styled(Box)`
  width: 257px;
`;

const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CopyBtn = styled.button<{ copied: boolean }>`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  border: none;
  background: ${({ theme, copied }) =>
    copied ? theme.colors.subBlue : theme.colors.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  line-height: 36px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const CopyText = styled.p`
  margin: 0 0 0 373px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const Code = styled(Title)`
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const BottomContainer = styled.div`
  width: 630px;
  height: 72px;
  margin-top: 7px;
`;

const TagBox = styled(Box)`
  width: 630px;
`;

const Tags = styled.div`
  width: 630px;
  height: 46px;
  display: flex;
  align-items: center;
  margin-top: 3px;
  gap: 12px;
`;

export const TagContainer = styled.div`
  width: 58px;
  height: 30px;
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
  cursor: pointer;
`;

export const TagInput = styled.input`
  width: 78px;
  height: 30px;
`;

export const DeleteBtn = styled(Delete)<
  ButtonHTMLAttributes<HTMLButtonElement>
>`
  position: absolute;
  right: 3px;
  width: 23px;
  height: 23px;
`;

export const TagInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const AddTagBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
`;
