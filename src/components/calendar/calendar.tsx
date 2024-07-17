import { useEffect, useState } from 'react';
import { StyledCalendarContainer, StyledCalendar } from './styles';
import moment from 'moment';
import Modal from './Modal';
import { ScheduleInfo } from './types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [schedule, setSchedule] = useState<ScheduleInfo | null>({
    date: '',
    title: '',
    memo: ''
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <StyledCalendarContainer>
      <StyledCalendar
        locale="en-US"
        value={date}
        onChange={handleDateChange}
        formatDay={(locale: string | undefined, date: Date) =>
          moment(date).format('D')
        } // MM일 제거 -> 숫자만 보이게
        formatYear={(locale: string | undefined, date: Date) =>
          moment(date).format('YYYY')
        } // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale: string | undefined, date: Date) =>
          moment(date).format('YYYY. MM')
        } // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
        next2Label={null} // 년도 이동 버튼 숨기기
        prev2Label={null} // 년도 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
      />
      {date && (
        <Modal
          date={date}
          setSchedule={setSchedule}
          onClose={() => setDate(null)}
          isOpen={isModalOpen}
        />
      )}
    </StyledCalendarContainer>
  );
};

export default Calendar;
