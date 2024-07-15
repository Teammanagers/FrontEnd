import { useState } from 'react';
import { StyledCalendarWrapper, StyledCalendar } from './styles';
import moment from 'moment';
import Modal from './Modal';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const formatShortWeekday = (
    locale: string | undefined,
    date: Date
  ): string => {
    const weekdaysShort = moment.weekdaysShort();
    const weekdayIndex = moment(date).weekday();
    const weekdayShort = weekdaysShort[weekdayIndex];
    return (
      weekdayShort.charAt(0).toUpperCase() +
      weekdayShort.slice(1, 3).toLowerCase()
    );
  };

  return (
    <StyledCalendarWrapper>
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
        formatShortWeekday={formatShortWeekday}
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
        next2Label={null} // 년도 이동 버튼 숨기기
        prev2Label={null} // 년도 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
      />
      <div>{moment(date).format('YYYY년 MM월 DD일')}</div>
      <Modal />
    </StyledCalendarWrapper>
  );
};

export default Calendar;
