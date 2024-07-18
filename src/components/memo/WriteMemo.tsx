import styled from 'styled-components';
import BackButton from '@assets/images/memo/back-button.svg';

export const WriteMemo = () => {
  return (
    <MemoContainer>
      <TopContainer>
        <BackBtn>
          <BackButton />
        </BackBtn>
        <TitleContainer>
          <TitleInput placeholder="제목을 입력해주세요" />
        </TitleContainer>
        {/* 태그도 입력받는 형식..... */}
        <TagContainer>
          ...태그가 들어갑니당... 아무것도 없을때는 + 버튼
        </TagContainer>
      </TopContainer>
      <ContentText placeholder="내용을 입력해주세요"></ContentText>
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  width: 1094px;
  height: 638px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  //background: #535bf2;
`;

const TopContainer = styled.div`
  width: 985px;
  height: 146px;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

const BackBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-self: flex-start;
  margin-bottom: 9px;
  padding: 0;
  // background: url(${BackButton});
  //background-image: url('../../assets/images/memo/back-button.svg');
  //background-size: contain; // 이미지 크기 버튼 크기에 맞춤
  //background-repeat: no-repeat;
  //background-position: center center;
  //background-color: cornflowerblue;
  background: transparent;
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

const ContentText = styled.textarea`
  width: 985px;
  height: 347px;
  border: none;
  font-size: 15px;
  line-height: 23px;
`;
