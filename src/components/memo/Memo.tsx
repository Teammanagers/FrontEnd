import styled from 'styled-components';
import { MemoProps } from '@components/memo/MemoList.tsx';

interface Memo {
  memo: MemoProps;
}

export const Memo = ({ memo }: Memo) => {
  const { title, tags, content } = memo;

  return (
    <MemoContainer>
      <MemoTitleContainer>
        <MemoTitle>{title}</MemoTitle>
      </MemoTitleContainer>
      <TagContainer>
        {tags.map((tag, id) => (
          <TagBox key={id}>{tag}</TagBox>
        ))}
      </TagContainer>
      <Content>{content}</Content>
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 200px;
  border-radius: 6px;
  gap: 9px;
  background: white;
`;

const MemoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 314px;
  height: 21px;
  margin-top: 9px;
`;

const MemoTitle = styled.h1`
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  width: 314px;
  height: 21px;
  gap: 6px;
`;

const TagBox = styled.div`
  width: auto;
  padding: 0 6px 0 6px;
  height: 21px;
  border: 3px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.colors.mainBlue};
  font-weight: 500;
  font-size: 9px;
  line-height: 14px;
`;

const Content = styled.div`
  width: 314px;
  height: 115px;
  font-size: 10px;
  line-height: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
`;
