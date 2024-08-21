import styled from 'styled-components';
import { TeamCode } from '@components/management/team-code/TeamCode.tsx';
import { Members } from '@components/management/member/Members.tsx';
import { Schedule } from '@components/management/schedule/Schedule.tsx';
import { AddSchedule } from '@components/management/schedule/AddSchedule.tsx';
import { useEffect, useState } from 'react';
import { ShowSchedule } from '@components/management/schedule/ShowSchedule.tsx';
import { NoSchedule } from '@components/management/schedule/NoSchedule.tsx';
import { getSchedules, getTeamData } from '@apis/management.ts';
import { ScheduleDto, TeamData, TeamTag } from '../../types/management.ts';

export const ManagementPage = () => {
  const [showAddSchedule, setShowAddSchedule] = useState<boolean>(false); //
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<ScheduleDto | null>(null);

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [tags, setTags] = useState<TeamTag[]>([]);

  const handleAddSchedule = () => {
    setShowAddSchedule(true);
  };

  const handleScheduleSubmit = (newSchedule: ScheduleDto | null) => {
    if (newSchedule) {
      setIsSubmitted(true);
      setSchedules(newSchedule); // 스케줄 추가로직 수정, 나중에 더 필요할 수도 있음
    }
    setShowAddSchedule(false);
  };

  const fetchTeamData = async () => {
    const response = await getTeamData(1);
    setTeamData(response);
    const newTags = response.teamTagList || [];
    setTags(newTags);
  };

  const fetchSchedules = async () => {
    const response = await getSchedules(1);
    setSchedules(response.scheduleDto);
    console.log(response.scheduleDto);
  };

  const refreshTeamData = async () => {
    await fetchTeamData();
    await fetchSchedules();
  };

  const handleTeamNameChange = (newName: string) => {
    if (teamData) {
      setTeamData((prevData) => ({ ...prevData, title: newName }));
    }
  };

  useEffect(() => {
    fetchTeamData();
    fetchSchedules();
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
          <Schedule
            onAddSchedule={handleAddSchedule}
            isSubmitted={isSubmitted}
          />
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
