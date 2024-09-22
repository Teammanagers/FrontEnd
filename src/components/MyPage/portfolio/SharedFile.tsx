import React from 'react';
import styled from 'styled-components';
import Dot from '@assets/mypage/dot.svg';
import { FileProps } from '@components/Share/FileProps';
import Word from '@assets/share/word.svg';
import Image from '@assets/share/image.svg';

interface FileItemProps {
  file: FileProps;
  onFileSelect: (id: number) => void;
  isSelected: boolean;
}

export const SharedFile: React.FC<FileItemProps> = ({
  file,
  // onFileSelect,
  isSelected
}) => {
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'svg':
        return <Image />;
      default:
        return <Word />;
    }
  };

  return (
    <FileInfoBox isSelected={isSelected}>
      <FileInfo title={file.name}>
        <FileImage>{getFileIcon(file.type)}</FileImage>
        <FileDetails>
          <FileName>{file.name}</FileName>
          <FileProperties>
            {file.size} <Dot /> {file.date}
          </FileProperties>
        </FileDetails>
        <TagAuthor>{file.author}</TagAuthor>
      </FileInfo>
    </FileInfoBox>
  );
};

const FileInfoBox = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 18px;
  width: 472px;
  height: 66px;
  background-color: white;
`;

const FileInfo = styled.div`
  width: 472px;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  gap: 25px;
`;

const FileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileDetails = styled.div`
  width: 321px;
  height: 40px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const FileName = styled.div`
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileProperties = styled.div`
  height: 15px;
  display: flex;
  flex-direction: row;
  gap: 7px;
  font-size: 10px;
  font-weight: 400;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;

const TagAuthor = styled.div`
  width: 58px;
  height: 30px;
  border-radius: 5px;
  padding: 6px 11px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 13px;
  font-weight: 500;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-self: center;
`;
