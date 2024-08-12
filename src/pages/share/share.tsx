import { useState } from 'react';
import styled from 'styled-components';
import AddFile from '@assets/mypage/add-file.svg';
import Feedback from '@assets/mypage/feedback.svg';
import Ppt from '@assets/mypage/ppt.svg';
import Dot from '@assets/mypage/dot.svg';
import SmallAdd from '@assets/mypage/small-add.svg';

interface File {
  id: number;
  name: string;
  date: string;
  size: string;
  type: string;
  author: string;
  feedback?: string;
}

export const SharePage = () => {
  const author = '작성자';
  const [files, setFiles] = useState<File[]>([
    {
      id: 1,
      name: '프로젝트 계획서.pdf',
      date: '2023-08-12',
      size: '2.4 MB',
      type: 'PDF',
      author: '홍길동'
    },
    {
      id: 2,
      name: '디자인 초안.pptx',
      date: '2023-08-10',
      size: '3.1 MB',
      type: 'PPTX',
      author: '김철수'
    }
  ]);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const handleFileAdd = () => {
    const newFile: File = {
      id: files.length + 1,
      name: `파일 ${files.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      size: '1.5 MB',
      type: 'DOCX',
      author: '박영희'
    };
    setFiles([...files, newFile]);
    setIsUploading(false);
  };

  const handleFileSelect = (id: number) => {
    setSelectedFileId(id);
  };

  return (
    <SharePageContainer>
      <ContentContainer>
        <FileMenuContainer>
          {files.length === 0 ? (
            <EmptyState>
              <EmptyText>
                파일을 드래그하거나 아래 버튼을 클릭하여 파일을 추가할 수
                있습니다
              </EmptyText>
              <AddFileField onClick={handleFileAdd}>
                <IconContainer>
                  <AddFile />
                </IconContainer>
                <AddFileText>파일 추가하기</AddFileText>
              </AddFileField>
            </EmptyState>
          ) : (
            <>
              {files.map((file) => (
                <FileInfoBox
                  key={file.id}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <FileInfo>
                    <FileImage>
                      <Ppt />
                    </FileImage>
                    <FileDetails>
                      <FileName>{file.name}</FileName>
                      <FileProperties>
                        {file.size} <Dot /> {file.date}
                      </FileProperties>
                    </FileDetails>
                    <TagAuthor>{author}</TagAuthor>
                  </FileInfo>
                  <StartFeedback>
                    <Feedback />
                    <ButtonText>피드백</ButtonText>
                  </StartFeedback>
                </FileInfoBox>
              ))}
              <AddFileButton onClick={handleFileAdd}>
                <AddText>파일 추가하기</AddText>
                <SmallAdd />
              </AddFileButton>
            </>
          )}
        </FileMenuContainer>
        <FeedbackContainer>
          {isUploading ? (
            <FeedbackInfoBox>
              <InfoText>자료에 대한 피드백을 남길 수 있습니다. </InfoText>
              <AddFeedbackField>
                <IconContainer>
                  <Feedback />
                </IconContainer>
                <AddText>피드백</AddText>
              </AddFeedbackField>
            </FeedbackInfoBox>
          ) : files.length === 0 ? (
            <FeedbackEmptyState>
              아직 피드백 남길 자료가 없습니다.
            </FeedbackEmptyState>
          ) : selectedFileId !== null ? (
            <SelectedField>
              <InfoField>
                <TextField>
                  <div className="fileName">파일 제목</div>
                </TextField>
              </InfoField>
              <WriteField></WriteField>
            </SelectedField>
          ) : (
            <FeedbackEmptyState>피드백할 파일을 선택하세요.</FeedbackEmptyState>
          )}
        </FeedbackContainer>
      </ContentContainer>
    </SharePageContainer>
  );
};

const SharePageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 101px 0 0 125px;
  flex-direction: row;
  align-items: flex-start;
  width: 1107px;
  height: 584px;
  gap: 35px;
`;

const FileMenuContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 536px;
  height: 631px;
  border-radius: 10px;
  padding: 25px;
  gap: 19px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FeedbackContainer = styled.div`
  background-color: white;
  width: 535px;
  height: 631px;
  border-radius: 10px;
  padding: 25px;
  gap: 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyState = styled.div`
  width: 198px;
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-around;
`;

const EmptyText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  height: 36px;
  text-align: center;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddFileField = styled.div`
  width: 78px;
  height: 66px;
  border-radius: 7px;
  padding: 11px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  align-self: center;
  cursor: pointer;
`;

const AddFileText = styled.div`
  width: 78px;
  height: 14px;
  font-size: 9px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const FileInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  width: 486px;
  height: 66px;
  cursor: pointer;
`;

const FileInfo = styled.div`
  width: 390px;
  border-radius: 6px;
  border: 0.76px solid ${({ theme }) => theme.colors.lightGray};
  padding: 12px 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileDetails = styled.div`
  width: 256px;
  height: 41px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FileName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const FileProperties = styled.div`
  height: 17px;
  display: flex;
  flex-direction: row;
  gap: 6.08px;
  font-size: 11px;
  font-weight: 400;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
`;

const TagAuthor = styled.div`
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
  justify-content: center;
  align-self: center;
`;

const StartFeedback = styled.div`
  width: 78px;
  border-radius: 6px;
  border: 0.76px solid ${({ theme }) => theme.colors.lightGray};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ButtonText = styled.div`
  font-size: 9px;
  font-weight: 400;
`;

const AddFileButton = styled.div`
  width: 486px;
  height: 66px;
  display: flex;
  flex-direction: row;
  border-radius: 6.08px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AddText = styled.div`
  width: 70px;
  height: 18px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedbackEmptyState = styled.div`
  width: 198px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const FeedbackInfoBox = styled.div`
  width: 198px;
  height: 104.32px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  justify-content: space-around;
`;

const InfoText = styled.div`
  height: 18px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const AddFeedbackField = styled.div`
  width: 78px;
  height: 67.32px;
  border-radius: 7px;
  padding: 11px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  align-self: center;
  cursor: pointer;
`;

const SelectedField = styled.div`
  background-color: white;
  width: 535px;
  height: 631px;
  border-radius: 10px;
  padding: 25px;
  gap: 19px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const InfoField = styled.div`
  width: 486px;
  height: 37px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const TextField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const WriteField = styled.div`
  width: 486.4px;
  height: 76px;
  display: flex;
  flex-direction: row;
`;
