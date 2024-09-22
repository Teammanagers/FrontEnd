import React, { useRef } from 'react';
import styled from 'styled-components';
import AddFile from '@assets/mypage/add-file.svg';
import SmallAdd from '@assets/mypage/small-add.svg';
import { FileProps } from './FileProps';
import { FileItem } from './FileItem';

interface FileMenuContainerProps {
  files: {
    id: number;
    name: string;
    date: string;
    size: string;
    type: string;
    author: string;
  }[];
  onFileSelect: (id: number) => void;
  selectedFileId: number | null;
  onFileAdd: (fileItem: FileProps, fileObject: File) => void;
}
export const FileMenuContainer: React.FC<FileMenuContainerProps> = ({
  files,
  onFileSelect,
  onFileAdd,
  selectedFileId
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택 창 열기
    }
  };

  const formatFileSize = (size: number) => {
    return size < 1024
      ? `${size} bytes`
      : size < 1024 * 1024
        ? `${(size / 1024).toFixed(1)} kb`
        : `${(size / 1024 / 1024).toFixed(1)} mb`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        const newFileItem: FileProps = {
          id: Date.now(),
          name: file.name,
          size: formatFileSize(file.size),
          type: file.name.split('.').pop() || 'Unknown',
          date: new Date().toISOString().split('T')[0],
          author: '사용자'
        };

        onFileAdd(newFileItem, file);
      } else {
        alert('파일 크기가 10MB를 초과할 수 없습니다.');
      }
    }
  };

  return (
    <Container>
      {files.length === 0 ? (
        <EmptyState>
          <EmptyText>
            파일을 드래그하거나 아래 버튼을 클릭하여 파일을 추가할 수 있습니다
          </EmptyText>
          <AddFileField onClick={handleFileInputClick}>
            <IconContainer>
              <AddFile />
            </IconContainer>
            <AddFileText>파일 추가하기</AddFileText>
          </AddFileField>
        </EmptyState>
      ) : (
        <>
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onFileSelect={onFileSelect}
              isSelected={file.id === selectedFileId}
            />
          ))}
          <AddFileButton onClick={handleFileInputClick}>
            <AddText>파일 추가하기</AddText>
            <SmallAdd />
          </AddFileButton>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Container>
  );
};

const Container = styled.div`
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
  max-height: 631px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar-track {
    //적용이 왜 안되는지 ㅜㅠ
    background: white;
  }
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

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddFileText = styled.div`
  width: 78px;
  height: 14px;
  font-size: 9px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
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
  flex-shrink: 0;
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
