import { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import TeamContainer from '@components/team/TeamContainer';
import RegisterProfile from '@assets/team/register-profile.svg';
import PlusButton from '@assets/team/plus-button.svg';

export const CreateTeamPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 태그 추가 함수
  const addTag = (tag: string) => {
    // 태그가 비어있지 않으면 추가
    if (tag.trim() && tag.length <= 5) {
      setTags((prevTags) => [...prevTags, tag]); // 태그를 추가합니다.
      setInputValue(''); // 입력 필드를 초기화합니다.
    }
  };

  // 태그 삭제 함수
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // 엔터 키를 눌러서 태그를 추가
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      addTag(inputValue);
    }
  };

  // 입력 필드에서 포커스를 잃었을 때 태그 추가
  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  // 외부 영역 클릭 시에도 태그를 추가
  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      handleBlur();
    }
  };

  useEffect(() => {
    const eventHandler: EventListener = (e) =>
      handleClickOutside(e as unknown as MouseEvent);
    document.addEventListener('mousedown', eventHandler);
    return () => {
      document.removeEventListener('mousedown', eventHandler);
    };
  }, [inputValue]);

  return (
    <TeamContainer>
      <TeamIndexContainer>
        <SelectTeamComponent>
          <TeamLogoComponent>
            <RegisterProfile />
          </TeamLogoComponent>
          <TeamInfoComponent>
            <TitleInputWrapper>
              <TitleInputDiv>
                <TitleLabel>Title</TitleLabel>
                <TitleInput placeholder="팀명 또는 프로젝트를 입력해 주세요" />
              </TitleInputDiv>
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
                    (최대 한글 5자 또는 영어 5글자)
                  </span>
                </TitleLabel>
                <TagInputWrapper>
                  {tags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                      <TagRemoveButton onClick={() => removeTag(index)}>
                        X
                      </TagRemoveButton>
                    </Tag>
                  ))}
                  <TagInputContainer>
                    <TagInput
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleBlur}
                    />
                    <PlusButtonIcon />
                  </TagInputContainer>
                </TagInputWrapper>
              </TitleInputDiv>
            </TitleInputWrapper>
            <SubmitButton>팀 생성 완료</SubmitButton>
          </TeamInfoComponent>
        </SelectTeamComponent>
      </TeamIndexContainer>
    </TeamContainer>
  );
};

// 이하 스타일 컴포넌트는 그대로 사용

const TeamIndexContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 23px;
`;

const SelectTeamComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 76px;
  width: 163px;
  padding: 0px 47px;
`;

const TeamLogoComponent = styled.div`
  width: 163px;
  height: 163px;
`;

const TeamInfoComponent = styled.div`
  width: 536px;
  height: 283px;
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

const TitleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 37px;
  width: 100%;
  max-width: 536px;
`;

const TitleInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
`;

const TitleLabel = styled.span`
  font-size: 15px;
  line-height: 23px;
  font-weight: 500;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 13px 18px;
  height: 49px;
  font-size: 18px;
  line-height: 23px;
  font-weight: 500;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 6px;
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
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 6px 11px;
  background-color: #f9fbff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 14px;
  font-weight: 700;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    color: #cc0000;
  }
`;

const TagInput = styled.input`
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
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

const SubmitButton = styled.button`
  margin-top: 49px;
  width: 536px;
  height: 48px;
  border-radius: 4px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background-color: #cccccc;

  cursor: pointer;

  &:hover {
    background-color: #999999;
  }
`;

export default CreateTeamPage;
