import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import AddTag from '@assets/mypage/add-tag.svg';
import DeleteTag from '@assets/mypage/delete-tag.svg';

interface UseTagsReturn {
  tags: string[];
  newTag: string;
  editTagIndex: number | null;
  showTagInput: boolean;
  setNewTag: (value: string) => void;
  handleTagKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleEditTag: (index: number) => void;
  handleDeleteTag: (e: MouseEvent, index: number) => void;
  addTag: () => void;
}

export const useTags = (): UseTagsReturn => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null);
  const [showTagInput, setShowTagInput] = useState<boolean>(false);

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      if (editTagIndex !== null) {
        const updatedTags = [...tags];
        updatedTags[editTagIndex] = newTag.trim();
        setTags(updatedTags);
        setEditTagIndex(null);
      } else {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleEditTag = (index: number) => {
    setEditTagIndex(index);
    setNewTag(tags[index]);
    setShowTagInput(true);
  };

  const handleDeleteTag = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    setTags(tags.filter((_, i) => i !== index));
    setEditTagIndex(null);
    setNewTag('');
  };

  const addTag = () => {
    setShowTagInput(true);
    setEditTagIndex(null);
  };

  return {
    tags,
    newTag,
    editTagIndex,
    showTagInput,
    setNewTag,
    handleTagKeyDown,
    handleEditTag,
    handleDeleteTag,
    addTag
  };
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

const TagContainer = styled.div`
  box-sizing: border-box;
  height: 24px;
  border-radius: 3px;
  padding: 8px 6px;
  gap: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  font-weight: 500;
  cursor: pointer;
`;

const TagInputContainer = styled.div`
  height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const TagInput = styled.input`
  width: 78px;
  height: 14px;
  color: ${({ theme }) => theme.colors.mainBlue};
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  font-size: 9px;
  font-weight: 500;
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

interface TagSectionProps {
  title: string;
  useTagsHook: UseTagsReturn;
}

export const TagSection: React.FC<TagSectionProps> = ({
  title,
  useTagsHook
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
    addTag
  } = useTagsHook;

  return (
    <ProjectBox>
      <TagsTitle>{title}</TagsTitle>
      <Tags>
        {tags.map((tag, index) => (
          <TagContainer key={index} onClick={() => handleEditTag(index)}>
            {editTagIndex === index ? (
              <TagInputContainer>
                <TagInput
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
          <TagInputContainer>
            <TagInput
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              maxLength={5}
              autoFocus
            />
            <DeleteBtn onClick={(e) => handleDeleteTag(e, -1)} />
          </TagInputContainer>
        )}
        {!showTagInput && tags.length < 3 && <AddTagBtn onClick={addTag} />}
      </Tags>
    </ProjectBox>
  );
};

const ProjectBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const TagsTitle = styled.h4`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
`;
