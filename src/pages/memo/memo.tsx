import styled from 'styled-components';
import { AddMemoLarge } from '@components/memo/AddMemoLarge.tsx';
import { MemoList } from '@components/memo/MemoList.tsx';
import { useEffect, useState } from 'react';
import { getMemos } from '@apis/memo.ts';

export const MemoPage = () => {
  const [hasMemo, setHasMemo] = useState<boolean>(false);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await getMemos(1);
        const memos = response.result.memoList;
        setHasMemo(memos.length > 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemos();
  }, []);

  return <Container>{hasMemo ? <MemoList /> : <AddMemoLarge />}</Container>;
};

const Container = styled.div`
  width: 1280px;
  height: 820px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;
