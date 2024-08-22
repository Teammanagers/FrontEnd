import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { EventType, Value } from '../../types/calendar';
import NextBtn from '@assets/calendar/next-btn.svg';
import PrevBtn from '@assets/calendar/prev-btn.svg';
import { useMemberStore } from '@store/memberStore';
import { useCalendarStore } from '@store/calendarStore';
import { getTeamMember } from '@apis/calendar';
import EventPopover from './EventPopover';
import { syncCalendarEvent } from '@utils/calendarUtils';
import { useIdStore } from '@store/idStore';

const EventCalendar = () => {
  const { teamId } = useIdStore((state) => ({
    teamId: state.teamId
  }));
  const setTeamMember = useMemberStore((state) => state.setTeamMember);
  const {
    searchMonth,
    setSearchMonth,
    eventList,
    setEventList,
    setUpcomingEventList
  } = useCalendarStore((state) => ({
    searchMonth: state.searchMonth,
    setSearchMonth: state.setSearchMonth,
    eventList: state.eventList,
    setEventList: state.setEventList,
    setUpcomingEventList: state.setUpcomingEventList
  }));
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [calendarHeight, setCalendarHeight] = useState<string>('520px');

  // 날짜 업데이트
  const handleDateChange = (newDate: Value) => {
    setSelectedDate(newDate);
  };

  // 멤버 불러오기
  useEffect(() => {
    const fetchMember = async () => {
      const response = await getTeamMember(teamId);
      setTeamMember(response.data.result.teamMember);
    };

    fetchMember();
  }, []);

  // 월 업데이트
  const updateMonth = (activeStartDate: Date | null) => {
    setSelectedDate(activeStartDate);
    if (activeStartDate) {
      setSearchMonth(activeStartDate?.getMonth() + 1);
    }
  };
  useEffect(() => {
    setSelectedDate(null);
    // 현재 날짜 기준으로 초기 월 설정
    updateMonth(new Date());
  }, []);

  // 일정 변동사항 업데이트
  useEffect(() => {
    syncCalendarEvent({
      teamId,
      searchMonth,
      setEventList,
      setUpcomingEventList
    });
  }, [searchMonth]);

  // 매월 몇 주인지 구하기 -> 5,6주일 때 height 변화
  useEffect(() => {
    const getWeeksInMonth = (date: Date) => {
      // 해당 달의 첫째 날의 요일
      const firstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getDay();

      // 해당 달의 마지막 날
      const lastDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();

      return Math.ceil((firstDay + lastDate) / 7);
    };

    const determineWeeksInMonth = (value: Value) => {
      if (value instanceof Date) {
        return getWeeksInMonth(value);
      } else if (Array.isArray(value) && value[0] instanceof Date) {
        return getWeeksInMonth(value[0]);
      }
      // value가 Date, 배열 둘다 아닌 경우
      else {
        return getWeeksInMonth(new Date());
      }
    };

    const week = determineWeeksInMonth(selectedDate);

    if (week >= 6) {
      setCalendarHeight('595px');
    } else {
      setCalendarHeight('520px');
    }
  }, [selectedDate]);

  return (
    <StyledCalendarContainer height={calendarHeight}>
      <StyledCalendar
        locale="en-US"
        calendarType="gregory" // 일요일 부터 시작
        onChange={handleDateChange}
        // MM일 제거 -> 숫자만 보이게
        formatDay={(_locale: string | undefined, date: Date) =>
          moment(date).format('D')
        }
        // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        formatMonthYear={(_locale: string | undefined, date: Date) =>
          moment(date).format('YYYY. MM')
        }
        // 일정 있는 날짜에 점 UI 추가 및 팝업 마운트
        tileContent={({ date }) => {
          const filteredEventList = eventList.filter(
            (event: EventType) =>
              event.date === moment(date).format('YYYY-MM-DD')
          );
          return (
            <>
              <EventPopover date={date} eventList={filteredEventList} />
              {filteredEventList.length > 0 && (
                <Dot
                  isSelected={
                    moment(
                      selectedDate instanceof Date ? selectedDate : null
                    ).format('YYYY-MM-DD') ===
                      moment(date).format('YYYY-MM-DD') &&
                    moment(new Date()).format('YYYY-MM-DD') !==
                      moment(date).format('YYYY-MM-DD')
                  }
                />
              )}
            </>
          );
        }}
        // 달 넘어갈 때 자동 선택된 값(1일)으로 캘린더 height 변화
        onActiveStartDateChange={({ activeStartDate }) =>
          updateMonth(activeStartDate)
        }
        showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
        next2Label={null} // 년도 이동 버튼 숨기기
        prev2Label={null} // 년도 이동 버튼 숨기기
        nextLabel={<NextBtn />}
        prevLabel={<PrevBtn />}
        minDetail="year" // 10년단위 년도 숨기기
      />
    </StyledCalendarContainer>
  );
};

export default EventCalendar;

const StyledCalendarContainer = styled.div<{ height: string }>`
  width: 630px;
  margin-right: 23px;

  .react-calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    transition: height 200ms;
    height: ${(props) => props.height};
    padding: 24px 47px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 12px;
    border: 1px solid rgba(221, 235, 255, 1);
    overflow: hidden;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      font-family: 'Roboto', sans-serif;
      color: rgba(29, 29, 29, 1);
    }
  }

  /* 년/월 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 213px;
    height: 27px;
    margin-bottom: 18px;

    button {
      color: rgba(29, 29, 29, 1);
      background: none;
    }

    .react-calendar__navigation__label {
      width: 152px;
      height: 27px;
      flex-grow: 0 !important;
      font-size: 18px;
      font-weight: 700;
      pointer-events: none; // 입력 이벤트 무시
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      width: 24px;
      height: 24px;
      padding: 0;
    }

    /* 기본 hover 효과 무시 */
    .react-calendar__navigation__prev-button:hover,
    .react-calendar__navigation__next-button:hover,
    .react-calendar__navigation__prev-button:focus,
    .react-calendar__navigation__next-button:focus,
    .react-calendar__navigation__label:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }

  /* 전체 날짜 */
  .react-calendar__month-view {
    width: 535px;
    height: 424px;

    /* 요일  */
    .react-calendar__month-view__weekdays {
      column-gap: 18px;
      text-transform: capitalize;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
      text-decoration: none;
      font-size: 18px;
      color: #1d1d1d;
      font-weight: 500;
    }

    /* 요일, 날짜 크기 및 정렬 */
    .react-calendar__month-view__weekdays > div,
    .react-calendar__month-view__days > button {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 60px;
      height: 60px;
      padding: 0;
    }

    /* 날짜 */
    .react-calendar__month-view__days {
      row-gap: 12px;
      column-gap: 18px;
    }

    .react-calendar__month-view__days__day {
      position: relative;
    }

    .react-calendar__month-view__days__day abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      font-size: 18px;
      font-weight: 400;
    }

    /* 요일, 날짜 폰트 */
    .react-calendar__month-view__weekdays__weekday abbr,
    .react-calendar__month-view__days abbr {
      font-size: 18px;
      font-weight: 400;
    }

    /* 기본 hover 효과 제거 */
    .react-calendar__tile:hover {
      background-color: rgba(255, 255, 255, 1);
    }

    .react-calendar__month-view__days__day:hover abbr {
      font-weight: 500;
    }

    /* 오늘 날짜 */
    .react-calendar__tile--now {
      background-color: rgba(255, 255, 255, 1);
    }
    .react-calendar__tile--now abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(221, 235, 255, 1);
    }

    /* 선택된 날짜 */
    .react-calendar__tile--active {
      background-color: rgba(255, 255, 255, 1);
    }
    .react-calendar__tile--active abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(92, 158, 255, 1);
    }

    /* 이전/다음 달 날짜 */
    .react-calendar__month-view__days__day--neighboringMonth abbr {
      color: rgba(204, 204, 204, 1);
    }
  }
`;

const StyledCalendar = styled(Calendar)``;

const Dot = styled.div<{ isSelected: boolean }>`
  position: absolute;
  bottom: 17%;
  left: 50%;
  transform: translate(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? 'white' : '#5C9EFF')};
`;
