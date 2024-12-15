import { AddMemoSmall } from '@/components/Memo/AddMemoSmall.tsx';
import { Memo } from '@/components/Memo/Memo.tsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MemoProps } from '../../types/memo.ts';
import { getMemoList } from '@/apis/new/memo.ts';

export const MemoList = () => {
  const [memos, setMemos] = useState<MemoProps[]>([]);
  const teamId = Number(localStorage.getItem('teamId'));

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await getMemoList(teamId);
        setMemos(response.memoList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemos();
  }, []);

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
