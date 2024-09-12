import styled from 'styled-components';
import { useState } from 'react';
import { MemberTypes } from '../../../types/member.ts';

interface PeopleDropDownProps {
  onAddPerson: (personId: number) => void;
  selectedPeople: number[];
  members: MemberTypes[];
  refreshMembers: () => void;
}

export const PeopleDropDown = ({
  onAddPerson,
  selectedPeople,
  members,
  refreshMembers
}: PeopleDropDownProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <DropDownContainer>
      {members.map((member) => (
        <NameContainer
          onMouseEnter={() => {
            setHoveredId(member.teamManageId);
          }}
          onMouseLeave={() => {
            setHoveredId(null);
          }}
          onClick={() => {
            onAddPerson(member.teamManageId);
            refreshMembers();
          }}
          key={member.teamManageId}
        >
          <Name
            hover={hoveredId === member.teamManageId}
            isSelected={selectedPeople.includes(member.teamManageId)}
          >
            {member.name}
          </Name>
        </NameContainer>
      ))}
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: absolute;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 6px 0 6px 0;
  border-radius: 3px;
  box-shadow: 0 1.52px 9.12px 0 rgba(0, 0, 0, 0.1);
  background: white;
`;

const NameContainer = styled.div`
  width: 90px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Name = styled.span<{ hover: boolean; isSelected: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  line-height: 14px;
  text-align: left;
  font-size: 12px;
  color: ${({ theme, hover, isSelected }) =>
    hover
      ? theme.colors.mainBlue
      : isSelected
        ? theme.colors.gray
        : theme.colors.black};
`;
