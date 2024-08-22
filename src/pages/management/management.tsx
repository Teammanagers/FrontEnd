import styled from 'styled-components';
import { TeamCode } from '@components/management/team-code/TeamCode.tsx';
import { Members } from '@components/management/member/Members.tsx';
import { Schedule } from '@components/management/schedule/Schedule.tsx';
import { AddSchedule } from '@components/management/schedule/AddSchedule.tsx';
import { useEffect, useState } from 'react';
import { ShowSchedule } from '@components/management/schedule/ShowSchedule.tsx';
import { NoSchedule } from '@components/management/schedule/NoSchedule.tsx';
import { getMySchedules, getSchedules, getTeamData } from '@apis/management.ts';
import { ScheduleDto, TeamData, TeamTag } from '../../types/management.ts';

export const ManagementPage = () => {
  const [showAddSchedule, setShowAddSchedule] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<ScheduleDto | null>(null);
  const [mySchedules, setMySchedules] = useState<ScheduleDto | null>(null);

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [tags, setTags] = useState<TeamTag[]>([]);

  const handleAddSchedule = () => {
    setShowAddSchedule(true);
  };

  const handleScheduleSubmit = (newSchedule: ScheduleDto | null) => {
    if (newSchedule) {
      setSchedules(newSchedule); // 스케줄 추가로직 수정, 나중에 더 필요할 수도 있음
    }
    console.log(schedules);
    setShowAddSchedule(false);
  };

  const fetchTeamData = async () => {
    const response = await getTeamData(1);
    setTeamData(response);
    const newTags = response.teamTagList || [];
    setTags(newTags);
  };

  // 팀 스케줄 조회
  const fetchSchedules = async () => {
    const response = await getSchedules(1);
    setSchedules(response.scheduleDto);
  };

  // 내 스케줄 조회
  const fetchMySchedules = async () => {
    const response = await getMySchedules(1);
    setMySchedules(response);
  };

  const refreshTeamData = async () => {
    await fetchTeamData();
    await fetchSchedules();
    await fetchMySchedules();
  };

  const handleTeamNameChange = (newName: string) => {
    if (teamData) {
      setTeamData((prevData) => ({ ...prevData, title: newName }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTeamData();
      await fetchSchedules();
      await fetchMySchedules();
    };
    fetchData();
  }, []);

  return (
    <Container>
      <TeamCode
        imageUrl={teamData?.imageUrl}
        teamCode={teamData?.teamCode}
        title={teamData?.title || ''}
        tagList={tags}
        onTeamNameChange={handleTeamNameChange}
        refreshTeamData={refreshTeamData}
      />
      <Members />
      {!showAddSchedule ? (
        <>
          <Schedule onAddSchedule={handleAddSchedule} schedules={mySchedules} />
          {schedules && Object.keys(schedules).length > 0 ? (
            <ShowSchedule schedule={schedules} />
          ) : (
            <NoSchedule />
          )}
        </>
      ) : (
        <AddSchedule onSubmit={handleScheduleSubmit} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 182px;
`;
