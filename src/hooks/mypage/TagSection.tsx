import React from 'react';
import styled from 'styled-components';
import { UseTagsReturn } from '@hooks/mypage/useTags';
import DeleteTag from '@assets/mypage/delete-tag.svg';
import AddTag from '@assets/mypage/add-tag.svg';

interface TagSectionProps {
  title: string;
  useTagsHook: UseTagsReturn;
  tagHeight?: string;
  tagFontSize?: string;
  tagBackgroundColor?: string;
  tagPadding?: string;
}

export const TagSection: React.FC<TagSectionProps> = ({
  title,
  useTagsHook,
  tagHeight = '24px',
  tagPadding = '8px 6px',
  tagFontSize = '9px',
  tagBackgroundColor = '#f9fbff'
}) => {
  const {
    tags,
    newTag,
    editTagIndex,
    showTagInput,
    setNewTag,
    handleTagKeyDown,
    handleEditTag,
    handleDeleteTag,
    handleAddTag
  } = useTagsHook;

  return (
    <ProjectBox>
      <TagsTitle>{title}</TagsTitle>
      <Tags>
        {tags.map((tag, index) => (
          <TagContainer
            key={index}
            onClick={() => handleEditTag(index)}
            tagHeight={tagHeight}
            tagFontSize={tagFontSize}
            tagBackgroundColor={tagBackgroundColor}
            tagPadding={tagPadding}
          >
            {editTagIndex === index ? (
              <TagInputContainer tagHeight={tagHeight}>
                <TagInput
                  tagFontSize={tagFontSize}
                  tagHeight={tagHeight}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  maxLength={5}
                  autoFocus
                />
                <DeleteBtn onClick={(e) => handleDeleteTag(e, index)} />
              </TagInputContainer>
            ) : (
              <span>{tag}</span>
            )}
          </TagContainer>
        ))}
        {showTagInput && editTagIndex === null && (
          <TagInputContainer tagHeight={tagHeight}>
            <TagInput
              tagFontSize={tagFontSize}
              tagHeight={tagHeight}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              maxLength={5}
              autoFocus
            />
            <DeleteBtn onClick={(e) => handleDeleteTag(e, -1)} />
          </TagInputContainer>
        )}
        {!showTagInput && tags.length < 3 && (
          <AddTagBtn onClick={handleAddTag} />
        )}
      </Tags>
    </ProjectBox>
  );
};

const Tags = styled.div`
  box-sizing: border-box;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: 8px 0px;
`;

const TagContainer = styled.div<{
  tagHeight: string;
  tagFontSize: string;
  tagBackgroundColor: string;
  tagPadding: string;
}>`
  box-sizing: border-box;
  height: ${({ tagHeight }) => tagHeight};
  border-radius: 3px;
  padding: ${({ tagPadding }) => tagPadding};
  gap: 8px;
  background: ${({ tagBackgroundColor }) => tagBackgroundColor};
  color: ${({ theme }) => theme.colors.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ tagFontSize }) => tagFontSize};
  font-weight: 500;
  cursor: pointer;
`;

const TagInputContainer = styled.div<{ tagHeight: string }>`
  height: ${({ tagHeight }) => tagHeight};
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const TagInput = styled.input<{ tagFontSize: string; tagHeight: string }>`
  width: 70px;
  height: ${({ tagHeight }) => tagHeight};
  color: ${({ theme }) => theme.colors.mainBlue};
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  font-size: ${({ tagFontSize }) => tagFontSize};
  font-weight: 500;
  padding-left: 10px;
`;

const DeleteBtn = styled(DeleteTag)<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  position: absolute;
  right: 3px;
  width: 24px;
  height: 24px;
`;

const AddTagBtn = styled(AddTag)<React.ButtonHTMLAttributes<HTMLButtonElement>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ProjectBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const TagsTitle = styled.h4`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
`;
