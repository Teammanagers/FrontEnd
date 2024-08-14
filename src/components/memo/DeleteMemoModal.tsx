import styled from 'styled-components';

interface DeleteMemoModalProps {
  onClose: () => void;
}

export const DeleteMemoModal = ({ onClose }: DeleteMemoModalProps) => {
  const handleDelete = () => {
    // 메모 삭제 api 연결
    console.log('메모 삭제!');
  };

  return (
    <Container>
      <ModalContainer>
        <ModalText>&#39;제목&#39; 메모를 삭제하시겠습니까?</ModalText>
        <ButtonContainer>
          <KeepBtn onClick={onClose}>유지</KeepBtn>
          <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>
        </ButtonContainer>
      </ModalContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 146px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  gap: 24px;
  position: absolute;
  top: 342px;
  left: 490px;
`;

const ModalText = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Btn = styled.button`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const KeepBtn = styled(Btn)`
  background: white;
  color: ${({ theme }) => theme.colors.mainBlue};
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
`;

const DeleteBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.red};
  color: white;
  border: none;
`;
