import styled from 'styled-components';
import { CommentInputBox } from '@components/management/CommentInput.tsx';

export const Comments = () => {
  return (
    <Container>
      <TeamName>UMC 6th 팀매니저</TeamName>
      <InfoText>프로젝트가 종료되었어요!</InfoText>
      <Text>그동안 고생한 팀원들에게 코멘트를 남길 수 있어요</Text>
      <CommentsList>
        <CommentInputBox />
        <CommentInputBox />
        <CommentInputBox />
        <CommentInputBox />
        <CommentInputBox />
        <CommentInputBox />
        <CommentInputBox />
        <CommentInputBox />
      </CommentsList>
      <BtnContainer>
        <RadomBtn>임의로 작성</RadomBtn>
        <DoneBtn>작성 완료</DoneBtn>
      </BtnContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TeamName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.black};
  margin: 92px 0 0 0;
`;

const InfoText = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.black};
  margin: 7px 0 14px 0;
`;

const Text = styled.p`
  font-size: 15px;
  line-height: 22.5px;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 559px;
  height: 458px;
  gap: 19px;
  margin-top: 16px;
  overflow-y: scroll;
`;

const BtnContainer = styled.div`
  display: flex;
  width: 537px;
  height: 32px;
  gap: 23px;
  margin-top: 19px;
`;

const Btn = styled.button`
  width: 257px;
  height: 32px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
  border: none;
  cursor: pointer;
`;

const RadomBtn = styled(Btn)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const DoneBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.mainBlue};
  color: white;
`;
