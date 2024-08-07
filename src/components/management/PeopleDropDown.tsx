import styled from 'styled-components';
import { useState } from 'react';

export const people = [
  { id: '0', name: '이예은' },
  { id: '1', name: '김도헌' },
  { id: '2', name: '홍길동' },
  { id: '3', name: '김이박' },
  { id: '4', name: '김봄' },
  { id: '5', name: '김여름' },
  { id: '6', name: '김가을' },
  { id: '7', name: '김겨울' },
  { id: '8', name: 'abc' },
  { id: '9', name: '할말있어보자하곤아무말없이마주앉아' }
];

export const PeopleDropDown = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      <DropDownContainer>
        {people.map((person) => (
          <NameContainer
            onMouseEnter={() => {
              setHoveredId(person.id);
            }}
            onMouseLeave={() => {
              setHoveredId(null);
            }}
            key={person.id}
          >
            <Name hover={hoveredId === person.id}>{person.name}</Name>
          </NameContainer>
        ))}
      </DropDownContainer>
    </>
  );
};

const DropDownContainer = styled.div`
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 6px 0 6px 0;
  border-radius: 3px;
  box-shadow: 0 1.52px 9.12px 0 rgba(0, 0, 0, 0.1);
`;

const NameContainer = styled.div`
  width: 58px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Name = styled.span<{ hover: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  line-height: 14px;
  text-align: left;
  font-size: 9px;
  // 이미 추가된 팀원이 디폴트, 추가 안된 팀원은 검정, 마우스호버시 파랑
  color: ${({ theme, hover }) =>
    hover ? theme.colors.mainBlue : theme.colors.gray};
`;
