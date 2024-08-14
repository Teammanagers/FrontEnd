import { useState } from 'react';
import styled from 'styled-components';
import { FileMenuContainer } from '@components/share/FileMenuContainer';
import { FeedbackSection } from '@components/share/FeedbackSection';
import { FileItem } from '@components/share/FileItem';

interface FileItem {
  id: number;
  name: string;
  date: string;
  size: string;
  type: string;
  author: string;
  feedback?: string[];
}

export const SharePage = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: '프로젝트 계획서',
      date: '2023-08-12',
      size: '2.4 MB',
      type: 'pdf',
      author: '홍길동'
    },
    {
      id: 2,
      name: '디자인 초안',
      date: '2023-08-10',
      size: '3.1 MB',
      type: 'pptx',
      author: '김철수'
    }
  ]);

  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileAdd = () => {
    const newFile: FileItem = {
      id: files.length + 1,
      name: `파일 ${files.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      size: '1.5 MB',
      type: 'docx',
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
        <FileMenuContainer
          files={files}
          onFileSelect={handleFileSelect}
          onFileAdd={handleFileAdd}
          selectedFileId={selectedFileId}
        />
        <FeedbackContainer>
          <FeedbackSection
            isUploading={isUploading}
            selectedFileId={selectedFileId}
            files={files}
          />
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

const FeedbackContainer = styled.div`
  box-sizing: border-box;
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
