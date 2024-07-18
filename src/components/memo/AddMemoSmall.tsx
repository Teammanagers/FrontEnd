import styled from 'styled-components';
import AddMemoIcon from '@assets/images/memo/add-memo.svg';
import PlusIcon from '@assets/images/memo/plus.svg';

export const AddMemoSmall = () => {
  return (
    <MemoContainer>
      <AddMemo />
      <MemoTextContainer>
        <MemoText>메모 추가하기</MemoText>
        <Plus />
      </MemoTextContainer>
    </MemoContainer>
  );
};

const MemoContainer = styled.button`
  width: 350px;
  height: 201px;
  border: none;
  background: white;
  border-radius: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const AddMemo = styled(AddMemoIcon)`
  width: 28px;
  height: 28px;
`;

const MemoTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  height: 40px;
  margin-top: 9px;
`;

const MemoText = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const Plus = styled(PlusIcon)`
  width: 14px;
  height: 14px;
`;
