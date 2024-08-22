import { useEffect } from 'react';
import styled from 'styled-components';
import UpcomingEvent from '@components/calendar/UpcomingEvent';
import { getUpcomingEvent } from '@apis/calendar';
// import { teamId } from '../../constant/index';
import { useCalendarStore } from '@store/calendarStore';
import { useIdStore } from '@store/idStore';

const UpcomingEventList = () => {
  const { teamId } = useIdStore((state) => ({
    teamId: state.teamId
  }));
  const { upcomingEventList, setUpcomingEventList } = useCalendarStore(
    (state) => ({
      upcomingEventList: state.upcomingEventList,
      setUpcomingEventList: state.setUpcomingEventList
    })
  );

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const response = await getUpcomingEvent(teamId);
      setUpcomingEventList(response.data.result.comingCalendarList);
      console.log(upcomingEventList);
    };
    if (teamId) fetchUpcomingEvent();
  }, []);

  return (
    <Container>
      <h2 className="upcoming-events-title">다가오는 일정</h2>
      {upcomingEventList.length > 0 ? (
        <ul className="upcoming-event-list">
          {upcomingEventList.map((event) => (
            <UpcomingEvent event={event} key={event.calendarId} />
          ))}
        </ul>
      ) : (
        <div className="empty-event-container">
          <span className="empty-event">아직 생성된 일정이 없습니다</span>
        </div>
      )}
    </Container>
  );
};

export default UpcomingEventList;

const Container = styled.div`
  .upcoming-events-title {
    margin: 0 0 24px 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    color: #1d1d1d;
  }

  .upcoming-event-list {
    width: 442px;
    height: auto;
    padding: 0;
  }
  .empty-event-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 442px;
    height: 380px;
    .empty-event {
      font-size: 18px;
      font-weight: 500;
      line-height: 25.2px;
      color: #1d1d1d;
    }
  }
`;
