import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import Send from '@assets/mypage/send.svg';

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const QuitModal = ({ onClose, isOpen }: ModalProps) => {
  return (
    <ModalContainer>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <Header>
              <Title>팀 매니저를 정말 탈퇴하시겠습니까?</Title>
              <Description>
                탈퇴하시면 기존 데이터는 모두 지워집니다. 탈퇴 관련 정책~~~
              </Description>
            </Header>
            <Form>
              <FormContainer>
                <FormText>
                  탈퇴하시려는 이유를 작성해주시면 더 나은 서비스로
                  보답하겠습니다.
                </FormText>
                <SubmitContainer>
                  <Textarea placeholder="탈퇴 사유" />
                  <Send />
                </SubmitContainer>
              </FormContainer>

              <ButtonContainer>
                <SubmitButton>탈퇴하기</SubmitButton>
                <CancelButton onClick={onClose}>취소</CancelButton>
              </ButtonContainer>
            </Form>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContainer>
  );
};

const ModalContainer = styled.div``;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`;

const DialogContent = styled(Dialog.Content)`
  background-color: white;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 536px;
  /* height: 285px; */
  padding: 20px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 74px;
`;

const Title = styled(Dialog.Title)`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  height: 30px;
  margin: 0;
`;

const Description = styled(Dialog.Description)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 24px;
  margin-top: 8px;
  height: 36px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 147px;
  gap: 20px;
`;

const FormContainer = styled.div`
  height: 91px;
`;

const FormText = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 59px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 9px 12px;
  border-radius: 4px;
  gap: 6px;
`;

const Textarea = styled.textarea`
  width: 410px;
  height: 41px;
  padding: 5px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 36px;
  gap: 4px;
`;

const SubmitButton = styled.button`
  width: 242px;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;
  padding: 7.6px 12.16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
`;

const CancelButton = styled.button`
  width: 242px;
  background-color: white;
  color: ${({ theme }) => theme.colors.mainBlue};
  padding: 7.6px 12.16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  border: 0.76px solid ${({ theme }) => theme.colors.mainBlue};
`;

export default QuitModal;
