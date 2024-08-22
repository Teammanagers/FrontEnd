import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ModalStateProps {
  closeModal: () => void;
}

export const StopProjectModal = ({ closeModal }: ModalStateProps) => {
  const navigate = useNavigate();

  return (
    <ModalBackground>
      <ModalContainer>
        <TitleText>{'팀 매니저'}를 정말 나가실건가요?</TitleText>
        <ContentText>팀에서 나가기 전, 다시 한번 확인해 주세요.</ContentText>
        <BtnContainer>
          {/* navigate 수정하기 */}
          <EndBtn onClick={() => navigate(`/management/end/comment`)}>
            종료하기
          </EndBtn>
          <CancelBtn onClick={closeModal}>취소</CancelBtn>
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
