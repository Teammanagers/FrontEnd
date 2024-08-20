import { KeyboardEvent, useEffect, useState } from 'react';

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([]); // 태그 업데이트
  const [showTagInput, setShowTagInput] = useState<boolean>(false); // 태그 입력 인풋창 보여줄지
  const [newTag, setNewTag] = useState<string>(''); // 새로운 태그 입력값
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null); // 태그 수정시 인덱스값

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleEditTag = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      const updatedTags = [...tags];
      updatedTags[index] = newTag.trim();
      setTags(updatedTags);
      setEditTagIndex(null);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const startEditingTag = (index: number) => {
    setEditTagIndex(index);
    setNewTag(tags[index]);
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
