import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import './modal.css';

const Modal = () => {
  const navigate = useNavigate();
  const handleMainNavigate = () => {
    navigate('/');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button">모달 열기</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">제목</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            설명
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="Button" onClick={handleMainNavigate}>
              메인으로 이동
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="Button">닫기</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
