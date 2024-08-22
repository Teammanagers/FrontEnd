import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Back from '@assets/mypage/back.svg';
import Move from '@assets/mypage/move.svg';
import { getSimplePortfolio, getDetailedPortfolio } from '@apis/portfolio';
import { SharedFile } from '@components/mypage/portfolio/sharedFile';

interface Portfolio {
  teamId: number;
  title: string;
  period: string;
}

interface DetailedPortfolio {
  name: string;
  start: string;
  end: string;
  teamTagList: string[];
  teamMemberList: string[];
  teamMyRole: string[];
  storageList: {
    storageId: number;
    title: string;
    size: string;
    uploadAt: string;
    fileUrl: string;
    uploader: string;
  }[];
}

export const PortfolioPage = () => {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null
  );
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const handleFileSelect = (id: number) => {
    setSelectedFileId(id);
  };
  const [detailedPortfolio, setDetailedPortfolio] =
    useState<DetailedPortfolio | null>(null);

  const testDetailedPortfolio = {
    //임시 데이터
    storageList: [
      {
        id: 1,
        name: 'Test File 1',
        size: '1MB',
        date: '2024-08-21',
        type: 'jpg',
        author: '기획자'
      },
      {
        id: 2,
        name: 'Test File 2',
        size: '2MB',
        date: '2024-08-22',
        type: 'ppt',
        author: 'User2'
      },
      {
        id: 3,
        name: 'Test File 2',
        size: '2MB',
        date: '2024-08-22',
        type: 'ppt',
        author: 'User2'
      },
      {
        id: 4,
        name: 'Test File 2',
        size: '2MB',
        date: '2024-08-22',
        type: 'ppt',
        author: 'User2'
      }
    ]
  };

  // SimplePortfolio API 호출
  useEffect(() => {
    const fetchSimplePortfolio = async () => {
      try {
        const response = await getSimplePortfolio();

        const portfolioData = response.result.portfolioList.map((item) => ({
          teamId: item.teamId,
          title: item.name,
          period: `${item.start.substring(0, 10)}~${item.end.substring(0, 10)}`
        }));
        console.log('simple api 호출 성공');
        setPortfolios(portfolioData);
      } catch (error) {
        console.error('Failed to fetch simple portfolio:', error);
      }
    };

    fetchSimplePortfolio();
  }, []);

  // 포트폴리오 클릭 시 DetailedPortfolio API 호출
  const handlePortfolioClick = async (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    try {
      const response = await getDetailedPortfolio(portfolio.teamId);
      console.log(response.result);
      console.log('detailed api 호출 성공');
      setDetailedPortfolio(response.result);
    } catch (error) {
      console.error('Failed to fetch detailed portfolio:', error);
    }
  };

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
          {portfolios.length === 0 ? (
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
                    key={portfolio.teamId}
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
                {selectedPortfolio ? (
                  <>
                    <ProjectInfo>
                      <ProjectTitle>{selectedPortfolio.title}</ProjectTitle>
                      <ProjectPeriod>{selectedPortfolio.period}</ProjectPeriod>
                    </ProjectInfo>
                    <MainInfo>
                      <ProjectTags>
                        <TagContainer>
                          <TagTitle>프로젝트 카테고리</TagTitle>
                          <TagBox>
                            {detailedPortfolio &&
                            detailedPortfolio.teamTagList.length > 0 ? (
                              detailedPortfolio.teamTagList.map(
                                (tag, index) => <Tag key={index}>{tag}</Tag>
                              )
                            ) : (
                              <></>
                            )}
                          </TagBox>
                        </TagContainer>
                        <TagContainer>
                          <TagTitle>프로젝트 멤버</TagTitle>
                          <TagBox>
                            {detailedPortfolio &&
                            detailedPortfolio.teamMemberList.length > 0 ? (
                              detailedPortfolio.teamMemberList.map(
                                (tag, index) => <Tag key={index}>{tag}</Tag>
                              )
                            ) : (
                              <></>
                            )}
                          </TagBox>
                        </TagContainer>
                        <TagContainer>
                          <TagTitle>나의 역할</TagTitle>
                          <TagBox>
                            {detailedPortfolio &&
                            detailedPortfolio.teamMyRole.length > 0 ? (
                              detailedPortfolio.teamMyRole.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                              ))
                            ) : (
                              <></>
                            )}
                          </TagBox>
                        </TagContainer>
                      </ProjectTags>
                      <SharedFiles>
                        <SharedBoxTitle>공유했던 파일</SharedBoxTitle>
                        <SharedBox>
                          {testDetailedPortfolio.storageList.length > 0 ? (
                            testDetailedPortfolio.storageList.map((file) => (
                              <SharedFile
                                key={file.id}
                                file={file}
                                onFileSelect={() => handleFileSelect(file.id)}
                                isSelected={file.id === selectedFileId}
                              />
                            ))
                          ) : (
                            <></>
                          )}
                        </SharedBox>
                      </SharedFiles>
                    </MainInfo>
                  </>
                ) : (
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
  box-sizing: border-box;
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
  box-sizing: border-box;
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

const TagBox = styled.div`
  height: 40px;
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  gap: 7px;
`;
const TagTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const ProjectTags = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 231px;
  gap: 18px;
`;

const TagContainer = styled.div`
  height: 65px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const Tag = styled.div`
  width: 37px;
  height: 24px;
  border-radius: 3px;
  padding: 8px 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 9px;
  font-weight: 500;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SharedFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SharedBoxTitle = styled.div`
  height: 18px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const SharedBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 488px;
  height: 214px;
  overflow-y: auto;
  overflow-x: hidden;
`;
