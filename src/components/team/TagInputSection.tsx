import styled from 'styled-components';
import PlusButton from '@assets/team/plus-button.svg';
import TagItem from '@components/team/TagItem';
import { useState } from 'react';

interface TagInputSectionProps {
  tags: string[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  removeTag: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TagInputSection: React.FC<TagInputSectionProps> = ({
  tags,
  inputValue,
  setInputValue,
  inputRef,
  removeTag,
  handleKeyDown
}) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  return (
    <TitleInputDiv>
      <TitleLabel>
        Tag
        <span
          style={{
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: 400,
            marginLeft: '3px'
          }}
        >
          (최대 한글 5글자 또는 영어 5글자)
        </span>
      </TitleLabel>
      <TagInputWrapper>
        {tags.map((tag, index) => (
          <TagItem key={index} tag={tag} onRemove={() => removeTag(index)} />
        ))}
        <TagInputContainer>
          {tags.length < 3 && (
            <TagInputDiv
              tabIndex={0}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            >
              <TagInput
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={5}
              />
              <PlusButtonIcon />
            </TagInputDiv>
          )}

          {tags.length === 0 && !isInputFocused && (
            <HelperText>
              버튼을 눌러 프로젝트에 대한 태그를 추가할 수 있어요
            </HelperText>
          )}
        </TagInputContainer>
      </TagInputWrapper>
    </TitleInputDiv>
  );
};

const TitleInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleLabel = styled.span`
  font-size: 15px;
  line-height: 23px;
  font-weight: 500;
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 13px 18px;
  height: auto;
  font-size: 18px;
  line-height: 23px;
  font-weight: 500;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 6px;
  background-color: #ffffff;
`;

const TagInput = styled.input`
  color: black;
  width: 29px;
  height: 29px;
  background-color: #f9fbff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  box-sizing: border-box;
  transition: width 0.3s ease;
  padding-right: 34px;
`;

const TagInputDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:focus-within ${TagInput} {
    width: 100px;
  }
`;

const TagInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PlusButtonIcon = styled(PlusButton)`
  position: absolute;
  width: 29px;
  height: 29px;
  right: 5px;
  cursor: pointer;
`;

const HelperText = styled.span`
  position: absolute;
  width: 500px;
  margin-left: 56px;
  font-size: 14px;
  color: #888888;
`;
