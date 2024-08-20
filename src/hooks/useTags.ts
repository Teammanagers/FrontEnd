import { KeyboardEvent, useEffect, useState } from 'react';
import { TeamTag } from '../types/management.ts';

interface TagsProps {
  initialTags?: TeamTag[];
  onEditTag?: (tagId: number, newName: string) => void;
  onCreateTag?: (name: string) => void;
}

export const useTags = ({
  initialTags = [],
  onEditTag,
  onCreateTag
}: TagsProps) => {
  const [tags, setTags] = useState<TeamTag[]>(initialTags); // 태그 업데이트
  const [showTagInput, setShowTagInput] = useState<boolean>(false); // 태그 입력 인풋창 보여줄지
  const [newTag, setNewTag] = useState<string>(''); // 새로운 태그 입력값
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null); // 태그 수정시 인덱스값

  const handleAddTag = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      if (onCreateTag) {
        await onCreateTag(newTag.trim());
      }
      setTags([...tags, { tagId: Date.now(), name: newTag.trim() }]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleEditTag = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      const updatedTags = [...tags];
      const tagId = updatedTags[index].tagId; // 기존 태그의 ID를 유지
      updatedTags[index] = { tagId, name: newTag.trim() };
      setTags(updatedTags);
      setEditTagIndex(null);
      setNewTag('');
      setShowTagInput(false);

      if (tagId !== undefined && onEditTag) {
        onEditTag(tagId, newTag.trim()); // 태그 업데이트 함수 호출
      }
    }
  };

  const startEditingTag = (index: number) => {
    setEditTagIndex(index);
    setNewTag(tags[index].name);
    setShowTagInput(true);
  };

  const handleDeleteTag = (index: number) => {
    setTags((prevTags) => {
      const updatedTags = prevTags.filter((_, i) => i !== index);
      setEditTagIndex(null);
      setNewTag('');
      return updatedTags;
    });
  };

  useEffect(() => {
    if (tags.length < 3) {
      setShowTagInput(false);
    }
  }, [tags]);

  return {
    tags,
    showTagInput,
    newTag,
    editTagIndex,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    handleDeleteTag,
    setTags,
    setShowTagInput,
    setEditTagIndex,
    setNewTag
  };
};
