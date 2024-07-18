import styled from 'styled-components';

export const Memo = () => {
  return (
    <MemoContainer>
      <MemoTitleContainer>
        <MemoTitle>제목</MemoTitle>
      </MemoTitleContainer>
      <TagContainer>
        <TagBox>태그1</TagBox>
        <TagBox>태그2</TagBox>
      </TagContainer>
      <Content>내용이 들어가요 하이안녕하세요바이</Content>
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 201px;
  border-radius: 6px;
  gap: 9px;
  background: white;
`;

const MemoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 314px;
  height: 20px;
`;

const MemoTitle = styled.h1`
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  width: 314px;
  height: 12px;
  gap: 7px;
`;

const TagBox = styled.div`
  width: 37px;
  height: 12px;
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
