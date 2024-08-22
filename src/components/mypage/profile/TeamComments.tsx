import styled from 'styled-components';
import FirstPage from '@assets/mypage/first-page.svg';
import Move from '@assets/mypage/move.svg';

interface TeamCommentsProps {
  isHiddenArray: boolean[];
  toggleHidden: (index: number) => void;
}

const TeamComments: React.FC<TeamCommentsProps> = ({
  isHiddenArray,
  toggleHidden
}) => {
  console.log(isHiddenArray);
  const shouldShowSeeMore = isHiddenArray.length > 5; // 5개 이상일 때만 SeeMore를 보여줌

  return (
    <CommentBox>
      <CommentHeader>
        최근 팀원들의 한마디
        {shouldShowSeeMore && (
          <SeeMore>
            <FirstPage />
            <Move />
          </SeeMore>
        )}
      </CommentHeader>
      <CommentContainer>
        {isHiddenArray.slice(0, 5).map((_, index) => (
          <Comment key={index}>
            <ToggleText isHidden={isHiddenArray[index]}>
              {isHiddenArray[index] ? '가려졌어요' : 'PPT를 잘 만들어요!'}
            </ToggleText>
            <ToggleButton
              isHidden={isHiddenArray[index]}
              onClick={() => toggleHidden(index)}
            >
              {isHiddenArray[index] ? '해제' : '숨기기'}
            </ToggleButton>
          </Comment>
        ))}
      </CommentContainer>
    </CommentBox>
  );
};

export default TeamComments;

const CommentBox = styled.div`
  width: 552px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentHeader = styled.h1`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
`;

const SeeMore = styled.div`
  display: flex;
  gap: 6px;
  width: 70px;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface ToggleProps {
  isHidden: boolean;
}

const ToggleButton = styled.button<ToggleProps>`
  width: 96px;
  height: 36px;
  background-color: ${({ isHidden, theme }) =>
    isHidden ? 'white' : theme.colors.mainBlue};
  color: ${({ isHidden, theme }) =>
    isHidden ? theme.colors.mainBlue : 'white'};
  border: ${({ isHidden, theme }) =>
    isHidden ? `1px solid ${theme.colors.mainBlue}` : 'none'};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const ToggleText = styled.div<ToggleProps>`
  width: 444px;
  border-radius: 4px;
  background-color: ${({ isHidden, theme }) =>
    isHidden ? theme.colors.darkGray : 'white'};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ isHidden, theme }) =>
    isHidden ? theme.colors.lightGray : theme.colors.black};
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
`;
