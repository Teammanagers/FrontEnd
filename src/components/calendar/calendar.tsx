import { useState } from 'react';
import { StyledCalendarWrapper, StyledCalendar } from './styles';
import moment from 'moment';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        locale="en-US"
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format('D')} // MM일 제거 -> 숫자만 보이게
        formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
        next2Label={null} // 년도 이동 버튼 숨기기
        prev2Label={null} // 년도 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
      />
    </StyledCalendarWrapper>
  );
};

export default Calendar;
