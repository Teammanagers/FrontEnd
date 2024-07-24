import styled from 'styled-components';
// import { AddMemoLarge } from '@components/memo/AddMemoLarge.tsx';
// import { WriteMemo } from '@components/memo/WriteMemo.tsx';
import { MemoList } from '@components/memo/MemoList.tsx';
// import { AddMemoSmall } from '@components/memo/AddMemoSmall.tsx';
// import { Memo } from '@components/memo/Memo.tsx';

export const MemoPage = () => {
  return (
    <Container>
      {/* 메모가 하나도 없으면 */}
      {/*<AddMemoLarge />*/}

      {/*  메모가 하나라도 존재하면  */}
      {/*<AddMemoSmall />*/}
      {/*<Memo />*/}
      <MemoList />

      {/* 메모 작성 */}
      {/*<WriteMemo />*/}
    </Container>
  );
};

const Container = styled.div`
  width: 1280px;
  height: 820px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  //gap: 24px;
`;
