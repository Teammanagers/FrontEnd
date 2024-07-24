import { AddMemoSmall } from '@components/memo/AddMemoSmall.tsx';
import { Memo } from '@components/memo/Memo.tsx';
import dummyData from '@assets/memo/dummy-data.json';
import styled from 'styled-components';
export interface MemoProps {
  id: number;
  title: string;
  tags: string[];
  content: string;
}
export const MemoList = () => {
  return (
    <MemoContainer>
      <AddMemoSmall />
      {(dummyData as MemoProps[]).map((memo) => (
        <Memo memo={memo} key={memo.id} />
      ))}
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;
