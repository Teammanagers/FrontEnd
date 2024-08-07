import styled from 'styled-components';
import Profile from '@assets/management/default-profile.svg';

export const CommentInputBox = () => {
  return (
    <CommentBox>
      <ProfileContainer>
        <Profile />
        <Name>이름</Name>
        <TagBox>
          <TagPart>역할</TagPart>
        </TagBox>
      </ProfileContainer>
      <CommentInput />
    </CommentBox>
  );
};

const CommentBox = styled.div`
  width: 536px;
  height: 81px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 42px;
  margin-bottom: 8px;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: black; // theme black이 아닌 그냥 블랙?
  margin-left: 18px;
  margin-right: 24px;
`;

const TagBox = styled.div`
  width: 37px;
  height: 24px;
  background: white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagPart = styled.p`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 9px;
  font-weight: 500;
  line-height: 13.5px;
`;

const CommentInput = styled.input`
  width: 526px;
  height: 31px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
  padding-left: 10px;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
`;
