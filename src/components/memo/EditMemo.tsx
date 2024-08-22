import styled from 'styled-components';
import BackButton from '@assets/memo/back-button.svg';
import AddTag from '@assets/memo/add-tag-icon.svg';
import {
  DeleteBtn,
  TagInputContainer
} from '@components/management/team-code/TeamCode.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useTags } from '@hooks/useTags.ts';
import { deleteMemo, getMemoById, updateMemo } from '@apis/memo.ts';
import { DeleteMemoModal } from '@components/memo/DeleteMemoModal.tsx';

export const EditMemo = () => {
  const { memoId } = useParams<{ memoId: string }>(); // useParams는 string 형태만 받아올 수 있음..
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const {
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
  } = useTags({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemo = async () => {
      if (memoId) {
        try {
          const response = await getMemoById(Number(memoId));
          const memo = response.result.memo;

          setTitle(memo.title);
          setContent(memo.content);
          setTags([
            ...tags,
            memo.tagList.map((tag: { name: string }) => tag.name)
          ]);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchMemo();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteMemo(Number(memoId));
      setIsOpenedModal(false);
      navigate(`/memo`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    setIsOpenedModal(true);
  };

  const closeModal = () => {
    setIsOpenedModal(false);
  };

  // 수정한 메모 등록
  const handleSubmit = async () => {
    try {
      if (memoId) {
        const tagNames = tags.map((tag) => tag.name);
        await updateMemo(Number(memoId), title, tagNames, content);
      }
      navigate(`/memo`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <MemoContainer>
        <TopContainer>
          <BackBtn onClick={() => navigate(-1)} />
          {/* 제목 */}
          <TitleContainer>
            <TitleInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              placeholder="제목을 입력해주세요"
              autoFocus
            />
          </TitleContainer>

          {/* 태그 */}
          <TagContainer>
            {tags.map((tag, index) => (
              <Tag key={index} onClick={() => startEditingTag(index)}>
                {/* 태그 수정 */}
                {editTagIndex === index ? (
                  <TagInputContainer>
                    <TagInput
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => handleEditTag(e, index)}
                      maxLength={5}
                      autoFocus
                    />
                    <DeleteBtn onClick={() => handleDeleteTag(index)} />
                  </TagInputContainer>
                ) : (
                  <>
                    <span>{tag}</span>
                  </>
                )}
              </Tag>
            ))}
            {showTagInput && editTagIndex === null && (
              <TagInputContainer>
                {/* 태그 생성 */}
                <TagInput
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  maxLength={5}
                  autoFocus
                />
                <DeleteBtn
                  onClick={() => {
                    handleDeleteTag(-1);
                  }}
                />
              </TagInputContainer>
            )}
            {!showTagInput && tags.length < 3 && (
              <AddTagBtn
                onClick={() => {
                  setShowTagInput(true);
                  setEditTagIndex(null);
                }}
              >
                <AddTag />
              </AddTagBtn>
            )}
          </TagContainer>
        </TopContainer>

        {/* 내용 */}
        <BottomContainer>
          <ContentText
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={10000}
            placeholder="내용을 입력해주세요"
          />
          <ButtonContainer>
            <DeleteButton type="submit" onClick={handleModal}>
              메모 삭제
            </DeleteButton>
            {isOpenedModal && (
              <DeleteMemoModal onClose={closeModal} onDelete={handleDelete} />
            )}
            <EditButton type="submit" onClick={handleSubmit}>
              메모 수정
            </EditButton>
          </ButtonContainer>
        </BottomContainer>
      </MemoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 1280px;
  height: 820px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemoContainer = styled.div`
  width: 1094px;
  height: 638px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const TopContainer = styled.div`
  width: 985px;
  height: 146px;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

const BackBtn = styled(BackButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
  width: 36px;
  height: 36px;
  display: flex;
  align-self: flex-start;
  margin-bottom: 9px;
  padding: 0;
  cursor: pointer;
  border: none;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 27px;
  font-weight: 700;
  font-size: 18px;
  border: none;
  background: none;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 49px;
  border-top: 0.8px solid ${(props) => props.theme.colors.lightGray};
  border-bottom: 0.8px solid ${(props) => props.theme.colors.lightGray};
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Tag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.background};
  color: ${(props) => props.theme.colors.mainBlue};
  font-size: 9px;
  font-weight: 500;
  line-height: 14px;
  cursor: pointer;
`;

const TagInput = styled.input`
  width: 50px;
`;

const AddTagBtn = styled.div`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentText = styled.textarea`
  width: 985px;
  height: 347px;
  border: none;
  font-size: 15px;
  line-height: 23px;
  background: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 19px;
  margin-top: 19px;
  justify-content: flex-end;
`;

const Btn = styled.button`
  width: 157px;
  height: 36px;
  border-radius: 3px;
  border: none;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
`;

const DeleteButton = styled(Btn)`
  border: 1px solid ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.red};
  background: white;
`;

const EditButton = styled(Btn)`
  background: ${({ theme }) => theme.colors.mainBlue};
  color: white;
`;
