import styled from 'styled-components';
import Add from '@assets/management/add-icon.svg';
import DefaultProfileImg from '@assets/management/profile-img-default.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const TeamCode = () => {
  const [profileImg, setProfileImg] = useState<string>(DefaultProfileImg);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setProfileImg(imgUrl);
    }
    console.log(file);
  };

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    console.log('현재이미지:', profileImg);
    console.log(fileInputRef);
  }, [profileImg, fileInputRef]);

  return (
    <TeamCodeContainer>
      <ProfileImg src={profileImg} onClick={handleImgClick} />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleImgChange}
      />
      <TextContainer>
        <TopContainer>
          <TitleBox>
            <TitleText>Title</TitleText>
            <Title>UMC 6th 팀매니저</Title>
          </TitleBox>
          <TeamCodeBox>
            <TitleText>Team Code</TitleText>
            <Code>X65VRG34</Code>
          </TeamCodeBox>
          {/* 팀 코드 복사하면 버튼 색깔 바뀜 */}
          <CopyBtn>팀 코드복사</CopyBtn>
        </TopContainer>
        <BottomContainer>
          <TagBox>
            <TitleText>Tag</TitleText>
            <Tags>
              <TagContainer>기획자</TagContainer>
              <TagContainer>기획자</TagContainer>
              <AddTagBtn>
                <Add />
              </AddTagBtn>
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
  //background: lightpink;
`;

const ProfileImg = styled.img`
  width: 163px;
  height: 163px;
  border-radius: 38px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  cursor: pointer;
`;

const TextContainer = styled.div`
  width: 748px;
  height: 144px;
  //background: mediumvioletred;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  //background: gold;
`;

const Box = styled.div`
  height: 65px;
  display: flex;
  flex-direction: column;
  //background: lightgreen;
  border-bottom: 0.76px solid ${({ theme }) => theme.colors.silver};
`;

const TitleBox = styled(Box)`
  width: 350px;
`;

const TitleText = styled.h1`
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

const CopyBtn = styled.button`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  border: none;
  background: ${({ theme }) => theme.colors.mainBlue};
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

const Code = styled(Title)`
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const BottomContainer = styled.div`
  width: 630px;
  height: 72px;
  margin-top: 7px;
  //background: mediumpurple;
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
  //background: forestgreen;
`;

const TagContainer = styled.div`
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
