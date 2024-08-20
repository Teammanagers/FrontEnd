import { useState, KeyboardEvent, MouseEvent } from 'react';

export interface UseTagsReturn {
  tags: string[];
  newTag: string;
  editTagIndex: number | null;
  showTagInput: boolean;
  setNewTag: (value: string) => void;
  handleTagKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleEditTag: (index: number) => void;
  handleDeleteTag: (e: MouseEvent, index: number) => void;
  handleAddTag: () => void;
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

  const handleAddTag = () => {
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
    handleAddTag
  };
};
