import React from 'react';
import styled from 'styled-components';
import Feedback from '@assets/mypage/feedback.svg';
import { FileProps } from './FileProps';

interface FeedbackSectionProps {
  isUploading: boolean;
  selectedFileId: number | null;
  files: FileProps[];
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  isUploading,
  selectedFileId,
  files
}) => {
  if (isUploading) {
    return (
      <FeedbackInfoBox>
        <InfoText>자료에 대한 피드백을 남길 수 있습니다. </InfoText>
        <AddFeedbackField>
          <IconContainer>
            <Feedback />
          </IconContainer>
          <AddText>피드백</AddText>
        </AddFeedbackField>
      </FeedbackInfoBox>
    );
  }

  if (files.length === 0) {
    return (
      <FeedbackEmptyState>아직 피드백 남길 자료가 없습니다.</FeedbackEmptyState>
    );
  }

  if (selectedFileId !== null) {
    const selectedFile = files.find((files) => files.id === selectedFileId);

    return (
      <SelectedField>
        <InfoField>
          <TextField>
            <div className="fileName">{selectedFile?.name}</div>
          </TextField>
        </InfoField>
        <WriteField></WriteField>
      </SelectedField>
    );
  }

  return <FeedbackEmptyState>피드백할 파일을 선택하세요.</FeedbackEmptyState>;
};

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

const FeedbackEmptyState = styled.div`
  width: 198px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
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

const AddText = styled.div`
  width: 70px;
  height: 18px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
