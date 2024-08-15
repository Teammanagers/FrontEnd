import AddMemo from '@assets/memo/add-memo.svg';
import Plus from '@assets/memo/plus.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const AddMemoLarge = () => {
  const navigate = useNavigate();
  return (
    <MemoContainer
      onClick={() => {
        navigate(`/memo/write`);
      }}
    >
      <AddMemo />
      <MemoTextContainer>
        <MemoText>화면을 클릭하여 팀과 공유할 메모를 남길 수 있습니다</MemoText>
        <Plus />
      </MemoTextContainer>
    </MemoContainer>
  );
};

const MemoContainer = styled.button`
  width: 1094px;
  height: 638px;
  background: white;
  border-radius: 6px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const MemoTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 18px;
`;

const MemoText = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;
