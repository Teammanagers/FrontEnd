import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectedFeedback from '@assets/mypage/selected-feedback.svg';
import Dot from '@assets/mypage/dot.svg';
import { FileProps } from './FileProps';
import { Comment } from './Comment';
import { TextInput } from './TextInput';
import { createFeedback, getFeedback } from '@apis/share';
import { CommentData } from 'src/types/storage';

interface FeedbackSectionProps {
  teamId: number;
  isUploading: boolean;
  selectedFileId: number | null;
  files: FileProps[];
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  teamId,
  isUploading,
  selectedFileId,
  files
}) => {
  const [commentsMap, setCommentsMap] = useState<Record<number, CommentData[]>>(
    {}
  );
  const [feedbackContent, setFeedbackContent] = useState<string>('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackData = await getFeedback();
        console.log('피드백 데이터', feedbackData);

        // 피드백 데이터를 파일별로 맵핑
        const newCommentsMap: Record<number, CommentData[]> = {};

        feedbackData.result.forEach((comment) => {
          if (comment.parentId !== null) {
            if (!newCommentsMap[comment.parentId]) {
              newCommentsMap[comment.parentId] = [];
            }
            newCommentsMap[comment.parentId].push(comment);
          }
        });

        setCommentsMap(newCommentsMap);
      } catch (error) {
        console.error('피드백 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    // 함수 호출
    fetchFeedback();
  }, [teamId]);

  const formatDateTime = (date: Date) => {
    return date.toISOString().slice(0, 16).replace('T', ' ').replace(/-/g, '.');
  };

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10).replace(/-/g, '.');
  };

  const handleFeedbackSubmit = async () => {
    if (feedbackContent.trim() === '' || selectedFileId === null) return;

    try {
      const newComment: CommentData = {
        id: Date.now(),
        writer: '사용자',
        createdAt: formatDateTime(new Date()),
        content: feedbackContent,
        parentId: selectedFileId,
        replies: []
      };

      const feedbackData = {
        parentId: selectedFileId, // 피드백이 해당 파일에 연결되도록 설정
        content: feedbackContent
      };

      await createFeedback(teamId, feedbackData);

      // 피드백이 성공적으로 생성된 후, 로컬 상태 업데이트
      setCommentsMap((prevCommentsMap) => {
        const updatedComments = [
          ...(prevCommentsMap[selectedFileId] || []),
          newComment
        ];
        return {
          ...prevCommentsMap,
          [selectedFileId]: updatedComments
        };
      });

      setFeedbackContent('');
    } catch (error) {
      console.error('피드백 생성 실패:', error);
    }
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
    const selectedFile = files.find((file) => file.id === selectedFileId);
    const comments = commentsMap[selectedFileId] || [];

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
                            writer: '사용자',
                            createdAt: formatDateTime(new Date()),
                            content: replyContent,
                            parentId: commentId,
                            replies: []
                          } as CommentData
                        ]
                      }
                    : c
                );

                setCommentsMap((prevCommentsMap) => ({
                  ...prevCommentsMap,
                  [selectedFileId]: updatedComments
                }));
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
