import React from 'react';
import styled from 'styled-components';
import Dot from '@assets/mypage/dot.svg';
import SelectedFeedback from '@assets/mypage/selected-feedback.svg';
import DefaultFeedback from '@assets/share/default-feedback.svg';
import Word from '@assets/share/word.svg';
import Ppt from '@assets/mypage/ppt.svg';
import Image from '@assets/share/image.svg';
import { FileProps } from './FileProps';

interface FileItemProps {
  file: FileProps;
  onFileSelect: (id: number) => void;
  isSelected: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  onFileSelect,
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
      case 'ppt':
      case 'pptx':
        return <Ppt />;
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
      <StartFeedback
        onClick={() => onFileSelect(file.id)}
        isSelected={isSelected}
      >
        {isSelected ? <SelectedFeedback /> : <DefaultFeedback />}
        <ButtonText>피드백</ButtonText>
      </StartFeedback>
    </FileInfoBox>
  );
};

const FileInfoBox = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 18px;
  width: 486px;
  height: 66px;
  background-color: white;
`;

const FileInfo = styled.div`
  width: 390px;
  border-radius: 6px;
  border: 0.76px solid ${({ theme }) => theme.colors.lightGray};
  padding: 12px 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const StartFeedback = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 78px;
  border-radius: 6px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.background : 'white'};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.black : theme.colors.darkGray};
  border: 0.76px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.colors.mainBlue : theme.colors.lightGray};
`;

const ButtonText = styled.div`
  font-size: 9px;
  font-weight: 400;
`;
