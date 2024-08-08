import styled from 'styled-components';
import DefaultProfileImg from '@assets/management/profile-img-default.svg';
import Add from '@assets/management/add-icon.svg';

export const Member = () => {
  return (
    <MemberContainer>
      <ProfileImg />
      <NameContainer>
        <NameText>이름</NameText>
        <TagBox>기획자</TagBox>
        <AddBtn>
          <AddIcon />
        </AddBtn>
      </NameContainer>
    </MemberContainer>
  );
};

const MemberContainer = styled.div`
  width: 500px;
  height: 42px;
  display: flex;
  align-items: center;
  //background: lightgreen;
`;

const ProfileImg = styled(DefaultProfileImg)`
  width: 40px;
  height: 40px;
`;

const NameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0.76px solid ${({ theme }) => theme.colors.lightGray};
  margin-left: 18px;
`;

const NameText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: black; // theme color X?
  margin-right: 24px;
`;

const AboutTagBox = styled.div`
  background: white;
  border-radius: 3px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 9px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
`;

const TagBox = styled(AboutTagBox)`
  width: 37px;
  margin-right: 13px;
`;

const AddBtn = styled(AboutTagBox)`
  width: 24px;
  padding: 0;
`;

const AddIcon = styled(Add)`
  width: 19px;
  height: 19px;
`;
