import React, { useState } from 'react';
import styled from 'styled-components';
import SelectedFeedback from '@assets/mypage/selected-feedback.svg';
import Dot from '@assets/mypage/dot.svg';
import { FileProps } from './FileProps';
import { Comment } from './Comment';
import { CommentData } from './CommentData';
import { TextInput } from './TextInput';

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
  const [comments, setComments] = useState<CommentData[]>([]);
  const [feedbackContent, setFeedbackContent] = useState<string>('');

  // 전체 날짜와 시간을 포맷하는 함수
  const formatDateTime = (date: Date) => {
    return date.toISOString().slice(0, 16).replace('T', ' ').replace(/-/g, '.');
  };

  // 날짜만 포맷하는 함수
  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10).replace(/-/g, '.');
  };

  const handleFeedbackSubmit = () => {
    if (feedbackContent.trim() === '') return;

    const newComment: CommentData = {
      id: Date.now(),
      author: '사용자',
      role: '역할',
      //   date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      date: formatDateTime(new Date()),
      content: feedbackContent,
      replies: []
    };

    setComments([...comments, newComment]);
    setFeedbackContent('');
  };

  if (isUploading) {
    return (
      <FeedbackInfoBox>
        <InfoText>자료에 대한 피드백을 남길 수 있습니다. </InfoText>
        <AddFeedbackField>
          <IconContainer>
            <SelectedFeedback />
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
          <TitleField>{selectedFile?.name}</TitleField>
          <Properties>
            {selectedFile?.size} <Dot />{' '}
            {selectedFile?.date ? formatDate(new Date(selectedFile.date)) : ''}
          </Properties>
          <TagAuthor>{selectedFile?.author}</TagAuthor>
        </InfoField>
        <WriteField>
          <TextInput
            placeholder="피드백 내용을 입력해주세요"
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            onSubmit={handleFeedbackSubmit}
          />
        </WriteField>
        <CommentsSection>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReplySubmit={(commentId, replyContent) => {
                const updatedComments = comments.map((c) =>
                  c.id === commentId
                    ? {
                        ...c,
                        replies: [
                          ...c.replies,
                          {
                            id: Date.now(),
                            author: '사용자',
                            role: '역할',
                            date: formatDateTime(new Date()),
                            content: replyContent,
                            replies: []
                          }
                        ]
                      }
                    : c
                );
                setComments(updatedComments);
              }}
            />
          ))}
        </CommentsSection>
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
  box-sizing: border-box;
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
  display: flex;
  flex-direction: row;
  gap: 19px;
  justify-content: flex-start;
  align-items: center;
`;

const TitleField = styled.div`
  height: 27px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Properties = styled.div`
  height: 15px;
  display: flex;
  flex-direction: row;
  gap: 7px;
  font-size: 10px;
  font-weight: 400;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const TagAuthor = styled.div`
  width: 38px;
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
  align-items: center;
`;

const WriteField = styled.div`
  width: 486.4px;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const CommentsSection = styled.div`
  width: 486px;
  padding: 13px 0px;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
