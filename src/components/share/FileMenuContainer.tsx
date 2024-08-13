import React from 'react';
import styled from 'styled-components';
import AddFile from '@assets/mypage/add-file.svg';
import SmallAdd from '@assets/mypage/small-add.svg';
import { FileProps } from './FileProps';
import { FileItem } from './FileItem';

interface FileMenuContainerProps {
  files: FileProps[];
  onFileSelect: (id: number) => void;
  onFileAdd: () => void;
}

export const FileMenuContainer: React.FC<FileMenuContainerProps> = ({
  files,
  onFileSelect,
  onFileAdd
}) => {
  return (
    <Container>
      {files.length === 0 ? (
        <EmptyState>
          <EmptyText>
            파일을 드래그하거나 아래 버튼을 클릭하여 파일을 추가할 수 있습니다
          </EmptyText>
          <AddFileField onClick={onFileAdd}>
            <IconContainer>
              <AddFile />
            </IconContainer>
            <AddFileText>파일 추가하기</AddFileText>
          </AddFileField>
        </EmptyState>
      ) : (
        <>
          {files.map((file) => (
            <FileItem key={file.id} file={file} onFileSelect={onFileSelect} />
          ))}
          <AddFileButton onClick={onFileAdd}>
            <AddText>파일 추가하기</AddText>
            <SmallAdd />
          </AddFileButton>
        </>
      )}
    </Container>
  );
};

// Styled Components
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
