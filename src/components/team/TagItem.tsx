import styled from 'styled-components';
import CloseButton from '@assets/team/close-button.svg';

const TagItem = ({ tag, onRemove }: { tag: string; onRemove: () => void }) => (
  <Tag>
    {tag}
    <TagRemoveButton onClick={onRemove}>
      <CloseButton />
    </TagRemoveButton>
  </Tag>
);

export default TagItem;

const Tag = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  background-color: #f9fbff;
  border-radius: 5px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #5c9eff;
  padding: 0px 11px;
  margin-right: 8px;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0px;
  margin-top: 3px;
  margin-left: 5px;
  cursor: pointer;
`;
