// useTagInput.ts
import { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';

export const useTagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 추가
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    if (tag.trim() && tag.length <= 5) {
      setTags((prevTags) => [...prevTags, tag]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      addTag(inputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
    setIsFocused(false); // 포커스 해제 시 상태 업데이트
  };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      handleBlur();
    }
  };

  useEffect(() => {
    const eventHandler: EventListener = (e) =>
      handleClickOutside(e as unknown as MouseEvent);
    document.addEventListener('mousedown', eventHandler);
    return () => {
      document.removeEventListener('mousedown', eventHandler);
    };
  }, [inputValue]);

  return {
    tags,
    inputValue,
    setInputValue,
    inputRef,
    isFocused,
    addTag,
    removeTag,
    handleKeyDown,
    handleBlur,
    handleFocus
  };
};
