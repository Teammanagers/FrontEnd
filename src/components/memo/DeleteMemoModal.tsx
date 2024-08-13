import styled from 'styled-components';

export const DeleteMemoModal = () => {
  return (
    <>
      <ModalContainer>
        <ModalText>&#39;제목&#39; 메모를 삭제하시겠습니까?</ModalText>
        <ButtonContainer>
          <KeepBtn>유지</KeepBtn>
          <DeleteBtn>삭제</DeleteBtn>
        </ButtonContainer>
      </ModalContainer>
    </>
  );
};

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
