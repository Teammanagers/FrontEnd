import styled from 'styled-components';
import MenuIcon from '@assets/memo/menu-icon.svg';
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';
import { MenuBar } from '@components/memo/MenuBar.tsx';
import { MemoProps, TagProps } from '../../types/memo.ts';

interface Memo extends MemoProps {
  memoId: number;
}

export const Memo = ({ memo }: { memo: Memo }) => {
  const { title, tagList, content, memoId } = memo;
  const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuBar = () => {
    setIsOpenedMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (
        isOpenedMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpenedMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutSideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [isOpenedMenu]);

  return (
    <MemoContainer>
      <MemoTitleContainer>
        <MemoTitle length={title.length}>{title}</MemoTitle>
        <MenuBtn onClick={handleMenuBar} />
        {isOpenedMenu && (
          <MenuBarContainer ref={menuRef}>
            <MenuBar memoId={memoId} />
          </MenuBarContainer>
        )}
      </MemoTitleContainer>
      <TagContainer>
        {tagList.map((tag: TagProps) => (
          <TagBox key={tag.tagId}>{tag.name}</TagBox>
        ))}
      </TagContainer>
      <MemoContentContainer>
        <Content length={content.length}>{content}</Content>
      </MemoContentContainer>
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 200px;
  border-radius: 6px;
  gap: 9px;
  background: white;
`;

const MemoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 314px;
  height: 21px;
  position: relative;
`;

const MenuBarContainer = styled.div`
  position: absolute;
  top: 1.5px;
  right: 0;
`;

const MenuBtn = styled(MenuIcon)<ButtonHTMLAttributes<HTMLButtonElement>>`
  cursor: pointer;
`;

const MemoTitle = styled.h1<{ length: number }>`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  max-width: ${({ length }) => (length > 20 ? '35ch' : length)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagContainer = styled.div`
  display: flex;
  width: 314px;
  height: 21px;
  gap: 6px;
`;

const TagBox = styled.div`
  width: auto;
  padding: 0 6px 0 6px;
  height: 21px;
  border: 3px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.colors.mainBlue};
  font-weight: 500;
  font-size: 9px;
  line-height: 14px;
`;

const MemoContentContainer = styled.div`
  width: 314px;
  height: 115px;
`;

const Content = styled.p<{ length: number }>`
  font-size: 10px;
  line-height: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
  margin: 0;
  white-space: nowrap;
  max-width: ${({ length }) => (length > 50 ? `{length}ch` : length)};
  overflow: hidden;
  text-overflow: ellipsis;
`;
