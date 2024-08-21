import styled from 'styled-components';
import Add from '@assets/management/add-button.svg';
import Delete from '@assets/management/delete-icon.svg';
import { TitleText } from '@components/management/team-code/TeamCode.tsx';
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';
import { PeopleDropDown } from '@components/management/schedule/PeopleDropDown.tsx';
import { getMembers } from '@apis/management.ts';
import { MemberTypes } from '../../../types/member.ts';

interface ScheduleProps {
  onAddSchedule: () => void;
  isSubmitted: boolean;
}

export const Schedule = ({ onAddSchedule, isSubmitted }: ScheduleProps) => {
  const [members, setMembers] = useState<MemberTypes[]>([]);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);
  const [dropDownPosition, setDropDownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const addBtnRef = useRef<HTMLDivElement>(null);

  const fetchMembers = async () => {
    const response = await getMembers(1);
    setMembers(response);
    setSelectedPeople(
      response.map((member: MemberTypes) => member.teamManageId)
    );
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const refreshMembers = async () => {
    await fetchMembers();
  };

  const handleAddPerson = (teamManageId: number) => {
    if (!selectedPeople.includes(teamManageId)) {
      setSelectedPeople([...selectedPeople, teamManageId]);
      setIsOpened(false);
    }
    console.log(teamManageId);
  };

  const handleAddBtnClick = () => {
    setIsOpened(true);
  };

  const handleDeleteBtnClick = (teamManageId: number) => {
    setSelectedPeople(selectedPeople.filter((id) => id !== teamManageId));
  };

  const handleSubmit = () => {
    onAddSchedule();
  };

  useEffect(() => {
    if (isOpened && addBtnRef.current) {
      const position = addBtnRef.current.getBoundingClientRect(); // top, left 값을 가져옴
      setDropDownPosition({ top: position.top, left: position.left });
    }
  }, [isOpened, selectedPeople]);

  return (
    <Container>
      <ScheduleContainer>
        <TitleText>Schedule</TitleText>
        <PeopleContainer>
          <ContentText>현재 참여자들의 가능 시간: </ContentText>
          {selectedPeople.map((teamManageId) => {
            const member = members.find((m) => m.teamManageId === teamManageId);
            return (
              <Person key={teamManageId}>
                <Name>{member?.name}</Name>
                <DeleteBtn
                  onClick={() => {
                    handleDeleteBtnClick(teamManageId);
                  }}
                />
              </Person>
            );
          })}
          {selectedPeople.length < members.length && (
            <AddBtnContainer ref={addBtnRef} onClick={handleAddBtnClick}>
              <AddBtn />
            </AddBtnContainer>
          )}
          {isOpened && (
            <DropDownContainer
              style={{
                top: `${dropDownPosition.top}px`,
                left: `${dropDownPosition.left}px`
              }}
            >
              <PeopleDropDown
                onAddPerson={handleAddPerson}
                selectedPeople={selectedPeople}
                members={members}
                refreshMembers={refreshMembers}
              />
            </DropDownContainer>
          )}
        </PeopleContainer>
      </ScheduleContainer>
      <SubmitBtn onClick={handleSubmit} isSubmitted={isSubmitted}>
        {isSubmitted ? '스케줄 수정' : '내 스케줄 등록'}
      </SubmitBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 934px;
  margin-top: 17px;
`;

const ScheduleContainer = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PeopleContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentText = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

const Person = styled.div`
  width: 61px;
  height: 24px;
  border-radius: 3px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  overflow: hidden;
`;

const Name = styled.span`
  width: 25px;
  font-size: 9px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.mainBlue};
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteBtn = styled(Delete)<ButtonHTMLAttributes<HTMLButtonElement>>`
  padding-top: 1px;
  cursor: pointer;
`;

const AddBtnContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const AddBtn = styled(Add)<ButtonHTMLAttributes<HTMLButtonElement>>`
  cursor: pointer;
`;

const DropDownContainer = styled.div`
  position: absolute;
`;

const SubmitBtn = styled.button<{ isSubmitted: boolean }>`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  border: ${({ theme, isSubmitted }) =>
    isSubmitted ? `1px solid ${theme.colors.mainBlue}` : 'none'};
  background: ${({ theme, isSubmitted }) =>
    isSubmitted ? 'white' : theme.colors.mainBlue};
  margin-top: 13px;
  color: ${({ theme, isSubmitted }) =>
    isSubmitted ? theme.colors.mainBlue : 'white'};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
