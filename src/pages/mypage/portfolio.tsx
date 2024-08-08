import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Back from '@assets/mypage/back.svg';
import Move from '@assets/mypage/move.svg';
import { useTags } from '@hooks/useTags';

interface Portfolio {
  title: string;
  period: string;
}

export const PortfolioPage = () => {
  const navigate = useNavigate();

  // 포트폴리오 리스트 상태: 포트폴리오 객체 배열
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    { title: 'UMC', period: '2023.12~2024.02' }
  ]);

  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null
  );

  // 포트폴리오 클릭 핸들러: 클릭된 포트폴리오 객체를 선택
  const handlePortfolioClick = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  // useTags 커스텀 훅 사용
  const {
    tags,
    newTag,
    editTagIndex,
    showTagInput,
    setNewTag,
    handleTagKeyDown,
    handleEditTag,
    handleDeleteTag,
    addTag,
    TagContainer,
    TagInputContainer,
    TagInput,
    DeleteBtn,
    AddTagBtn,
    Tags
  } = useTags();

  return (
    <PortfolioContainer>
      <ContentContainer>
        <Header>
          <IconContainer onClick={() => navigate(`/mypage`)}>
            <Back />
          </IconContainer>
          <HeaderText>포트폴리오</HeaderText>
        </Header>

        <MainContent>
          {portfolios.length === 0 ? ( // 포트폴리오가 아예 없는 경우
            <>
              <NoPortfolioPage>
                <NoPortfolioMessage>
                  아직 끝난 프로젝트가 없습니다.
                </NoPortfolioMessage>
              </NoPortfolioPage>
              <NoPortfolioView>
                <NoPortfolioMessage>
                  아직 확인할 프로젝트가 없습니다.
                </NoPortfolioMessage>
              </NoPortfolioView>
            </>
          ) : (
            <>
              <PortfolioMenu>
                {portfolios.map((portfolio) => (
                  <MyPortfolio
                    key={portfolio.title}
                    onClick={() => handlePortfolioClick(portfolio)}
                  >
                    <InfoBox>
                      <Title>{portfolio.title}</Title>
                      <Period>{portfolio.period}</Period>
                    </InfoBox>
                    <MoveIcon>
                      <Move />
                    </MoveIcon>
                  </MyPortfolio>
                ))}
              </PortfolioMenu>
              <ViewPortfolio>
                {selectedPortfolio ? ( // 포트폴리오가 선택된 경우
                  <>
                    <ProjectInfo>
                      <ProjectTitle>{selectedPortfolio.title}</ProjectTitle>
                      <ProjectPeriod>{selectedPortfolio.period}</ProjectPeriod>
                    </ProjectInfo>
                    <MainInfo>
                      <ProjectTags>
                        <ProjectBox>
                          <TagsTitle>프로젝트 카테고리</TagsTitle>
                          <Tags>
                            {tags.map((tag, index) => (
                              <TagContainer
                                key={index}
                                onClick={() => handleEditTag(index)}
                              >
                                {editTagIndex === index ? (
                                  <TagInputContainer>
                                    <TagInput
                                      value={newTag}
                                      onChange={(e) =>
                                        setNewTag(e.target.value)
                                      }
                                      onKeyDown={handleTagKeyDown}
                                      maxLength={5}
                                      autoFocus
                                    />
                                    <DeleteBtn
                                      onClick={(e) => handleDeleteTag(e, index)}
                                    />
                                  </TagInputContainer>
                                ) : (
                                  <span>{tag}</span>
                                )}
                              </TagContainer>
                            ))}
                            {showTagInput && editTagIndex === null && (
                              <TagInputContainer>
                                <TagInput
                                  value={newTag}
                                  onChange={(e) => setNewTag(e.target.value)}
                                  onKeyDown={handleTagKeyDown}
                                  maxLength={5}
                                  autoFocus
                                />
                                <DeleteBtn
                                  onClick={(e) => handleDeleteTag(e, -1)}
                                />
                              </TagInputContainer>
                            )}
                            {!showTagInput && tags.length < 3 && (
                              <AddTagBtn onClick={addTag} />
                            )}
                          </Tags>
                        </ProjectBox>
                        <ProjectBox>
                          <TagsTitle>프로젝트 멤버</TagsTitle>
                          <Tags>
                            {tags.map((tag, index) => (
                              <TagContainer
                                key={index}
                                onClick={() => handleEditTag(index)}
                              >
                                {editTagIndex === index ? (
                                  <TagInputContainer>
                                    <TagInput
                                      value={newTag}
                                      onChange={(e) =>
                                        setNewTag(e.target.value)
                                      }
                                      onKeyDown={handleTagKeyDown}
                                      maxLength={5}
                                      autoFocus
                                    />
                                    <DeleteBtn
                                      onClick={(e) => handleDeleteTag(e, index)}
                                    />
                                  </TagInputContainer>
                                ) : (
                                  <span>{tag}</span>
                                )}
                              </TagContainer>
                            ))}
                            {showTagInput && editTagIndex === null && (
                              <TagInputContainer>
                                <TagInput
                                  value={newTag}
                                  onChange={(e) => setNewTag(e.target.value)}
                                  onKeyDown={handleTagKeyDown}
                                  maxLength={5}
                                  autoFocus
                                />
                                <DeleteBtn
                                  onClick={(e) => handleDeleteTag(e, -1)}
                                />
                              </TagInputContainer>
                            )}
                            {!showTagInput && tags.length < 3 && (
                              <AddTagBtn onClick={addTag} />
                            )}
                          </Tags>
                        </ProjectBox>
                        <ProjectBox>
                          <TagsTitle>나의 역할</TagsTitle>
                          <Tags>
                            {tags.map((tag, index) => (
                              <TagContainer
                                key={index}
                                onClick={() => handleEditTag(index)}
                              >
                                {editTagIndex === index ? (
                                  <TagInputContainer>
                                    <TagInput
                                      value={newTag}
                                      onChange={(e) =>
                                        setNewTag(e.target.value)
                                      }
                                      onKeyDown={handleTagKeyDown}
                                      maxLength={5}
                                      autoFocus
                                    />
                                    <DeleteBtn
                                      onClick={(e) => handleDeleteTag(e, index)}
                                    />
                                  </TagInputContainer>
                                ) : (
                                  <span>{tag}</span>
                                )}
                              </TagContainer>
                            ))}
                            {showTagInput && editTagIndex === null && (
                              <TagInputContainer>
                                <TagInput
                                  value={newTag}
                                  onChange={(e) => setNewTag(e.target.value)}
                                  onKeyDown={handleTagKeyDown}
                                  maxLength={5}
                                  autoFocus
                                />
                                <DeleteBtn
                                  onClick={(e) => handleDeleteTag(e, -1)}
                                />
                              </TagInputContainer>
                            )}
                            {!showTagInput && tags.length < 3 && (
                              <AddTagBtn onClick={addTag} />
                            )}
                          </Tags>
                        </ProjectBox>
                      </ProjectTags>
                      <SharedFiles></SharedFiles>
                    </MainInfo>
                  </>
                ) : (
                  // 포트폴리오는 있지만 아무것도 선택하지 않은 경우
                  <SelectPortfolioMessage>
                    프로젝트를 클릭해 확인할 수 있습니다.
                  </SelectPortfolioMessage>
                )}
              </ViewPortfolio>
            </>
          )}
        </MainContent>
      </ContentContainer>
    </PortfolioContainer>
  );
};

// 스타일 컴포넌트 정의
const PortfolioContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 62px 0 0 125px;
`;

const Header = styled.div`
  width: 300px;
  display: flex;
  gap: 60px;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 37px;
  height: 37px;
  cursor: pointer;
`;

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 1107px;
  height: 584px;
  gap: 35px;
`;

const PortfolioMenu = styled.div`
  width: 536px;
  height: 584px;
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MyPortfolio = styled.div`
  height: 64px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 7px;
  padding: 13px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ViewPortfolio = styled.div`
  width: 536px;
  height: 584px;
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const Period = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray};
`;

const MoveIcon = styled.div`
  cursor: pointer;
  width: 31px;
  height: 31px;
`;

const NoPortfolioPage = styled.div`
  width: 536px;
  height: 584px;
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoPortfolioView = styled(NoPortfolioPage)``;

const NoPortfolioMessage = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const SelectPortfolioMessage = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const ProjectInfo = styled.div`
  width: 488px;
  height: 34px;
  margin-bottom: 18px;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 19px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const MainInfo = styled.div`
  width: 488px;
  height: 482px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ProjectTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const ProjectPeriod = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ProjectTags = styled.div`
  display: flex;
  flex-direction: column;
  height: 231px;
  gap: 18px;
`;

const SharedFiles = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 65px;
  gap: 7px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const TagsTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
