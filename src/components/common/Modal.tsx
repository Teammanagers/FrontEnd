import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`;

const Content = styled(Dialog.Content)`
  background-color: white;
  border-radius: 4px;
  box-shadow:
    hsl(206, 22%, 7%) 0px 10px 38px -10px,
    hsl(206, 22%, 7%) 0px 10px 20px -15px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
`;

const Title = styled(Dialog.Title)`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Description = styled(Dialog.Description)`
  margin: 20px 0;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = () => {
  const navigate = useNavigate();
  const handleMainNavigate = () => {
    navigate('/');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>모달 열기</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>제목</Title>
          <Description>설명</Description>
          <Dialog.Close asChild>
            <Button onClick={handleMainNavigate}>메인으로 이동</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>닫기</Button>
          </Dialog.Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
