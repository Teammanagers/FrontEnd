import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentData } from './CommentData';
import { TextInput } from './TextInput';
import UserImage from '@assets/share/user-image.svg';
import Dot from '@assets/mypage/dot.svg';

interface CommentProps {
  comment: CommentData;
  onReplySubmit: (commentId: number, replyContent: string) => void;
  isReply?: boolean;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onReplySubmit,
  isReply = false
}) => {
  const [replyContent, setReplyContent] = useState<string>('');
  const [isReplyInputVisible, setReplyInputVisible] = useState<boolean>(false);

  const handleReplyClick = () => {
    setReplyInputVisible(!isReplyInputVisible);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim() === '') return;

    onReplySubmit(comment.id, replyContent);
    setReplyContent('');
    setReplyInputVisible(false);
  };

  return (
    <CommentContainer isReply={isReply}>
      <CommentHeader>
        <UserImage />
        <Author>{comment.author}</Author> <Dot />
        <Role>{comment.role}</Role>
        <Dot />
        <Date>{comment.date}</Date>
      </CommentHeader>
      <CommentContent>{comment.content}</CommentContent>
      {!isReply && (
        <ReplyLink onClick={handleReplyClick}>
          {isReplyInputVisible ? '답글 취소' : '답글 달기'}
        </ReplyLink>
      )}
      {isReplyInputVisible && (
        <ReplyInputContainer>
          <TextInput
            placeholder="피드백 내용을 입력해주세요"
            value={replyContent}
            width="380px"
            onChange={(e) => setReplyContent(e.target.value)}
            onSubmit={handleReplySubmit}
          />
        </ReplyInputContainer>
      )}
      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReplySubmit={onReplySubmit}
          isReply={true}
        />
      ))}
    </CommentContainer>
  );
};

const CommentContainer = styled.div<{ isReply: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0px 18px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 3.04px;
`;

const Author = styled.span`
  font-weight: bold;
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  margin-left: 3.04px;
`;

const Role = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Date = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const CommentContent = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const ReplyLink = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
  cursor: pointer;
`;

const ReplyInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 24px;
  margin-top: 8px;
`;
