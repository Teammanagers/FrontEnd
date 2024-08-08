import styled from 'styled-components';
import Add from '@assets/management/add-button.svg';
import Delete from '@assets/management/delete-icon.svg';
import { TitleText } from '@components/management/team-code/TeamCode.tsx';
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';
import {
  people,
  PeopleDropDown
} from '@components/management/schedule/PeopleDropDown.tsx';

export const Schedule = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [dropDownPosition, setDropDownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const addBtnRef = useRef<HTMLDivElement>(null);

  const handleAddPerson = (personId: string) => {
    if (!selectedPeople.includes(personId)) {
      setSelectedPeople([...selectedPeople, personId]);
      setIsOpened(false);
    }
  };

  const handleAddBtnClick = () => {
    setIsOpened(true);
  };

  const handleDeleteBtnClick = (personId: string) => {
    setSelectedPeople(selectedPeople.filter((id) => id !== personId));
  };

  useEffect(() => {
    if (isOpened && addBtnRef.current) {
      const position = addBtnRef.current.getBoundingClientRect(); // top, left 값을 가져옴
      setDropDownPosition({ top: position.top, left: position.left });
    }
    console.log(addBtnRef);
    console.log(dropDownPosition);
  }, [isOpened, selectedPeople]);

  return (
    <Container>
      <ScheduleContainer>
        <TitleText>Schedule</TitleText>
        <PeopleContainer>
          <ContentText>현재 참여자들의 가능 시간: </ContentText>
          {selectedPeople.map((personId) => {
            const person = people.find((p) => p.id === personId);
            return (
              <Person key={personId}>
                <Name>{person?.name}</Name>
                <DeleteBtn
                  onClick={() => {
                    handleDeleteBtnClick(personId);
                  }}
                />
              </Person>
            );
          })}
          <AddBtnContainer ref={addBtnRef} onClick={handleAddBtnClick}>
            <AddBtn />
          </AddBtnContainer>
          {isOpened && (
            <DropDownContainer
              style={{
                position: 'absolute',
                top: `${dropDownPosition.top}px`,
                left: `${dropDownPosition.left}px`
              }}
            >
              <PeopleDropDown onAddPerson={handleAddPerson} />
            </DropDownContainer>
          )}
        </PeopleContainer>
      </ScheduleContainer>
      <SubmitBtn>내 스케줄 등록</SubmitBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 934px;
  margin-top: 17px;
  background: lightpink;
`;

const ScheduleContainer = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  background: lightcoral;
`;

const PeopleContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: mediumpurple;
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
  //background: forestgreen;
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

const SubmitBtn = styled.button`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  border: none;
  background: ${({ theme }) => theme.colors.mainBlue};
  margin-top: 13px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
