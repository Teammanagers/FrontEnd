import styled from 'styled-components';
import { AddMemoLarge } from '@components/memo/AddMemoLarge.tsx';
import { MemoList } from '@components/memo/MemoList.tsx';
import dummyData from '@assets/memo/dummy-data.json';
import { useEffect, useState } from 'react';

export interface MemoProps {
  id: number;
  title: string;
  tags: string[];
  content: string;
}

export const MemoPage = () => {
  const [hasMemo, setHasMemo] = useState<boolean>(false);

  // 메모가 있는지 확인
  useEffect(() => {
    setHasMemo((dummyData as MemoProps[]).length > 0);
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
