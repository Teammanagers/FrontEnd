import styled from 'styled-components';
import BackButton from '@assets/memo/back-button.svg';
import AddTag from '@assets/memo/add-tag-icon.svg';

export const WriteMemo = () => {
  return (
    <Container>
      <MemoContainer>
        <TopContainer>
          <BackBtn />
          <TitleContainer>
            <TitleInput placeholder="제목을 입력해주세요" />
          </TitleContainer>
          <TagContainer>
            {/* 태그 추가 버튼, 태그는 3개까지 */}
            <AddTagBtn>
              <AddTag />
            </AddTagBtn>
          </TagContainer>
        </TopContainer>
        <BottomContainer>
          <ContentText placeholder="내용을 입력해주세요"></ContentText>
          <SubmitBtn>메모 등록</SubmitBtn>
        </BottomContainer>
      </MemoContainer>
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
`;

const MemoContainer = styled.div`
  width: 1094px;
  height: 638px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const TopContainer = styled.div`
  width: 985px;
  height: 146px;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

const BackBtn = styled(BackButton)`
  width: 36px;
  height: 36px;
  display: flex;
  align-self: flex-start;
  margin-bottom: 9px;
  padding: 0;
  cursor: pointer;
  border: none;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  height: 27px;
  font-weight: 700;
  font-size: 18px;
  border: none;
  background: none;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 49px;
  border-top: 0.8px solid ${(props) => props.theme.colors.lightGray};
  border-bottom: 0.8px solid ${(props) => props.theme.colors.lightGray};
  display: flex;
  align-items: center;
`;

const AddTagBtn = styled.button`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentText = styled.textarea`
  width: 985px;
  height: 347px;
  border: none;
  font-size: 15px;
  line-height: 23px;
`;

const SubmitBtn = styled.button`
  width: 157px;
  height: 36px;
  margin: 19px 0 0 auto;
  background: ${(props) => props.theme.colors.mainBlue};
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
`;
