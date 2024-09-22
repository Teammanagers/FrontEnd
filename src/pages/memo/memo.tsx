import styled from 'styled-components';
import { AddMemoLarge } from '@components/Memo/AddMemoLarge.tsx';
import { MemoList } from '@components/Memo/MemoList.tsx';
import { useEffect, useState } from 'react';
import { getMemos } from '@apis/memo.ts';
import { useIdStore } from '@store/idStore.ts';

export const MemoPage = () => {
  const [hasMemo, setHasMemo] = useState<boolean>(false);

  const { teamId, setTeamId } = useIdStore((state) => ({
    teamId: state.teamId,
    setTeamId: state.setTeamId
  }));

  const getTeamId = () => {
    const id = localStorage.getItem('teamId');
    setTeamId(Number(id));
  };

  useEffect(() => {
    getTeamId();
    console.log(teamId);
  }, [teamId]);
  console.log(teamId);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await getMemos(teamId);
        const memos = response.result.memoList;
        setHasMemo(memos.length > 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemos();
  }, [teamId]);

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
