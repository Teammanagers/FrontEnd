import styled from 'styled-components';
import { useState } from 'react';
import { DeleteMemoModal } from '@components/memo/DeleteMemoModal.tsx';

export const MenuBar = () => {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpenedModal(true);
  };

  const closeModal = () => {
    setIsOpenedModal(false);
  };

  return (
    <Container>
      <Btn>수정</Btn>
      <Btn style={{ color: 'red' }} onClick={handleModal}>
        삭제
      </Btn>
      {isOpenedModal && <DeleteMemoModal onClose={closeModal} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 50px;
  border-radius: 3px;
  background: white;
  box-shadow: 0 1.52px 9.12px 0 rgba(0, 0, 0, 0.1);
`;

const Btn = styled.button`
  width: 100%;
  height: 50%;
  font-size: 10px;
  border: none;
  background: white;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;
