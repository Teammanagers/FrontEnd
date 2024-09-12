import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FileMenuContainer } from '@components/Share/FileMenuContainer';
import { FeedbackSection } from '@components/Share/FeedbackSection';
import { getStorageList } from '@apis/share';

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
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const teamId = 1;

  const handleFileAdd = (newFile: FileItem) => {
    setFiles([...files, newFile]);
    setIsUploading(false);
  };

  const handleFileSelect = (id: number) => {
    setSelectedFileId(id);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const FileData = await getStorageList(teamId);
        console.log('데이터 뭔데', FileData);

        if (Array.isArray(FileData)) {
          const formattedFiles = FileData.map((file) => ({
            id: file.storageId,
            name: file.title,
            date: new Date(file.uploadAt).toISOString().slice(0, 10),
            size: file.size,
            type: file.fileExtension,
            author: file.uploader
          }));
          setFiles(formattedFiles);
          console.log('파일정보:', formattedFiles);
        } else {
          console.error('result 없음');
        }
      } catch (error) {
        console.error('error', error);
      }
    };

    fetchFiles();
  }, [teamId]);

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
            teamId={teamId}
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
