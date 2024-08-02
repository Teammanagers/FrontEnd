import styled from 'styled-components';

export const EndProjectModal = () => {
  return (
    <ModalBackground>
      <ModalContainer>
        <TitleText>
          팀 프로젝트 {'팀 매니저'}를 정말 종료하시겠습니까?
        </TitleText>
        <ContentText>
          종료한 프로젝트는 마이페이지에서 다시 확인할 수 있습니다
        </ContentText>
        <BtnContainer>
          <EndBtn>종료하기</EndBtn>
          <CancelBtn>취소</CancelBtn>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.1);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 200px;
  background: white;
  border-radius: 6px;
  box-shadow: 1.52px 3.04px 9.12px rgba(0, 0, 0 0.08);
`;

const TitleText = styled.h1`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.black};
  margin: 58px 0 12px 0;
`;

const ContentText = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0 0 40px 0;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Btn = styled.button`
  width: 158px;
  height: 36px;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  cursor: pointer;
`;

const EndBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.red};
  color: white;
`;

const CancelBtn = styled(Btn)`
  background: white;
  color: ${({ theme }) => theme.colors.mainBlue};
  border: solid 1px ${({ theme }) => theme.colors.mainBlue};
`;
