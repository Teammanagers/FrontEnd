import styled from 'styled-components';
import { ButtonHTMLAttributes, useState } from 'react';
import Add from '@assets/management/add-button.svg';

const generateTimeOptions = (): string[] => {
  const options: string[] = [];
  for (let i = 0; i < 24 * 2; i++) {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    options.push(`${hours.toString().padStart(2, '0')}:${minutes}`);
  }
  return options;
};

export interface TimeSlot {
  start: string;
  end: string;
}

interface TimeSelectorProps {
  day: string;
  onChange: (day: string, times: TimeSlot[]) => void;
}

export const TimeSelector = ({ day, onChange }: TimeSelectorProps) => {
  const [times, setTimes] = useState<TimeSlot[]>([]);
  const timeOptions = generateTimeOptions();

  const handleAddTime = () => {
    if (times.length < 3) {
      const newTimes = [...times, { start: '00:00', end: '00:00' }];
      setTimes(newTimes);
      // setShowDropdown([...showDropdown, false]);
      onChange(day, newTimes);
    }
  };

  const handleTimeChange = (
    index: number,
    type: 'start' | 'end',
    value: string
  ) => {
    const newTimes = times.map((time, i) =>
      // 변경할 시간의 index와 현재반복중인 시간의 i 비교 -> 일치할 때 특정 시간 슬롯 업데이트
      i === index ? { ...time, [type]: value } : time
    );
    setTimes(newTimes);
    onChange(day, newTimes);
  };

  return (
    <DayContainer>
      <DayText>{day}</DayText>
      <TimeContainer>
        {times.map((time, index) => (
          <TimeSelectorContainer key={index}>
            <TimeDropDown
              value={time.start}
              onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
            >
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TimeDropDown>
            <SwungDash>~</SwungDash>
            <TimeDropDown
              value={time.end}
              onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
            >
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TimeDropDown>
          </TimeSelectorContainer>
        ))}
        {times.length < 3 && <AddBtn onClick={handleAddTime} />}
      </TimeContainer>
    </DayContainer>
  );
};

const DayContainer = styled.div`
  width: 911px;
  height: 28px;
  display: flex;
  align-items: center;
  //background: greenyellow;
`;

const DayText = styled.p`
  width: 70px;
  font-size: 13px;
  font-weight: 500;
  line-height: 19.5px;
  margin-right: 19px;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddBtn = styled(Add)<ButtonHTMLAttributes<HTMLButtonElement>>`
  cursor: pointer;
`;

const TimeSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5px;
`;

const TimeDropDown = styled.select`
  width: 70px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 5px;
  font-size: 14px;
`;

const SwungDash = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;
