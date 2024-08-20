import { AddMemoSmall } from '@components/memo/AddMemoSmall.tsx';
import { Memo } from '@components/memo/Memo.tsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getMemos } from '@apis/memo.ts';
import { MemoProps } from '../../types/memo.ts';

export const MemoList = () => {
  const [memos, setMemos] = useState<MemoProps[]>([]);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await getMemos(1);
        setMemos(response.result.memoList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemos();
  }, [memos]);

  return (
    <MemoListContainer>
      <MemoContainer>
        <AddMemoSmall />
        {memos.map((memo: MemoProps) => (
          <Memo memo={memo} key={memo.memoId} />
        ))}
      </MemoContainer>
    </MemoListContainer>
  );
};

const MemoListContainer = styled.div`
  width: 1098px;
  height: 649px;
`;

const MemoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;
